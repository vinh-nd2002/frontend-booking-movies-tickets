import { Redirect, useParams } from "react-router-dom";
import { EditFilled } from "@ant-design/icons";
import "./Profile.css";
import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Form } from "antd";
import { USER_LOGIN } from "../../utils/settings/config";
import { useEffect } from "react";
import { getProfileUserAction } from "../../redux/actions/UserActions";

const bgAuth = "/img/bgAuth.jpg";

export const Profile = (props) => {
  const { userDetail } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  const { userId } = useParams();
  useEffect(() => {
    dispatch(getProfileUserAction(userId));
  }, []);

  const formik = useFormik({
    initialValues: {
      ...userLogin,
    },
    onSubmit: (values) => {
      // dispatch(updateUserAction(values, props));
    },
  });

  return !userLogin ? (
    <Redirect to="/" />
  ) : (
    <>
      <div
        className="container w-full mt-16 grid grid-cols-3 gap-10"
        style={{
          backgroundImage: `url(${bgAuth}`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Form
          labelCol={{
            span: 2,
          }}
          wrapperCol={{
            span: 24,
          }}
          layout="horizontal"
          onSubmitCapture={formik.handleSubmit}
          className="col-span-1 "
        >
          <div className="w-full drop-shadow mt-5">
            <div className="flex justify-center">
              <div className="mt-2 inline-block border-2 border-sky-500 rounded-full mb-12 relative">
                <img
                  className="rounded-full w-28 h-28"
                  src={
                    userLogin.avatar
                      ? userLogin.avatar
                      : "https://nhathauxaydung24h.com/wp-content/uploads/2022/01/avatar-ngau-loi.jpg"
                  }
                  alt={userLogin.username}
                />
                <EditFilled
                  className="absolute drop-shadow-lg"
                  style={{
                    color: "white",
                    fontSize: "2rem",
                    position: "absolute",
                    top: "80%",
                  }}
                  onClick={() => {
                    // setShowEditAvatar(!showEditAvatar);
                  }}
                />
              </div>
            </div>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your first name!",
                  whitespace: true,
                },
                {
                  max: 50,
                  message: "Must be between 6 to 50 characters!",
                },
              ]}
              onChange={formik.handleChange}
            >
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-black border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none font-semibold focus:bg-white"
                    id="firstName"
                    type="text"
                    name="firstName"
                    defaultValue={userLogin.firstName}
                    placeholder="Jane"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 font-semibold"
                    id="lastName"
                    type="text"
                    name="lastName"
                    defaultValue={userLogin.lastName}
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 8,
                  message: "Must be between 8 to 50 characters!",
                },
                {
                  max: 50,
                  message: "Must be between 8 to 50 characters!",
                },
              ]}
              onChange={formik.handleChange}
            >
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 font-semibold"
                    id="username"
                    type="text"
                    name="username"
                    defaultValue={userLogin.username}
                  />
                </div>
              </div>
            </Form.Item>

            <Form.Item
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white font-semibold focus:border-gray-500"
                    type="email"
                    placeholder="example@gmail.com"
                    onChange={formik.handleChange}
                    name="email"
                    defaultValue={userLogin.email}
                  />
                </div>
              </div>
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
              onChange={formik.handleChange}
            >
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
                    htmlFor="numberPhone"
                  >
                    Phone
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 font-semibold"
                    name="numberPhone"
                    placeholder="+84..."
                    defaultValue={userLogin.numberPhone}
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item>
              <div className="relative">
                <button
                  type="submit"
                  className="absolute right-0 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center bottom-4"
                >
                  Save
                </button>
              </div>
            </Form.Item>
          </div>
        </Form>
        <table
          className="text-xs col-span-2 px-10 text-center my-16 rounded-xl"
          style={{ backgroundColor: "#f6f9fc" }}
        >
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr className="text-center">
              <th className="p-3">Ticket ID</th>
              <th className="p-3">Ticket Code</th>
              <th className="p-3">Ticket Price</th>
              <th className="p-3 ">Ticket Status</th>
            </tr>
          </thead>
          <tbody>
            {userDetail.tickets?.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="p-3">
                    <p>{item.ticketId}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.ticketCode}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.ticketPrice}</p>
                  </td>
                  <td
                    className="p-3 font-semibold"
                    style={{
                      color: item.ticketStatus === "PENDING" ? "red" : "green",
                    }}
                  >
                    <p>{item.ticketStatus}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
