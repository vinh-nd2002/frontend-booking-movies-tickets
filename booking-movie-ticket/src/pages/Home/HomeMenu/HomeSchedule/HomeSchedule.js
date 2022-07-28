import { Collapse } from "antd";
import _ from "lodash";
import { Fragment } from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const { Panel } = Collapse;

export const SchedulesMovie = (props) => {
  const { arrMovies, arrSchedules } = props;

  const renderScheduleDetail = (movieItem) => {
    const arrScheduleOfMovie = arrSchedules.filter(
      (item) => item.movieId === movieItem.movieId
    );
    return arrScheduleOfMovie?.map((scheduleMovieItem, index) => {
      return (
        <NavLink
          to={`/checkout/${scheduleMovieItem.scheduleMovieId}`}
          key={index}
        >
          <div
            className=" flex items-center justify-center p-3 gap-1   duration-300  font-semibold"
            style={{
              background: "linear-gradient(to right, #fbbd61, #ec7532)",
              color: "white",
            }}
          >
            <ClockCircleOutlined />
            {scheduleMovieItem.scheduleStart}
          </div>
        </NavLink>
      );
    });
  };

  const renderSchedules = () => {
    return arrMovies?.map((movieItem, index) => {
      return (
        <Fragment key={index}>
          <div className="flex items-center p-4">
            <img
              src={movieItem.moviePoster}
              alt={movieItem.movieName}
              style={{ width: "100px", height: "150px" }}
            />
            <div className="ml-10">
              <NavLink
                to={`/movie-detail/${movieItem.movieId}`}
                className=" text-gray-600 hover:text-red-600 font-bold text-lg duration-500"
              >
                {movieItem.movieName}
              </NavLink>
              <div key={index} className="grid grid-cols-3 gap-4 mt-3">
                {renderScheduleDetail(movieItem)}
              </div>
            </div>
          </div>
          <hr />
        </Fragment>
      );
    });
  };
  return <Fragment> {renderSchedules()} </Fragment>;
};
export const HomeSchedule = (props) => {
  const { room } = props;
  let arrMovies = [];
  let arrSchedules = [];
  room.scheduleMovies.forEach((scheduleMovieItem) => {
    arrSchedules.push(scheduleMovieItem);
  });
  arrMovies = _.unionBy(room.scheduleMovies, "movieId");
  return (
    <Collapse bordered={false}>
      <Panel
        header={
          <h1 className="font-bold text-base">{`Room: ${room.roomName}`}</h1>
        }
      >
        <SchedulesMovie arrMovies={arrMovies} arrSchedules={arrSchedules} />
      </Panel>
    </Collapse>
  );
};
