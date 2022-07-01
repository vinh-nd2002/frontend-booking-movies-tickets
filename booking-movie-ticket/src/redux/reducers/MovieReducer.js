import {
  GET_ALL_MOVIE,
  GET_MOVIE_BY_ID,
  SET_MOVIE_COMING_SOON,
  SET_MOVIE_PLAYING,
} from "../actions/types/MovieType";

const stateDefault = {
  movies: [],
  moviePlaying: true,
  movieComingSoon: false,
  statusMovieDefault: true,
  moviesDefault: [],
  movieDetail: {},
};

export const MovieReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_MOVIE:
      state.movies = action.value;
      state.moviesDefault = state.movies;
      state.statusMovieDefault = true;
      return { ...state };
    case SET_MOVIE_PLAYING:
      state.statusMovieDefault = false;
      state.movieComingSoon = true;
      state.moviePlaying = true;
      state.movies = state.moviesDefault.filter(
        (movieItem) => movieItem.movieStatus === false
      );
      return { ...state };
    case SET_MOVIE_COMING_SOON:
      state.statusMovieDefault = false;
      state.moviePlaying = false;
      state.movieComingSoon = false;
      state.movies = state.moviesDefault.filter(
        (movieItem) => movieItem.movieStatus === true
      );
      return { ...state };
    case GET_MOVIE_BY_ID:
      state.movieDetail = action.value;
      return { ...state };
    default:
      return { ...state };
  }
};
