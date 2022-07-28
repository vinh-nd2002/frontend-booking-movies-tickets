import React, { useState } from "react";
import { Form, Input, DatePicker, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { createMovieAction } from "../../../redux/actions/MovieAction";

const AddNew = () => {
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      movieName: "",
      movieTrailer: "",
      movieDescription: "",
      movieRelease: "",
      movieLength: 0,
      movieStatus: false,
      movieEvaluate: 0,
      moviePrice: 0,
      imageForm: {},
    },
    onSubmit: (values) => {
      //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== "imageForm") {
          formData.append(key, values[key]);
        } else {
          formData.append("imageForm", values.imageForm, values.imageForm.name);
        }
      }
      //Gọi api gửi các giá trị formdata về backend xử lý
      dispatch(createMovieAction(formData));
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
        initialValues={{
          size: "default",
        }}
        size="default"
      >
        <h3 className="text-4xl font-semibold mx-auto text-center my-5">
          Create New Movie
        </h3>

        <Form.Item label="Movie Name">
          <Input
            name="movieName"
            onChange={formik.handleChange}
            placeholder="Input movie name"
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="movieTrailer"
            onChange={formik.handleChange}
            placeholder="Input trailer"
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input
            name="movieDescription"
            onChange={formik.handleChange}
            placeholder="Input Description"
          />
        </Form.Item>
        <Form.Item label="Show date">
          <DatePicker format={"YYYY-MM-DD"} onChange={handleChangeDatePicker} />
        </Form.Item>
        <Form.Item label="Coming soon">
          <Switch onChange={handleChangeSwitch("movieStatus")} />
        </Form.Item>

        <Form.Item label="Evaluate">
          <InputNumber
            onChange={handleChangeInputNumber("movieEvaluate")}
            min={1}
            max={10}
          />
        </Form.Item>

        <Form.Item label="Movie Price">
          <InputNumber onChange={handleChangeInputNumber("moviePrice")} />
        </Form.Item>

        <Form.Item label="Movie Length">
          <InputNumber onChange={handleChangeInputNumber("movieLength")} />
        </Form.Item>

        <Form.Item label="Poster">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg,image/gif,image/png"
          />
          <br />
          {imgSrc ? (
            <img style={{ width: 200, height: 300 }} src={imgSrc} alt="..." />
          ) : (
            <></>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <button
            type="submit"
            className="text-white py-2 px-6 font-bold uppercase"
            style={{
              background: "linear-gradient(to right, #fbbd61, #ec7532)",
            }}
          >
            Create movie
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddNew;
