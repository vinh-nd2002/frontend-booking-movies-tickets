import React from "react";
import Slider from "react-slick";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import "./HomeCarousel.css";
import HomeCarouselData from "../../../../utils/constants/HomeCarouseData";

export const HomeCarousel = (props) => {
  function NextArrow(props) {
    const { onClick } = props;
    return (
      <RightOutlined
        onClick={onClick}
        style={{
          position: "absolute",
          right: "15px",
          top: "48%",
          fontSize: "3rem",
          transform: "translateY(-50%)",
          width: 50,
          height: 100,
          color: "#d8d8d8",
          cursor: "pointer",
          transition: "all .2s",
          zIndex: 2,
        }}
      />
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <LeftOutlined
        onClick={onClick}
        style={{
          position: "absolute",
          left: "15px",
          top: "48%",
          fontSize: "3rem",
          transform: "translateY(-50%)",
          width: 50,
          height: 100,
          color: "#d8d8d8",
          cursor: "pointer",
          transition: "all .2s",
          zIndex: 2,
        }}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    autoplay: false,
    speed: 500,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div id="carousel" className="relative" style={{ zIndex: 1 }}>
      <Slider {...settings}>
        {HomeCarouselData.map((item, index) => {
          return (
            <div key={index} className="relative">
              <img
                src={item?.moviePoster}
                alt="item"
                className="w-full h-full"
              />
              <div
                className="absolute w-full h-full top-0"
                style={{
                  background: "linear-gradient(to top,#000,transparent 20%)",
                }}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};
