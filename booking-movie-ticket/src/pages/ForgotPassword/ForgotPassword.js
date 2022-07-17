import { React, useState } from "react";
import { Form, Input, Modal } from "antd";
import { useFormik } from "formik";

import { NavLink, Redirect } from "react-router-dom";
import { USER_LOGIN } from "../../utils/settings/config";
import { UserService } from "../../services/UserService";

const bgAuth = "/img/bgAuth.jpg";

export const ForgotPassword = (props) => {
  const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  const [visible, setVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    onSubmit: async (values) => {
      await UserService.resetPasswordRequest(values.email);
      setVisible(true);
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
            width: 900,
            height: "fit-content",
            borderRadius: 6,
          }}
        >
          <h1 className="text-center text-4xl my-5">
            Vui lòng cung cấp Email của bạn
          </h1>
          <Modal
            title="Thông báo"
            centered
            visible={visible}
            onOk={() => {
              setVisible(false);
              props.history.push("/auth/login");
            }}
            onCancel={() => {
              setVisible(false);
              props.history.push("/auth/login");
            }}
            width={1000}
          >
            <h1>
              Xin chào bạn , chúng tôi đã xác nhận thành công yêu cầu cung cấp
              tới
              <span className="text-xl font-bold "> {formik.values.email}</span>
              mà bạn vừa cung cấp. Vui lòng kiểm tra lại gmail của bạn và xác
              nhận tài khoản!!
            </h1>
            <h1>Thân trọng!</h1>
            <button
              className="text-blue-600"
              onClick={async () => {
                await UserService.resendResetPassword(formik.values.email);
              }}
            >
              Tôi chưa nhận được gmail?
            </button>
          </Modal>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            onFinish={formik.handleSubmit}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
                {
                  validator: async (_, value) => {
                    if (value) {
                      const result = await UserService.isExistsByEmail(value);
                      if (!result) {
                        return Promise.reject(
                          new Error("Email does not exist")
                        );
                      }
                    }
                  },
                },
              ]}
              style={{ marginBottom: 10 }}
            >
              <Input
                name="email"
                onChange={formik.handleChange}
                placeholder="Input email"
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
              <button
                type="submit"
                className="bg-green-600 w-full rounded-none p-2 text-white font-bold border-none"
              >
                Xác nhận
              </button>
              <NavLink to="/auth/login">Bạn đã có tài khoản?</NavLink>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
