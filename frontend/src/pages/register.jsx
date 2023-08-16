import { Link, useNavigate, useMatch } from "@tanstack/react-location";
import clsx from "clsx";
import {
  createUserWithEmailAndPassword,
  EmailAuthCredential,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  setDoc,
  doc,
  startAfter,
} from "firebase/firestore";
//import * as admin from 'firebase-admin'
import "../index.css";
import Error from "../components/shared/error";
import schoolsData from "../assets/schools_data.json";
import { Mixpanel } from '../mixpanel';

export default function Register() {
  // router
  const navigate = useNavigate();
  const {
    params: { role },
  } = useMatch();

  console.log(role);
  // form
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const {
      email,
      password,
      full_name,
      emis_number,
      class_name,
      school_name,
      Grade,
    } = data;

    createUserWithEmailAndPassword(auth, email, password).then(async(results) => {
      //console.log(results.user.uid);
      //Track user Id
      Mixpanel.alias(data.username);
      Mixpanel.people.set({
        $email: data.username,
        $distict_id: data.username,
      });
      Mixpanel.track('Signup',{method: "normal"});

      // Check if its a teacher
      if (role === "teacher") {
        try {
          //Track Teacher
          Mixpanel.track('Successful register - Teacher');

          setDoc(doc(db, "teachers", results.user.uid), {
            uid: results.user.uid,
            email: email,
            full_name: full_name,
            class_name: class_name,
            school_name: school_name,
            emis_number: emis_number,
            Grade: Grade,
            role: "teacher"
          }).then((data) => {
            console.log(data);
            localStorage.setItem(
              "user",
              JSON.stringify({
                email: email,
                id: results.user.uid,
                role: "teacher",
              })
            );
            navigate({ to: "/teacher/dashboard" });
          });
        } catch (e) {
          Mixpanel.track('Error adding document.');
          console.log(e.message);
        }
      } else {
        try {
           //Track Student
           Mixpanel.track('Successful register - Student');

          setDoc(doc(db, "users", results.user.uid), {
            uid: results.user.uid,
            email: email,
            full_name: full_name,
            class_name: class_name,
            school_name: school_name,
            emis_number: emis_number,
            grade: Grade,
            role: "student"
          }).then((data) => {
            console.log(data);
            localStorage.setItem(
              "user",
              JSON.stringify({
                email: email,
                id: results.user.uid,
                role: "student",
              })
            );
            navigate({ to: "/" });
          });
          console.log("Document written with ID: ");
        } catch (e) {
          Mixpanel.track('Error adding document.');
          console.error("Error adding document: ", e);
        }
      }
    });
  };

  return (
    <div className="card card-bordered mx-auto max-w-md">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="card-title mb-4 text-2xl">Create your account</h2>

        {/* Form control for Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered"
            {...register("email", { required: true })}
          />
        </div>

        {/* Form control for Full Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            {...register("full_name", { required: true })}
          />
        </div>

        {/* Form control for EMIS Number */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">EMIS Number</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            {...register("emis_number", { required: true })}
          />
        </div>

        {/* Form control for School Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">School Name</span>
          </label>
          <select
            {...register("school_name", { required: true })}
            className="input w-full rounded border input-bordered bg-gray-50 p-2"
            placeholder="Select school"
          >
            {schoolsData.map((item, index) => (
              <option value={item.school_name}>{item.school_name}</option>
            ))}
          </select>
        </div>
        {/* Form control for Grade */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Grade</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            {...register("Grade", { required: true })}
          />
        </div>

        {/* Form control for Class Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Class Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            {...register("class_name", { required: true })}
          />
        </div>

        {/* Form control for password */}
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

        <button className={clsx("btn-mainColor btn mt-4")}>Sign up</button>

        <div className="flex justify-end space-x-2">
          <span>Have an account?</span>
          <Link
            to={role === "teacher" ? "/login/teacher" : "/login/student"}
            className="link link-primary"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
