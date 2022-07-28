import { Dropdown, Menu, Space } from "antd";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Redirect, Route, useHistory } from "react-router-dom";
import { openNotificationWithIcon } from "../../components/Notification/Notification";
import { logoutAction } from "../../redux/actions/UserActions";
import { ERROR, TOKEN, USER_LOGIN, WARNING } from "../../utils/settings/config";
import { Footer } from "../HomeTemplate/Layout/Footer/Footer";
import styleHeader from "./../HomeTemplate/Layout/Header/Header.module.css";
const UserTemplate = (props) => {
  const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  const { Component, ...restProps } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  if (!localStorage.getItem(TOKEN)) {
    openNotificationWithIcon(ERROR, "Please login", "error");
    return <Redirect to="/auth/login" exact />;
  }

  const menuDropdown = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <NavLink
              to={`/profile/${userLogin?.userId}`}
              className=" text-black font-semibold"
            >
              Profile
            </NavLink>
          ),
        },
        {
          key: "2",
          label: (
            <NavLink
              to="/"
              className=" text-black font-semibold"
              onClick={() => {
                openNotificationWithIcon(
                  WARNING,
                  "Sorry this feature is being updated!!",
                  "warning"
                );
              }}
            >
              Settings
            </NavLink>
          ),
        },
        {
          key: "3",
          danger: true,
          label: (
            <button
              className="font-bold"
              onClick={() => {
                dispatch(logoutAction());
                history.push("/");
              }}
            >
              LOGOUT
            </button>
          ),
        },
      ]}
    />
  );
  const dropdownHeader = () => (
    <Dropdown overlay={menuDropdown}>
      <Space>
        Hello,
        <NavLink
          to={`/profile/${userLogin.userId}`}
          className="!text-white !font-bold"
        >
          {userLogin.username}
        </NavLink>
      </Space>
    </Dropdown>
  );
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <header className="fixed w-full bg-black z-20 top-0">
              <div className="container flex justify-between h-16 mx-auto text-white">
                <NavLink to="/" className="flex items-center p-2 ">
                  <img src="/logo.svg" alt="logo" />
                </NavLink>
                <ul className="flex">
                  <li className={`${styleHeader["line"]}`}>
                    <NavLink
                      to="/"
                      className=" px-5 py-6  
                text-white hover:text-white font-bold"
                      style={{ lineHeight: 4 }}
                    >
                      HOME
                    </NavLink>
                  </li>
                  <li className={`${styleHeader["line"]} `}>
                    <NavLink
                      to="/"
                      className=" px-5 py-6  
                text-white hover:text-white font-bold"
                      style={{ lineHeight: 4 }}
                      onClick={() => {
                        openNotificationWithIcon(
                          WARNING,
                          "Sorry this feature is being updated!!",
                          "warning"
                        );
                      }}
                    >
                      NEWS
                    </NavLink>
                  </li>
                  <li className={`${styleHeader["line"]} `}>
                    <NavLink
                      to="/"
                      className=" px-5 py-6 
                text-white hover:text-white font-bold"
                      style={{ lineHeight: 4 }}
                      onClick={() => {
                        openNotificationWithIcon(
                          WARNING,
                          "Sorry this feature is being updated!!",
                          "warning"
                        );
                      }}
                    >
                      CONTACT
                    </NavLink>
                  </li>
                </ul>
                {dropdownHeader()}
              </div>
            </header>
            <Component {...propsRoute} />
            <Footer />
          </Fragment>
        );
      }}
    />
  );
};

export default UserTemplate;
