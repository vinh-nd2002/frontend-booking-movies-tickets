import React, { useEffect, useState } from "react";
import { Form, Button, DatePicker, Select } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { CineplexService } from "../../../services/CineplexService";
import { CinemaService } from "../../../services/CinemaService";
import { BookingService } from "../../../services/BookingService";
import { openNotificationWithIcon } from "../../../components/Notification/Notification";
import { SUCCESS } from "../../../utils/settings/config";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
export default function ShowTime(props) {
  const formik = useFormik({
    initialValues: {
      movieId: props.match.params.id,
      roomId: "",
      scheduleId: "",
      scheduleDate: "",
    },
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        let body = new FormData();
        body.append("movieId", values.movieId);
        body.append("roomId", values.roomId);
        body.append("scheduleId", values.scheduleId);
        body.append("scheduleDate", values.scheduleDate);
        await BookingService.createScheduleMovie(body);

        openNotificationWithIcon(
          SUCCESS,
          "Tạo lịch chiếu thành công",
          "success"
        );
      } catch (error) {
        console.log("error", error);
      }
    },
  });

  const [state, setState] = useState({
    cineplexs: [],
    cinemas: [],
    rooms: [],
    schedules: [],
  });

  useEffect(() => {
    async function fetchCineplexs() {
      try {
        let listCineplexs = await CineplexService.getAllCineplexs();
        let allSchedules = await BookingService.getSchedules();

        // let listSchedulesOfMovie = await MovieService.getMovieById(
        //   props.match.params.id
        // );
        // console.log(
        //   "listSchedulesOfMovie",
        //   listSchedulesOfMovie.scheduleMovies
        // );
        setState({
          ...state,
          cineplexs: listCineplexs,
          schedules: allSchedules,
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchCineplexs();
  }, []);

  const handleChangeCineplex = async (value) => {
    try {
      let result = await CineplexService.getCineplexsById(value);

      setState({
        ...state,
        cinemas: result.cinemas,
      });
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };

  const handleChangeRoom = (value) => {
    formik.setFieldValue("roomId", value);
  };

  const handleChangeSchedule = (value) => {
    formik.setFieldValue("scheduleId", value);
  };

  const handleChangeCinema = async (value) => {
    try {
      let result = await CinemaService.getCinemaById(value);

      setState({
        ...state,
        rooms: result.rooms,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const onOk = (values) => {
    formik.setFieldValue("scheduleDate", moment(values).format("YYYY-MM-DD"));
    console.log("values", moment(values).format("YYYY-MM-DD"));
  };

  const convertSelectHTR = () => {
    return state.cineplexs?.map((htr, index) => {
      return { label: htr.cineplexName, value: htr.cineplexId };
    });
  };

  let movie = localStorage.getItem("movieParams")
    ? JSON.parse(localStorage.getItem("movieParams"))
    : {};

  return (
    <div className="container ">
      <h3 className="text-2xl text-center mb-4">
        Tạo lịch chiếu - {props.match.params.movieName}
      </h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <img
            src={movie.moviePoster}
            alt="props.match.params.movieName"
            className="w-full"
          />
        </div>
        <Form
          className="col-span-3"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onSubmitCapture={formik.handleSubmit}
        >
          <Form.Item label="Hệ thống rạp">
            <Select
              options={convertSelectHTR()}
              onChange={handleChangeCineplex}
              placeholder="Chọn hệ thống rạp"
            />
          </Form.Item>

          <Form.Item label="Cụm rạp">
            <Select
              options={state.cinemas?.map((cinema, index) => ({
                label: cinema.cinemaName,
                value: cinema.cinemaId,
              }))}
              onChange={handleChangeCinema}
              placeholder="Chọn cụm rạp"
            />
          </Form.Item>

          <Form.Item label="Phòng chiếu">
            <Select
              options={state.rooms?.map((room, index) => ({
                label: room.roomName,
                value: room.roomId,
              }))}
              onChange={handleChangeRoom}
              placeholder="Chọn phòng chiếu"
            />
          </Form.Item>

          <Form.Item label="Giờ chiếu">
            <Select
              options={state.schedules?.map((schedule, index) => ({
                label: schedule.scheduleStart,
                value: schedule.scheduleId,
              }))}
              onChange={handleChangeSchedule}
              placeholder="Chọn giờ chiếu"
            />
          </Form.Item>

          <Form.Item label="Ngày chiếu">
            <DatePicker format="YYYY-MM-DD" showTime onOk={onOk} />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Tạo lịch chiếu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
