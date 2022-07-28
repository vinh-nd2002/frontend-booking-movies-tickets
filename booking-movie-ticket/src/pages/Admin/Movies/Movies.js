import React, { Fragment, useEffect } from "react";
import { Button, Form, InputNumber, Table } from "antd";
import { useFormik } from "formik";
import { Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  deleteMovieByIdAction,
  getAllMovieAction,
} from "../../../redux/actions/MovieAction";

export default function Movies(props) {
  const { moviesDefault } = useSelector((state) => state.MovieReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovieAction());
  }, []);

  const formik = useFormik({
    initialValues: {
      movieName: "",
      minMovieEvaluate: 0,
      maxMovieEvaluate: 10,
    },
    onSubmit: (values) => {
      const requestParams = {
        search: values.movieName,
        minMovieEvaluate: values.minMovieEvaluate ? values.minMovieEvaluate : 0,
        maxMovieEvaluate: values.maxMovieEvaluate
          ? values.maxMovieEvaluate
          : 10,
      };
      dispatch(getAllMovieAction(requestParams));
    },
  });

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const columns = [
    {
      title: "Movie ID",
      dataIndex: "movieId",
      sorter: (a, b) => a.movieId - b.movieId,
      sortDirections: ["descend", "ascend"],
      width: "10%",
    },

    {
      title: "Movie's Poster",
      dataIndex: "moviePoster",
      render: (text, movie, index) => {
        return (
          <Fragment>
            <img
              src={movie.moviePoster}
              alt={movie.movieName}
              width={150}
              title={movie.movieName}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      width: "20%",
    },
    {
      title: "Movie's Name",
      dataIndex: "movieName",
      sorter: (a, b) => {
        let movieNameA = a.movieName.toLowerCase().trim();
        let movieNameB = b.movieName.toLowerCase().trim();
        if (movieNameA > movieNameB) {
          return 1;
        }
        return -1;
      },
      render: (text, movie, index) => {
        return (
          <NavLink
            to={`/movie-detail/${movie.movieId}`}
            className="font-bold text-black hover:text-black"
          >
            {movie.movieName}
          </NavLink>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "movieDescription",

      render: (text, movie) => {
        return (
          <Fragment>
            {movie.movieDescription.length > 300
              ? movie.movieDescription.substr(0, 300) + " ..."
              : movie.movieDescription}
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "30%",
    },
    {
      title: "Action",
      dataIndex: "movieId",
      render: (text, movie) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className=" mr-2  text-2xl"
              to={`/admin/movies/update/${movie.movieId}`}
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              className="text-2xl"
              onClick={() => {
                //Gọi action xoá
                if (
                  window.confirm(
                    "Are you sure you want to delete the movie " +
                      movie.movieName
                  )
                ) {
                  //Gọi action
                  dispatch(deleteMovieByIdAction(movie.movieId));
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>

            <NavLink
              key={3}
              className=" mr-2 text-2xl"
              to={`/admin/movies/showtime/${movie.movieId}/${movie.movieName}`}
              onClick={() => {
                localStorage.setItem("movieParams", JSON.stringify(movie));
              }}
            >
              <CalendarOutlined style={{ color: "green" }} />
            </NavLink>
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "10%",
    },
  ];
  const data = moviesDefault;

  return (
    <div>
      <h3 className="text-4xl">Movies Management</h3>
      <div className="flex justify-between">
        <button
          className="mb-5 py-2 px-4 rounded-sm text-white font-bold"
          style={{
            background: "linear-gradient(to right, #fbbd61, #ec7532)",
          }}
          onClick={() => {
            props.history.push("/admin/movies/add-new");
          }}
        >
          Create New Movie
        </button>
        <button
          className="mb-5 py-2 px-4 rounded-sm text-white font-bold"
          style={{
            background: "linear-gradient(to right, #fbbd61, #ec7532)",
          }}
          onClick={() => {
            dispatch(getAllMovieAction());
          }}
        >
          Reset
        </button>
      </div>

      <Form onSubmitCapture={formik.handleSubmit}>
        <InputNumber
          style={{ width: "20%" }}
          min={1}
          max={10}
          onChange={handleChangeInputNumber("minMovieEvaluate")}
          placeholder="Input min evaluate"
        />
        <InputNumber
          style={{ width: "20%" }}
          min={1}
          max={10}
          onChange={handleChangeInputNumber("maxMovieEvaluate")}
          placeholder="Input max evaluate"
        />
        <Input
          name="movieName"
          onChange={formik.handleChange}
          placeholder="Input movie's name"
          style={{
            width: "50%",
          }}
        />
        <button
          className="mb-5 px-4 rounded-sm text-white font-bold"
          style={{
            background: "linear-gradient(to right, #fbbd61, #ec7532)",
            width: "10%",
            padding: 5,
          }}
          type="submit"
        >
          Search
        </button>
      </Form>

      <Table columns={columns} dataSource={data} rowKey={"movieId"} />
    </div>
  );
}
