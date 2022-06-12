import React from "react";
import { NavLink } from "react-router-dom";

export const Header = (props) => {
  return (
    <header className="p-4 dark:bg-coolGray-800 dark:text-coolGray-100 bg-black bg-opacity-40 fixed w-full z-20">
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
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <NavLink to="/login" className="text-white font-semibold px-8 py-3">
            Sign in
          </NavLink>
          <NavLink
            to="/register" className="text-white font-semibold px-8 py-3">
            Sign up
          </NavLink>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-coolGray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};
