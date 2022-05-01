import React from "react";
import "./MovieFlip.css";
import { PlayCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
export const MovieFlip = (props) => {
  const { movie } = props;
  return (
    <div className="flip-card mt-4">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            src={movie.moviePoster.imgUrl}
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
              src={movie.moviePoster.imgUrl}
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
                  className="hover:scale-125 duration-500 "
                />
              </div>
              <div className="text-2xl mt-2 font-bold">{movie.movieName}</div>
            </div>
          </div>
        </div>
      </div>

      <div
        // onClick={() => {
        //   history.push(`/detail/${item.maPhim}`);
        // }}

        className="bg-orange-300 text-center cursor-pointer py-3 mt-1 text-black font-bold flex justify-center items-center hover:bg-red-500 duration-500 hover:text-white "
      >
        <ShoppingCartOutlined className="text-2xl mr-2 " /> ĐẶT VÉ NGAY
      </div>
    </div>
  );
};
