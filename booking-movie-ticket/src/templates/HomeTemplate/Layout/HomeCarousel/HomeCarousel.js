import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovieAction } from "../../../../redux/actions/MovieAction";
import "./HomeCarousel.css";

export const HomeCarousel = (props) => {
  const contentStyle = {
    height: "600px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    dots: false,
    autoplay: true,
  };

  const { moviesDefault } = useSelector((state) => state.MovieReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMovieAction());
  }, []);

  const renderCarousel = () => {
    return moviesDefault?.map((item, key) => {
      return (
        <div key={key}>
          <div
            style={{
              ...contentStyle,
              backgroundImage: `url(
                ${item.moviePoster}
              )`,
            }}
          >
            <img
              src="https://image.lag.vn/upload/news/22/04/18/0C355D0B-DA83-429B-8BE3-F0200DE8A28F_NYIR.jpeg"
              className="w-full opacity-0"
              alt="carousel"
            />
          </div>
        </div>
      );
    });
  };
  return <Carousel autoplay>{renderCarousel()}</Carousel>;
};
