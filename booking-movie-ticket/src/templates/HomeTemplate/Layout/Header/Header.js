import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Menu, Space } from "antd";
import Button from "../../../../components/Button/Button";
import { USER_LOGIN, WARNING } from "../../../../utils/settings/config";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../../redux/actions/UserActions";
import styleHeader from "./Header.module.css";
import { openNotificationWithIcon } from "../../../../components/Notification/Notification";
export const Header = (props) => {
  const dispatch = useDispatch();
  const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
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
                props.history.push("/auth/login");
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
  useEffect(() => {
    const onScroll = () => {
      if (
        document.body.scrollTop > 150 ||
        document.documentElement.scrollTop > 150
      ) {
        // translate(-50%,0)
        document.getElementById("headerFixed").style.transform =
          "translateY(0)";
      } else {
        document.getElementById("headerFixed").style.transform =
          "translateY(-100%)";
      }
    };
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="absolute w-full z-10 ">
        <div className="container flex justify-between h-16 mx-auto text-white">
          <NavLink to="/" className="flex items-center p-2 ">
            <img src="/logo.svg" alt="logo" />
          </NavLink>
          <ul className="flex">
            <li className={`${styleHeader["line"]} `}>
              <NavLink
                to="/home"
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
          {userLogin ? (
            dropdownHeader()
          ) : (
            <div className="items-center flex-shrink-0 grid grid-cols-2 gap-2">
              <Button
                textContent="Login"
                className="w-full !rounded-none col-span-1"
                onClick={() => {
                  props.history.push("/auth/login");
                }}
              ></Button>
              <Button
                textContent="Register"
                className="w-full !rounded-none col-span-1"
                onClick={() => {
                  props.history.push("/auth/register");
                }}
              ></Button>
            </div>
          )}
        </div>
      </header>
      <header
        id="headerFixed"
        className="fixed w-full bg-black z-20 top-0"
        style={{
          transform: "translateY(-100%)",
          transition: "transform 0.5s",
        }}
      >
        <div className="container flex justify-between h-16 mx-auto text-white">
          <NavLink to="/" className="flex items-center p-2 ">
            <img src="/logo.svg" alt="logo" />
          </NavLink>
          <ul className="flex">
            <li className={`${styleHeader["line"]}`}>
              <NavLink
                to="/home"
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
          {userLogin ? (
            dropdownHeader()
          ) : (
            <div className="items-center flex-shrink-0 grid grid-cols-2 gap-2">
              <Button
                textContent="Login"
                className="w-full !rounded-none col-span-1"
                onClick={() => {
                  props.history.push("/auth/login");
                }}
              ></Button>
              <Button
                textContent="Register"
                className="w-full !rounded-none col-span-1"
                onClick={() => {
                  props.history.push("/auth/register");
                }}
              ></Button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
