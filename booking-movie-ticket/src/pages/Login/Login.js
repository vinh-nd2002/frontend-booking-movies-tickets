import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as Yup from "yup";
import { openNotificationWithIcon } from "../../components/Notification/Notification";
import { loginAction } from "../../redux/actions/UserActions";
import { UserService } from "../../services/UserService";
import { USER_LOGIN, WARNING } from "../../utils/settings/config";

const bgAuth = "/img/bgAuth.jpg";
export const Login = (props) => {
  if (localStorage.getItem(USER_LOGIN)) {
    openNotificationWithIcon(WARNING, "You are logged in", "warning");
    props.history.push("/");
  }
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .max(50, "Must be between 6 to 50 characters")
        .min(6, "Must be between 6 to 50 characters")
        .required("Required!!!")
        .test(
          "checkUsernameExists",
          "This username is not exists!.",
          async (username) => {
            // call api
            const isUserNameExists = await UserService.isExistsByUsername(
              username
            );
            return isUserNameExists;
          }
        ),
      password: Yup.string()
        .max(50, "Must be between 6 to 50 characters")
        .min(6, "Must be between 6 to 50 characters")
        .required("Required!!!"),
    }),
    onSubmit: (values) => {
      var body = new FormData();
      body.append("username", values.username);
      body.append("password", values.password);
      dispatch(loginAction(body, props));
    },
  });

  return (
    <div
      className="w-full"
      style={{
        height: "100vh",
        backgroundImage: `url(${bgAuth}`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#f6f9fc",
          width: 800,
          height: "fit-content",
          borderRadius: 6,
          padding: 50,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <h1 className=" font-semibold text-black text-center text-6xl ">
            LOGIN
          </h1>
          <div className="mb-4 form-group">
            <label className="form-check-label inline-block text-xl  text-black">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Input your username"
              onChange={formik.handleChange}
            />
            {formik.errors.username && formik.touched.username && (
              <p className="text-red-600">{formik.errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="form-check-label inline-block text-xl text-black">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Input your password"
              onChange={formik.handleChange}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-600">{formik.errors.password}</p>
            )}
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white  transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                defaultChecked
              />
              <label className="form-check-label inline-block text-gray-800">
                Remember me
              </label>
            </div>
            <NavLink
              to="/auth/forgot-password"
              className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
            >
              Forgot password?
            </NavLink>
          </div>
          <button
            type="submit"
            className="text-white py-2 px-6 rounded-sm font-bold w-full uppercase"
            style={{
              background: "linear-gradient(to right, #fbbd61, #ec7532)",
            }}
          >
            Sign in
          </button>
          <NavLink to="/auth/register">Do not have an account?</NavLink>
          <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p className="text-center font-semibold mx-4 mb-0">OR</p>
          </div>

          <a
            className="px-7 py-3 text-blue-400 font-medium text-sm leading-snug uppercase rounded shadow-md  transition duration-500 ease-in-out w-full flex justify-center items-center mb-3 hover:text-blue-400 hover:scale-110"
            style={{ backgroundColor: "#f6f9fc" }}
            href="#!"
            role="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
            >
              <linearGradient
                id="Ld6sqrtcxMyckEl6xeDdMa"
                x1="9.993"
                x2="40.615"
                y1="9.993"
                y2="40.615"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#2aa4f4" />
                <stop offset="1" stopColor="#007ad9" />
              </linearGradient>
              <path
                fill="url(#Ld6sqrtcxMyckEl6xeDdMa)"
                d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
              />
              <path
                fill="#fff"
                d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
              />
            </svg>
            Continue with Facebook
          </a>
          <a
            className="px-7 py-3 font-medium text-sm  uppercase rounded shadow-md transition duration-500  w-full flex justify-center items-center hover:text-blue-400 hover:scale-110 text-blue-400"
            style={{ backgroundColor: "#f6f9fc" }}
            href="#!"
            role="button"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Continue with Google
          </a>
        </form>
      </div>
    </div>
  );
};
