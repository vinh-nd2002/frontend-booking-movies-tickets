import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { getAllMovieAction } from "../../redux/actions/MovieAction";
import {
  SET_MOVIE_COMING_SOON,
  SET_MOVIE_PLAYING,
} from "../../redux/actions/types/MovieType";
import { MovieFlip } from "../Movies/MovieFlip";
import styleSlick from "./MovieSlick.module.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-next"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
export const MovieSlick = (props) => {
  const dispatch = useDispatch();
  const { moviePlaying, statusMovieDefault, movieComingSoon } = useSelector(
    (state) => state.MovieReducer
  );
  const renderMovieSlick = () => {
    return props.movies.map((item, index) => {
      return (
        <div key={index} className={`${styleSlick["width-item"]}`}>
          <MovieFlip movie={item} />
        </div>
      );
    });
  };

  let acctiveClassMoviesDefault =
    statusMovieDefault === true ? "active_Film" : "none_active_Film";

  let activeClassMoviesPlaying =
    moviePlaying === true && statusMovieDefault === false
      ? "active_Film"
      : "none_active_Film";
  let activeClassMoviesComingSoon =
    movieComingSoon === false && statusMovieDefault === false
      ? "active_Film"
      : "none_active_Film";

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    slidesToShow: 3.5,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesPerRow: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="container">
      <button
        style={{ width: "200px" }}
        className={`${styleSlick[acctiveClassMoviesDefault]} px-8 py-4 mr-1 font-semibold border rounded-sm border-black text-black border  duration-500 hover:bg-black hover:text-white`}
        onClick={() => {
          dispatch(getAllMovieAction());
        }}
      >
        TẤT CẢ PHIM
      </button>
      <button
        style={{ width: "200px" }}
        className={`${styleSlick[activeClassMoviesPlaying]} px-8 py-4 mr-1 font-semibold border rounded-sm border-black text-black border  duration-500 hover:bg-black hover:text-white`}
        onClick={() => {
          const action = { type: SET_MOVIE_PLAYING };
          dispatch(action);
        }}
      >
        PHIM ĐANG CHIẾU
      </button>
      <button
        style={{ width: "200px" }}
        type="button"
        className={` relative ${styleSlick[activeClassMoviesComingSoon]} px-8 py-4 mr-1 font-semibold border rounded-sm border-black text-black border overflow-hidden duration-500 hover:bg-black hover:text-white`}
        onClick={() => {
          const action = { type: SET_MOVIE_COMING_SOON };
          dispatch(action);
        }}
      >
        COMING SOON
        <span
          className="absolute top-0 right-0 px-5 py-1 text-xs tracking-wider text-center uppercase origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 text-white bg-red-600 border-red-600
        "
        >
          hot
        </span>
      </button>

      <Slider {...settings}>{renderMovieSlick()}</Slider>
    </div>
  );
};
