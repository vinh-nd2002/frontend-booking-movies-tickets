import React, { useEffect, useState } from "react";
import { Form, Input, DatePicker, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieByIdAction,
  updateMovieAction,
} from "../../../redux/actions/MovieAction";

const Edit = (props) => {
  const { movieDetail } = useSelector((state) => state.MovieReducer);
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  let { id } = props.match.params;
  useEffect(() => {
    dispatch(getMovieByIdAction(id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      movieName: movieDetail.movieName,
      movieDescription: movieDetail.movieDescription,
      movieTrailer: movieDetail.movieTrailer,
      movieRelease: movieDetail.movieRelease,
      movieLength: movieDetail.movieLength,
      movieEvaluate: movieDetail.movieEvaluate,
      moviePrice: movieDetail.moviePrice,
      movieStatus: movieDetail.movieStatus,
      imageForm: null,
    },

    onSubmit: (values) => {
      console.log("values", values);
      //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== "imageForm") {
          formData.append(key, values[key]);
        } else {
          if (values.imageForm !== null) {
            formData.append(
              "imageForm",
              values.imageForm,
              values.imageForm.name
            );
          }
        }
      }
      // Cập nhật phim
      dispatch(updateMovieAction(formData, id));
    },
  });

  const handleChangeDatePicker = (value) => {
    let movieRelease = moment(value).format("YYYY-MM-DD");
    formik.setFieldValue("movieRelease", movieRelease);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result); //Hình base 64
      };
      //Đem dữ liệu file lưu vào formik
      formik.setFieldValue("imageForm", file);
    }
  };

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: "default",
        }}
        size="default"
      >
        <h3 className="text-4xl font-semibold mx-auto text-center my-5">
          Update Movie{" "}
        </h3>
        <Form.Item label="Movie Name">
          <Input
            name="movieName"
            onChange={formik.handleChange}
            value={formik.values.movieName}
            placeholder="Input movie name"
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="movieTrailer"
            onChange={formik.handleChange}
            value={formik.values.movieTrailer}
            placeholder="Input trailer"
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input
            name="movieDescription"
            onChange={formik.handleChange}
            placeholder="Input Description"
            value={formik.values.movieDescription}
          />
        </Form.Item>
        <Form.Item label="Show date">
          <DatePicker
            onChange={handleChangeDatePicker}
            format={"YYYY-MM-DD"}
            value={moment(formik.values.movieRelease)}
          />
        </Form.Item>

        <Form.Item label="Coming soon">
          <Switch
            onChange={handleChangeSwitch("movieStatus")}
            checked={formik.values.movieStatus}
          />
        </Form.Item>

        <Form.Item label="Evaluate">
          <InputNumber
            min={1}
            max={10}
            onChange={handleChangeInputNumber("movieEvaluate")}
            value={formik.values.movieEvaluate}
          />
        </Form.Item>
        <Form.Item label="Movie Price">
          <InputNumber
            onChange={handleChangeInputNumber("moviePrice")}
            value={formik.values.moviePrice}
          />
        </Form.Item>
        <Form.Item label="Movie Length">
          <InputNumber
            onChange={handleChangeInputNumber("movieLength")}
            value={formik.values.movieLength}
          />
        </Form.Item>

        <Form.Item label="Poster">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg,image/gif,image/png"
          />
          <br />
          <img
            style={{ width: 150, height: 200 }}
            src={imgSrc === "" ? movieDetail.moviePoster : imgSrc}
            alt="..."
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <button
            type="submit"
            className="text-white py-2 px-6 uppercase font-bold "
            style={{
              background: "linear-gradient(to right, #fbbd61, #ec7532)",
            }}
          >
            Update Movie
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Edit;
