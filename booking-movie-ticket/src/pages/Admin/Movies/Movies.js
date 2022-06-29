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
import { values } from "lodash";

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
      dispatch(
        getAllMovieAction(
          values.movieName,
          values.minMovieEvaluate,
          values.maxMovieEvaluate
        )
      );
    },
    onReset: (values) => {},
  });

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "movieId",
      sorter: (a, b) => a.movieId - b.movieId,
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "moviePoster",
      render: (text, movie, index) => {
        return (
          <Fragment>
            <img
              src={movie.moviePoster}
              alt={movie.movieName}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      width: "15%",
    },
    {
      title: "Tên phim",
      dataIndex: "movieName",
      sorter: (a, b) => {
        let movieNameA = a.movieName.toLowerCase().trim();
        let movieNameB = b.movieName.toLowerCase().trim();
        if (movieNameA > movieNameB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Mô tả",
      dataIndex: "movieDescription",

      render: (text, movie) => {
        return (
          <Fragment>
            {movie.movieDescription.length > 50
              ? movie.movieDescription.substr(0, 50) + " ..."
              : movie.movieDescription}
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Hành động",
      dataIndex: "movieId",
      render: (text, movie) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              className=" mr-2  text-2xl"
              to={`/admin/movies/edit/${movie.movieId}`}
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
                  window.confirm("Bạn có chắc muốn xoá phim " + movie.movieName)
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
      width: "25%",
    },
  ];
  const data = moviesDefault;

  return (
    <div>
      <h3 className="text-4xl">Quản lý Phim</h3>
      <div className="flex justify-between">
        <Button
          className="mb-5"
          onClick={() => {
            props.history.push("/admin/movies/add-new");
          }}
        >
          Thêm phim
        </Button>
        <Button
          className="mb-5"
          onClick={() => {
            dispatch(getAllMovieAction());
          }}
        >
          Reset
        </Button>
      </div>

      <Form onSubmitCapture={formik.handleSubmit}>
        <InputNumber
          style={{ width: "20%" }}
          min={1}
          max={10}
          onChange={handleChangeInputNumber("minMovieEvaluate")}
          placeholder="Nhập đánh giá phim thấp nhất"
        />
        <InputNumber
          style={{ width: "20%" }}
          min={1}
          max={10}
          onChange={handleChangeInputNumber("maxMovieEvaluate")}
          placeholder="Nhập đánh giá phim cao nhất nhất"
        />
        <Input
          name="movieName"
          onChange={formik.handleChange}
          placeholder="Nhập tên phim "
          style={{
            width: "50%",
          }}
        />
        <button
          style={{
            width: "10%",
          }}
          className="p-1 bg-blue-500 rounded-sm"
          type="submit"
        >
          Search
        </button>
      </Form>

      <Table columns={columns} dataSource={data} rowKey={"movieId"} />
    </div>
  );
}
