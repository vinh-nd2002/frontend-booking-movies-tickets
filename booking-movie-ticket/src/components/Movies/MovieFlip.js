import React, { useState } from "react";
import "./MovieFlip.css";
import { PlayCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
export const MovieFlip = (props) => {
  const { movie } = props;
  return (
    <div
      style={{
        height: 350,
      }}
    >
      <div className="flip-card mt-4">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              src={movie.moviePoster}
              alt="Poster"
              style={{ width: 300, height: 300 }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://picsum.photos/300/300";
              }}
            />
          </div>
          <div
            className="flip-card-back"
            style={{ position: "relative", backgroundColor: "rgba(0,0,0,.9)" }}
          >
            <div style={{ position: "absolute", top: 0, left: 0 }}>
              <img
                src={movie.moviePoster}
                alt="Avatar"
                style={{ width: 300, height: 300 }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://picsum.photos/300/300";
                }}
              />
            </div>
            <div
              className="w-full h-full"
              style={{
                position: "absolute",
                backgroundColor: "rgba(0,0,0,.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <div className="rounded-full cursor-pointer">
                  <PlayCircleOutlined
                    style={{ fontSize: "50px" }}
                    className="hover:scale-125 duration-500"
                  />
                </div>
                <div className="text-2xl mt-2 font-bold">{movie.movieName}</div>
              </div>
            </div>
          </div>
        </div>

        <NavLink
          to={`/movie-detail/${movie.movieId}`}
          className=" text-center cursor-pointer py-3 mt-1 text-white  font-bold flex justify-center items-center hover:bg-orange-500 duration-500 hover:text-white "
          style={{
            background: "linear-gradient(to right, #fbbd61, #ec7532)",
          }}
        >
          <ShoppingCartOutlined className="text-2xl mr-2 " /> BOOKING NOW
        </NavLink>
      </div>
    </div>
  );
};
