import { Link, Navigate, useNavigate } from "@tanstack/react-location";
import clsx from "clsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { auth } from "../firebase";

import Error from "/src/components/shared/error";

import { loginApi } from "/src/helpers/fetchers";
import { userAtom } from "/src/stores/auth.store";

export default function Login() {
  // router
  const navigate = useNavigate();

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

  // const onSubmit = (data) => {
  //   loginMutation.mutate(data);
  // };

  const onSubmit = (data) => {
    //loginMutation.mutate(data);

    signInWithEmailAndPassword(auth, data.username, data.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      
      navigate({to:"/", required: true})
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)

    });
  };

  return (
    <div className="card card-bordered mx-auto max-w-md">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="card-title mb-4 text-2xl">Log in to your account</h2>

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

        {/* <button
          className={clsx("btn btn-primary mt-4"
          , {
            loading: loginMutation.isLoading,
          })}
        >
          Sign in
        </button> */}

        <button className={"btn btn-mainColor mt-4"}>
          Sign in
        </button>

        <div className="flex justify-end space-x-2">
          <span>Don't have an account?</span>
          <Link to="/register" className="link link-primary">
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
