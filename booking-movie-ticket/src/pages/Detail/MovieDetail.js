import React, { Fragment, useEffect } from "react";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import "../../assets/style/circle.css";
import { Collapse, Rate, Tabs } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../../redux/actions/MovieAction";
import { getAllCineplexAction } from "../../redux/actions/CineplexAction";
import { NavLink } from "react-router-dom";
import "./MovieDetail.css";

const { TabPane } = Tabs;
const { Panel } = Collapse;

export const MovieDetail = (props) => {
  const { movieDetail } = useSelector((state) => state.MovieReducer);

  const { cineplexs } = useSelector((state) => state.CineplexReducer);
  const dispatch = useDispatch();
  let { id } = props.match.params;
  useEffect(() => {
    dispatch(getMovieByIdAction(id));
    dispatch(getAllCineplexAction());
    window.scrollTo(0, 0);
  }, []);

  const renderSchedules = (room) => {
    const filtered_array = room.scheduleMovies.filter(
      (item) => item.movieId === parseInt(id)
    );
    return filtered_array?.map((scheduleItem, index) => {
      return (
        <NavLink to={`/checkout/${scheduleItem.scheduleMovieId}`} key={index}>
          <div className="bg-black flex items-center justify-center p-3 gap-2 text-base text-white hover:bg-gray-500 duration-300 border-2">
            <ClockCircleOutlined />
            <h3 className="m-0 text-white">{scheduleItem.scheduleStart}</h3>
          </div>
        </NavLink>
      );
    });
  };

  const renderCinemas = (cinemas, imgUrl) => {
    return cinemas.map((cinemaItem, index) => {
      return (
        <TabPane
          tab={
            <div className="flex justify-between items-center ">
              <img
                src={imgUrl}
                className="rounded-md"
                alt="logo-cinema"
                style={{ width: "60px", height: "60px" }}
              />
              <div
                className="text-center tracking-tighter p-2 text-ellipsis"
                style={{ width: "400px" }}
              >
                <h1 className="text-lg text-white">{cinemaItem.cinemaName}</h1>
                <h1 className="text-xs text-gray-400">
                  {cinemaItem.cinemaAddress}
                </h1>
              </div>
            </div>
          }
          key={index}
        >
          {cinemaItem.rooms?.map((roomItem, key) => {
            return (
              <Fragment key={key}>
                <Collapse bordered={false} className="!bg-transparent">
                  <Panel
                    header={
                      <h1 className="!text-white">{`Phòng: ${roomItem.roomName}`}</h1>
                    }
                  >
                    <div key={index} className="grid grid-cols-5 gap-4">
                      {renderSchedules(roomItem)}
                    </div>
                  </Panel>
                </Collapse>
              </Fragment>
            );
          })}
        </TabPane>
      );
    });
  };
  const renderCineplexs = () => {
    return cineplexs?.map((cineplexItem, index) => {
      return (
        <TabPane
          tab={
            <img
              src={cineplexItem.cineplexLogo}
              alt="tab"
              className="rounded-md"
              style={{ width: "100px", height: "100px" }}
            />
          }
          key={index}
        >
          <Tabs tabPosition="left">
            {renderCinemas(cineplexItem.cinemas, cineplexItem.cineplexLogo)}
          </Tabs>
        </TabPane>
      );
    });
  };
  return (
    <div
      style={{
        backgroundImage: `url(${movieDetail.moviePoster})`,
        minHeight: "100vh",
        backgroundSize: "100%",
        backgroundPosition: "center",
      }}
    >
      <CustomCard
        style={{ paddingTop: 150, minHeight: "100vh", borderRadius: 0 }}
        effectColor="#fff"
        blur={10}
      >
        <div className="container flex justify-between items-center">
          <div className="flex justify-between items-center text-left">
            <img
              src={movieDetail.moviePoster}
              alt={movieDetail.movieName}
              style={{ width: "300px", height: "450px" }}
            />
            <div className="ml-4 p-4 ">
              <p className="text-sm">
                Ngày chiếu:
                <span className="text-lg text-red-700 ml-2 font-bold">
                  {movieDetail.movieRelease}
                </span>
              </p>
              <p className="text-4xl text-white font-bold">
                {movieDetail.movieName}
              </p>
              <p className="italic">" {movieDetail.movieDescription} "</p>
              <p className="text-gray-300 text-xs ">
                Thời lượng phim:{" "}
                <span className="italic text-white font-bold">
                  {movieDetail.movieLenght}
                </span>{" "}
                phút
              </p>
            </div>
          </div>
          <div className="">
            <h1
              style={{
                marginLeft: "32%",
                color: "yellow",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              Đánh giá
            </h1>
            <h1
              style={{ marginLeft: "10%" }}
              className="text-green-400 text-2xl"
            >
              <Rate
                allowHalf
                value={movieDetail.movieEvaluate / 2}
                style={{ color: "#78ed78", fontSize: 30 }}
              />
            </h1>
            <div className={`c100 p${movieDetail.movieEvaluate * 10} big`}>
              <span className="text-white">
                {movieDetail.movieEvaluate * 10}%
              </span>
              <div className="slice">
                <div className="bar"></div>
                <div className="fill"></div>
              </div>
            </div>
            <br />
          </div>
        </div>
        <div className="container my-20">
          <Tabs tabPosition="left">{renderCineplexs()}</Tabs>
        </div>
      </CustomCard>
    </div>
  );
};
