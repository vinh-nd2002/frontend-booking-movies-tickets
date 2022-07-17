import { React } from "react";
import { Form, Input } from "antd";
import { useFormik } from "formik";

import { Redirect, useParams } from "react-router-dom";

import { SUCCESS, USER_LOGIN } from "../../utils/settings/config";
import { UserService } from "../../services/UserService";
import { openNotificationWithIcon } from "../../components/Notification/Notification";

const bgAuth = "/img/bgAuth.jpg";

export const ChangePassword = (props) => {
  const { token } = useParams();

  const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },

    onSubmit: async (values) => {
      await UserService.resetPassword(token, values.newPassword);
      openNotificationWithIcon(SUCCESS, "Đổi mật khẩu thành công", "success");
      props.history.push("/auth/login");
    },
  });

  if (userLogin) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div
        className="w-full "
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
            background: "white",
            width: 1000,
            height: "fit-content",
            borderRadius: 6,
          }}
        >
          <h1 className="text-center text-4xl my-5">
            Vui lòng cung cấp đổi mật khẩu của bạn
          </h1>

          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            onFinish={formik.handleSubmit}
            style={{ marginLeft: 50 }}
          >
            <Form.Item
              label="New Password"
              hasFeedback
              name="newPassword"
              onChange={formik.handleChange}
              className="gap-2"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 8,
                  message: "Must be great than 8 characters!",
                },
                {
                  max: 800,
                  message: "Must be less than 50 characters!",
                },
              ]}
              style={{ marginBottom: 10 }}
            >
              <Input.Password placeholder="Input password" name="newPassword" />
            </Form.Item>

            <Form.Item
              label="Confirm New Password"
              hasFeedback
              name="confirmNewPassword"
              className="gap-2"
              onChange={formik.handleChange}
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                {
                  min: 8,
                  message: "Must be great than 8 characters!",
                },
                {
                  max: 800,
                  message: "Must be less than 800 characters!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
              style={{ marginBottom: 10 }}
            >
              <Input.Password
                placeholder="Input confirm password"
                name="confirmNewPassword"
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
              <button
                type="submit"
                className="bg-green-600 w-full rounded-none p-2 text-white font-bold border-none ml-2"
              >
                Đổi mật khẩu
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
