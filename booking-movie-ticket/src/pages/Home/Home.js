import React, { useEffect } from "react";
import { HomeMenu } from "./HomeMenu/HomeMenu";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllMovieAction } from "../../redux/actions/MovieAction";
import { MovieSlick } from "../../components/MovieSlick/MovieSlick";
import { getAllCineplexAction } from "../../redux/actions/CineplexAction";
import { HomeCarousel } from "../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel";
export const Home = () => {
  const { movies } = useSelector((state) => state.MovieReducer);
  const { cineplexs } = useSelector((state) => state.CineplexReducer);
  console.log("movies", movies);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMovieAction());
    dispatch(getAllCineplexAction());
  }, []);
  return (
    <div>
      <HomeCarousel />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-20">
          <MovieSlick movies={movies} />
        </div>
      </section>
      <hr className="w-2/3 m-auto " />
      <div className="container py-12">
        <HomeMenu cineplexs={cineplexs} />
      </div>
    </div>
  );
};
