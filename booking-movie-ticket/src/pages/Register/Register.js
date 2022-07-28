import { DatePicker, Form, Input, Modal, Radio } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { registerAction } from "../../redux/actions/UserActions";
import { USER_LOGIN, WARNING } from "../../utils/settings/config";
import { UserService } from "../../services/UserService";
import { openNotificationWithIcon } from "../../components/Notification/Notification";

const bgAuth = "/img/bgAuth.jpg";

export const Register = (props) => {
  if (localStorage.getItem(USER_LOGIN)) {
    openNotificationWithIcon(WARNING, "Please logout", "warning");
    props.history.push("/");
  }
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      numberPhone: "",
      dateOfBirth: "",
      password: "",
      gender: "MALE",
      address: "",
      passwordConfirm: "",
    },

    onSubmit: (values) => {
      setVisible(true);
      dispatch(registerAction(values));
    },
  });

  const handleChangeDatePicker = (value) => {
    let dateOfBirth = moment(value).format("YYYY-MM-DD");
    formik.setFieldValue("dateOfBirth", dateOfBirth);
  };

  const handleTypeRadio = (e) => {
    formik.setFieldValue("gender", e.target.value);
  };
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
            Registration Information
          </h1>
          <Modal
            title="Notification"
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
              Hi
              <span className="text-xl font-bold ">
                {" "}
                {formik.values.username}{" "}
              </span>
              we have successfully confirmed your new member registration
              request. We have sent a confirmation of gmail account activation
              to the email{" "}
              <span className="text-xl font-bold "> {formik.values.email}</span>{" "}
              you just registered. Please check your gmail and confirm the
              account!!
            </h1>
            <h1>Best regards!</h1>
            <button
              className="text-blue-600"
              onClick={async () => {
                await UserService.resendConfirmUser(formik.values.email);
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
            <Form.Item label="Fullname" required style={{ marginBottom: 0 }}>
              <Form.Item
                name="firstName"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  marginBottom: 10,
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  placeholder="Input your first name"
                  name="firstName"
                  onChange={formik.handleChange}
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                style={{
                  display: "inline-block",
                  width: "calc(50% - 8px)",
                  margin: "0 0 0 16px",
                  marginBottom: 10,
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  name="lastName"
                  placeholder="Input your last name"
                  onChange={formik.handleChange}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Gender" style={{ marginBottom: 10 }} required>
              <Radio.Group
                name="gender"
                onChange={handleTypeRadio}
                defaultValue="MALE"
              >
                <Radio value="MALE" className="font-bold">
                  Male
                </Radio>
                <Radio value="FEMALE" className="font-bold">
                  Female
                </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              onChange={formik.handleChange}
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                  whitespace: true,
                },
                {
                  min: 6,
                  message: "Must be between 6 to 50 characters!",
                },
                {
                  message: "Must be between 6 to 50 characters!",
                },
                {
                  max: 50,
                  message: "Must be between 6 to 50 characters!",
                },
                {
                  validator: async (_, value) => {
                    if (value) {
                      const result = await UserService.isExistsByUsername(
                        value
                      );
                      if (result) {
                        return Promise.reject(
                          new Error("Username already exists")
                        );
                      }
                    }
                  },
                },
              ]}
              style={{ marginBottom: 10 }}
            >
              <Input placeholder="Input your username" name="username" />
            </Form.Item>

            <Form.Item
              label="Password"
              hasFeedback
              name="password"
              onChange={formik.handleChange}
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
              <Input.Password
                placeholder="Input your password"
                name="password"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              hasFeedback
              name="passwordConfirm"
              onChange={formik.handleChange}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
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
                    if (!value || getFieldValue("password") === value) {
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
                name="passwordConfirm"
              />
            </Form.Item>
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
                      if (result) {
                        return Promise.reject(
                          new Error("Email already exists")
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
                placeholder="Input your email"
              />
            </Form.Item>
            <Form.Item
              label="Date of Birth"
              name="dateOfBirth"
              rules={[
                {
                  required: true,
                  message: "Please input your date of birth !",
                },
              ]}
              required
              style={{ marginBottom: 10 }}
            >
              <DatePicker
                format={"YYYY-MM-DD"}
                onChange={handleChangeDatePicker}
                placeholder="Input your date of birth"
              />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              onChange={formik.handleChange}
              name="numberPhone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
              style={{ marginBottom: 10 }}
            >
              <Input placeholder="Input your number phone" name="numberPhone" />
            </Form.Item>

            <Form.Item
              label="Address"
              onChange={formik.handleChange}
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
                {
                  max: 100,
                  message: "Must be less than 100 characters!",
                },
              ]}
              style={{ marginBottom: 10 }}
            >
              <Input placeholder="Input your address" name="address" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
              <button
                type="submit"
                className="text-white py-2 px-6 font-bold w-full uppercase"
                style={{
                  background: "linear-gradient(to right, #fbbd61, #ec7532)",
                }}
              >
                Register
              </button>
              <NavLink to="/auth/login">
                Do you already have an account?
              </NavLink>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
