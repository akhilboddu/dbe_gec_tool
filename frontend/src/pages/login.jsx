import {
  Link,
  Navigate,
  useMatch,
  useNavigate,
} from "@tanstack/react-location";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { auth, getUserProfile } from "../firebase";

import Error from "/src/components/shared/error";

import { loginApi } from "/src/helpers/fetchers";
import { userAtom } from "/src/stores/auth.store";
import { notify } from "react-notify-toast";
import { Mixpanel } from '../mixpanel';
import { method } from "lodash-es";

export default function Login() {
  // router
  const navigate = useNavigate();
  const {
    params: { role },
  } = useMatch();

  //console.log(role);
  // atom
  const [user, setUser] = useAtom(userAtom);

  // form
  const { register, handleSubmit } = useForm();

  // query
  const loginMutation = useMutation((data) => loginApi(data), {
    onSuccess: (data) => {
      setUser(data);
      navigate({ to: "/", replace: true });
    },
  });

  

  const onSubmit = (data) => {
    //loginMutation.mutate(data);

    signInWithEmailAndPassword(auth, data.username, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        //console.log("Login User: ", user.uid);
        //Track user Id
        Mixpanel.identify(data.username);
        Mixpanel.people.set({
          $email: data.username,
          $distict_id: data.username,
        });
        Mixpanel.track('Login',{method: "normal"});

        // Check if its a teacher
        if (role === "teacher") { 
          
          getUserProfile("teachers", user.uid).then((data) => {
            if (data) {
              //Track Teacher
              Mixpanel.track('Successful login - Teacher');

              if (!data?.role) {
                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    ...data,
                    role: "teacher",
                  })
                );
              }
              navigate({ to: "/teacher/dashboard", required: true });
            } else {
              Mixpanel.track('Unregistered teacher tried logging in.');
              notify.show(`No Teacher record found`, "error", 2000, "right");
            }
          });
        } else {
          getUserProfile("users", user.uid).then((data) => {
            if (data) {
              //Track Student
              Mixpanel.track('Successful login - Student');

              if (!data?.role) {
                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    ...data,
                    role: "student",
                  })
                );
              }
              navigate({ to: "/student", required: true });
            } else {
              Mixpanel.track('Unregistered student tried logging in.');
              notify.show(`No Student record found`, "error", 2000, "right");
            }
          });
        }
        // ...
      })
      .catch((error) => {
        console.log(error.code);
        
        if (error.code === "auth/wrong-password"){
          notify.show(`Incorrect Password`, "error", 2000, "right");
          Mixpanel.track('Incorrect Password');
        }
        else
          Mixpanel.track('Unsuccessful login');
      });
  };

  return (
    <div className="card card-bordered mx-auto max-w-md">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="card-title mb-4 text-2xl">
          {role !== "teacher" ? "Log in to your account" : "Teacher Login"}
        </h2>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            {...register("username", { required: true })}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            {...register("password", { required: true })}
          />
        </div>
        <button className={"btn-mainColor btn mt-4"}>Sign in</button>

        <div className="flex justify-end space-x-2">
          <span>Don't have an account?</span>
          <Link
            to={role === "teacher" ? "/register/teacher" : "/register/student"}
            className="link link-primary"
          >
            Sign up
          </Link>
        </div>

        {loginMutation.isError && (
          <Error text={loginMutation.error.response.data?.message} />
        )}
      </form>
    </div>
  );
}
