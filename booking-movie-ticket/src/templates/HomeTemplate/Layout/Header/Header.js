import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Menu, Space } from "antd";
import Button from "../../../../components/Button/Button";
import { USER_LOGIN } from "../../../../utils/settings/config";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../../redux/actions/UserActions";

export const Header = (props) => {
  const dispatch = useDispatch();
  let userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
  const menuDropdown = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <NavLink to="/profile" className=" text-black">
              Profile
            </NavLink>
          ),
        },
        {
          key: "2",
          label: (
            <NavLink to="/my-courses" className=" text-black">
              My Courses
            </NavLink>
          ),
        },
        {
          key: "3",
          label: (
            <NavLink to="/settings" className=" text-black">
              Settings
            </NavLink>
          ),
        },
        {
          key: "4",
          danger: true,
          label: (
            <button
              className="font-bold "
              onClick={() => {
                dispatch(logoutAction());
                userLogin = {};
                props.history.push("/login");
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
        <NavLink to="/profile" className="!text-black !font-bold">
          {userLogin.username}
        </NavLink>
      </Space>
    </Dropdown>
  );
  return (
    <header className=" bg-white bg-opacity-40 fixed w-full z-20">
      <div className="container flex justify-between h-16 mx-auto text-white">
        <NavLink
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
            alt="logo"
          />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/home"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent dark:text-violet-400 dark:border-violet-400
              text-white"
            >
              Trang Chủ
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/news"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-white"
            >
              News
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="contact"
              className="flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-white"
            >
              Contact
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
                props.history.push("/login");
              }}
            ></Button>
            <Button
              textContent="Register"
              className="w-full !rounded-none col-span-1"
              onClick={() => {
                props.history.push("/register");
              }}
            ></Button>
          </div>
        )}
      </div>
    </header>
  );
};
