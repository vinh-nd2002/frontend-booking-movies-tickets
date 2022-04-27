import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export const HomeCarousel = () => {
  return (
    <Carousel autoplay>
      <div>
        <div style={contentStyle}>
          <img
            src="https://picsum.photos/1000"
            className="w-full"
            alt="carousel"
          />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img
            src="https://picsum.photos/1000"
            className="w-full"
            alt="carousel"
          />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img
            src="https://picsum.photos/1000"
            className="w-full"
            alt="carousel"
          />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img
            src="https://picsum.photos/1000"
            className="w-full"
            alt="carousel"
          />
        </div>
      </div>
    </Carousel>
  );
};
