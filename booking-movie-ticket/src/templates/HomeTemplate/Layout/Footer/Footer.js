import React from "react";
import { NavLink } from "react-router-dom";
const bgAuth = "/img/bgAuth.jpg";

export const Footer = () => {
  return (
    <footer
      className="px-4 divide-y border-t-2 border-white"
      style={{ backgroundImage: `url(${bgAuth}` }}
    >
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <NavLink
            to="/"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <img src="/logo.svg" alt="logo" />
          </NavLink>
        </div>
        <div className="grid grid-cols-3 text-sm gap-x-3 gap-y-8 lg:w-2/3 ">
          <div className="space-y-3">
            <h3 className=" uppercase text-white font-semibold text-center">
              partner
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.cgv.vn/"
                className="col-span-1"
              >
                <img
                  src="/img/logo-theater/cgv.png"
                  alt=""
                  style={{
                    backgroundColor: "#fff",
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                  }}
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.bhdstar.vn/"
                className="col-span-1"
              >
                <img
                  src="/img/logo-theater/bhd.png"
                  alt=""
                  style={{
                    backgroundColor: "#fff",
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                  }}
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://cinestar.com.vn/"
                className="col-span-1"
              >
                <img
                  src="/img/logo-theater/cin.png"
                  alt=""
                  style={{
                    backgroundColor: "#fff",
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                  }}
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.galaxycine.vn/"
                className="col-span-1"
              >
                <img
                  src="/img/logo-theater/gal.png"
                  alt=""
                  style={{
                    backgroundColor: "#fff",
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                  }}
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.lottecinemavn.com/LCHS/index.aspx"
                className="col-span-1"
              >
                <img
                  src="/img/logo-theater/lot.png"
                  alt=""
                  style={{
                    backgroundColor: "#fff",
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                  }}
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.megagscinemas.vn/"
                className="col-span-1"
              >
                <img
                  src="/img/logo-theater/meg.png"
                  alt=""
                  style={{
                    backgroundColor: "#fff",
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                  }}
                />
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className=" uppercase text-white font-semibold text-center">
              contact me
            </h3>
            <div className="flex justify-around">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/lai.vinh.718"
                title="Facebook: https://www.facebook.com/lai.vinh.718"
              >
                <img
                  src="/img/contact-icon/logo-facebook.png"
                  alt="facebook"
                  style={{ width: 35, height: 35 }}
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.google.com/intl/vi/gmail/about/"
                title="Gmail: nguduyvinh2k2@gmail.com"
              >
                <img
                  src="/img/contact-icon/logo-google.png"
                  alt="google"
                  style={{ width: 35, height: 35 }}
                />
              </a>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className=" uppercase text-white font-semibold text-center">
              PRIVACY POLICY
            </h3>
            <ul>
              <li className=" text-white text-center" title="0366.315.426">
                Phone
              </li>
              <li
                className=" text-white text-center"
                title="Facebook: https://www.facebook.com/lai.vinh.718"
              >
                Facebook
              </li>
              <li
                className=" text-white text-center"
                title="Gmail: nguduyvinh2k2@gmail.com"
              >
                Gmail
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center text-white font-bold">
        <NavLink to="/" className="text-red-600 hover:text-red-600">
          MovieStar
        </NavLink>{" "}
        ©2022 Created by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/lai.vinh.718"
          title="Facebook: https://www.facebook.com/lai.vinh.718"
          className="text-white hover:text-white"
        >
          Ngũ Duy Vinh
        </a>
      </div>
    </footer>
  );
};
