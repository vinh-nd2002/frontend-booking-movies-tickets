import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingSeatAction,
  bookingTicketsAction,
  getAllSeatsAction,
  getScheduleMovieDetailAction,
  otherUserBookingSeatAction,
} from "../../redux/actions/BookingAction";
import style from "./Checkout.module.css";
import { CheckOutlined, UserOutlined, SmileOutlined } from "@ant-design/icons";

import "./Checkout.css";
import _ from "lodash";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { BookingService } from "../../services/BookingService";
import { NavLink } from "react-router-dom";

export let stompClient = null;

export const Checkout = (props) => {
  const { userLogin } = useSelector((state) => state.UserReducer);

  const {
    arrSeats,
    scheduleMovieDetail,
    arrChoosingSeat,
    arrOtherChoosingSeat,
  } = useSelector((state) => state.BookingReducer);

  console.log("scheduleMovieDetail", scheduleMovieDetail);
  let arrBookedSeats = { ...scheduleMovieDetail.tickets };

  const dispatch = useDispatch();
  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect(
      {},
      () => {
        stompClient.subscribe(
          `/schedule-movie/${props.match.params.id}`,
          (payload) => {
            let payloadData = JSON.parse(payload.body);
            // Lọc các phần tử chỉ chứa ID của scheduleMovieId hiện tại
            let arrCurrentScheduleMovie = payloadData.filter(
              (item) =>
                item.scheduleMovieId !== scheduleMovieDetail.scheduleMovieId
            );

            // Bỏ mình ra khỏi danh sách
            let resultTemp = arrCurrentScheduleMovie.filter(
              (item) => item.username !== userLogin.username
            );

            if (resultTemp.length !== 0) {
              // Lọc username district
              let arrOtherDistrict = [];

              resultTemp.forEach((element) => {
                arrOtherDistrict.push(element.username);
              });

              arrOtherDistrict = _.uniq(arrOtherDistrict);

              // Lọc các ghế mà other user đang chọn\

              let arrOtherBookingSeats = [];

              arrOtherDistrict.forEach((element) => {
                arrOtherBookingSeats.push(
                  _.findLast(
                    arrCurrentScheduleMovie,
                    (item) => item.username === element
                  )
                );
              });

              // Gộp danh sách tất cả các ghế do other user đang chọn
              let arrOtherSeats = arrOtherBookingSeats.reduce(
                (result, item, index) => {
                  let arrSeat = item.seats;
                  return [...result, ...arrSeat];
                },
                []
              );
              arrOtherSeats = _.unionBy(arrOtherSeats, "seatId");

              // Đưa lên redux
              dispatch(otherUserBookingSeatAction(arrOtherSeats));
            } else {
              // Đưa lên redux
              let arrOtherSeats = [];
              dispatch(otherUserBookingSeatAction(arrOtherSeats));
            }
          }
        );
        stompClient.subscribe(
          `/schedule-movie/${props.match.params.id}/success`,
          async () => {
            dispatch(getScheduleMovieDetailAction(props.match.params.id));
            // send mail
            await BookingService.sendMailAfterBookingSuccess(
              userLogin.email,
              props.match.params.id
            );
          }
        );

        // Vừa vào sẽ lập tức load danh sách ghế đã được người khác đặt
        if (stompClient) {
          stompClient.send(
            "/booking/first-load-seats",
            {},
            JSON.stringify(props.match.params.id)
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllSeatsAction());
    dispatch(getScheduleMovieDetailAction(props.match.params.id));
    connect();
    window.addEventListener("beforeunload", resetSeat);
    return () => {
      resetSeat();
      window.removeEventListener("beforeunload", resetSeat);
    };
  }, []);

  const resetSeat = () => {
    if (stompClient) {
      let seatBooking = {
        scheduleMovieId: scheduleMovieDetail.scheduleMovieId,
        username: userLogin.username,
      };

      console.log("seatBooking", seatBooking);
      if (stompClient) {
        stompClient.send(
          "/booking/reset-seats",
          {},
          JSON.stringify(seatBooking)
        );
      }
    }
  };

  let arrMyseats = _.filter(
    arrBookedSeats,
    (element) => element.username === userLogin.username
  );
  const renderSeats = () => {
    return arrSeats.map((seat, index) => {
      let classSeatVIP = seat.seatType === "VIP" ? "seatVip" : "";

      let disabled =
        _.find(
          arrBookedSeats,
          (item) => item.seatNumber === seat.seatNumber
        ) === undefined
          ? false
          : true;

      let classBookedSeat = disabled ? "bookedSeat" : "";

      let classOtherUserBookingSeat = "";
      let indexSeatOther = arrOtherChoosingSeat.findIndex(
        (seatItem) => seatItem.seatId === seat.seatId
      );

      let mySeat = _.filter(
        arrMyseats,
        (item) => item.seatNumber === seat.seatNumber
      );
      let classMySeat = mySeat.length === 1 ? "mySeat" : "";

      if (indexSeatOther !== -1) {
        classOtherUserBookingSeat = "otherUserBookingSeat";
      }
      let classBookingSeat =
        _.find(
          arrChoosingSeat,
          (seatItem) => seatItem.seatId === seat.seatId
        ) === undefined
          ? ""
          : "bookingSeat";

      return (
        <Fragment key={index}>
          <button
            disabled={disabled || classOtherUserBookingSeat !== ""}
            className={`seat ${classSeatVIP} ${classMySeat}  ${classBookedSeat} ${classBookingSeat} ${classOtherUserBookingSeat} text-lg font-mono`}
            onClick={() => {
              const action = bookingSeatAction(
                seat,
                scheduleMovieDetail,
                userLogin
              );
              dispatch(action);
            }}
          >
            {disabled ? (
              classMySeat !== "" ? (
                <UserOutlined style={{ marginBottom: 3 }} />
              ) : (
                <span className=" font-bold">X</span>
              )
            ) : classOtherUserBookingSeat !== "" ? (
              <SmileOutlined style={{ marginBottom: 3 }} />
            ) : (
              seat.seatNumber
            )}
          </button>
          {(index + 1) % 12 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="container mt-16 mb-10">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div className="flex flex-col items-center mt-5">
            <div
              className="bg-black "
              style={{ width: "80%", height: 15 }}
            ></div>
            <div className={`${style["trapezoid"]} text-center`}>
              <h3 className="mt-3 text-black">Màn hình</h3>
            </div>
            <div>{renderSeats()}</div>
          </div>
          <div className="mt-5 flex justify-center">
            <table className=" divide-y divide-gray-200 w-2/3">
              <thead className="bg-gray-50 p-5">
                <tr>
                  <th className="text-center">Ghế chưa đặt</th>
                  <th className="text-center">Ghế đang đặt</th>
                  <th className="text-center">Ghế VIP</th>
                  <th className="text-center">Ghế đã đặt</th>
                  <th className="text-center">Ghế bạn đặt</th>
                  <th className="text-center">Ghế người khác đang đặt</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td>
                    <button className="seat" disabled>
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  <td>
                    <button className="seat bookingSeat " disabled>
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  <td>
                    <button className="seat seatVip " disabled>
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  <td>
                    <button className="seat bookedSeat" disabled>
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  <td>
                    <button className="seat mySeat " disabled>
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                  <td>
                    <button className="seat otherUserBookingSeat " disabled>
                      <CheckOutlined
                        style={{ marginBottom: 7.5, fontWeight: "bold" }}
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-3 mt-20">
          <h3 className="flex justify-between text-xl text-black">
            <span> Tên phim: </span>
            <NavLink
              to={`/movie-detail/${scheduleMovieDetail.movieId}`}
              className="font-bold text-black"
            >
              {scheduleMovieDetail.movieName}
            </NavLink>
          </h3>

          <hr className="my-5" />
          <h3 className="flex justify-between ">
            <span>Địa điểm: </span>
            <span className="font-bold ">{scheduleMovieDetail.cinemaName}</span>
          </h3>
          <h3 className="flex justify-between ">
            <span> Ngày chiếu: </span>
            <span className="font-bold ">
              {" "}
              {scheduleMovieDetail.scheduleDate}
            </span>
          </h3>
          <h3 className="flex justify-between ">
            <span> Giờ bắt đầu: </span>
            <span className="font-bold ">
              {" "}
              {scheduleMovieDetail.scheduleStart}
            </span>
          </h3>

          <hr className="my-5" />
          <div className="flex justify-between gap-2">
            <div className="">
              <span className="text-red-700 font-semibold">Ghế</span>
              <div className="grid grid-cols-5 gap-1">
                {_.sortBy(arrChoosingSeat, "seatNumber").map((seat, index) => {
                  return (
                    <span
                      key={index}
                      className="text-green-500 text-lg col-span-1 font-bold"
                    >
                      {seat.seatNumber}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="text-xl">
              <span className="text-green-500 font-bold">
                {arrChoosingSeat
                  .reduce((total, seat, index) => {
                    let ticketPrice = scheduleMovieDetail.moviePrice;
                    if (seat.seatType === "VIP") {
                      ticketPrice = scheduleMovieDetail.moviePrice * 1.5;
                    }
                    return (total += ticketPrice);
                  }, 0)
                  .toLocaleString()}
                Đ
              </span>
            </div>
          </div>
          <div className="my-5 text-black">
            <i className="text-lg font-bold ">Email</i> <br />{" "}
            <span className="text-lg text-green-500 font-semibold">
              {" "}
              {userLogin.email}
            </span>
          </div>
          <div className="my-5 text-black">
            <i className="text-lg font-bold ">Phone</i> <br />{" "}
            <span className="text-lg text-green-500 font-semibold">
              {" "}
              {userLogin.numberPhone}
            </span>
          </div>
          <button
            className="mb-0 bg-green-500 block w-full text-white font-bold py-4 hover:bg-green-700 duration-500"
            onClick={() => {
              const action = bookingTicketsAction(
                arrChoosingSeat,
                scheduleMovieDetail.scheduleMovieId,
                userLogin,
                scheduleMovieDetail.moviePrice
              );
              dispatch(action);
            }}
          >
            ĐẶT VÉ
          </button>
        </div>
      </div>
    </div>
  );
};
