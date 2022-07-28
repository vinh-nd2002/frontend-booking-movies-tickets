import { Form, Input, Table } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { getAllTicketsAction } from "../../../redux/actions/TicketActions";
import { CheckOutlined } from "@ant-design/icons";
import { TicketService } from "../../../services/TicketService";
import { openNotificationWithIcon } from "../../../components/Notification/Notification";
import { ERROR, SUCCESS } from "../../../utils/settings/config";
import Search from "antd/lib/input/Search";
export const Tickets = () => {
  const dispatch = useDispatch();
  const { ticketsDefault } = useSelector((state) => state.TicketReducer);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    dispatch(getAllTicketsAction({}));
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      numberPhone: "",
      ticketCode: "",
    },
    onSubmit: (values) => {
      const requestParams = {
        search: values.ticketCode ? values.ticketCode : "",
        numberPhone: values.numberPhone ? values.numberPhone : "",
        username: values.username ? values.username : "",
      };
      setIsLoading(true);
      dispatch(getAllTicketsAction(requestParams));
      setIsLoading(false);
    },
  });

  const columns = [
    {
      title: "Poster",
      dataIndex: "moviePoster",
      render: (text, ticket, index) => {
        return (
          <Fragment>
            <img
              src={ticket.moviePoster}
              alt={ticket.movieName}
              width={100}
              title={ticket.movieName}
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
      title: "Ticket's Code",
      dataIndex: "ticketCode",
      render: (text, ticket, index) => {
        return <span className="font-bold">{ticket.ticketCode}</span>;
      },
      width: "10%",
    },
    {
      title: "Username",
      dataIndex: "username",
      width: "10%",
      render: (text, ticket) => {
        return <span className="font-bold">{ticket.user.username}</span>;
      },
    },

    {
      title: "Number Phone",
      dataIndex: "numberPhone",

      render: (text, ticket) => {
        return <span className="font-bold">{ticket.user.numberPhone}</span>;
      },
      sortDirections: ["descend", "ascend"],
      width: "10%",
    },
    {
      title: "Price",
      dataIndex: "ticketPrice",

      render: (text, ticket) => {
        return <span className="font-bold">{ticket.ticketPrice}</span>;
      },
      sortDirections: ["descend", "ascend"],
      width: "10%",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",

      render: (text, ticket) => {
        return <span className="font-semibold">{ticket.createdDate}</span>;
      },
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "ticketStatus",
      sorter: (a, b) => {
        if (a.ticketStatus > b.ticketStatus) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      render: (text, ticket) => {
        return (
          <span
            className="font-bold"
            style={{
              color: ticket.ticketStatus === "PENDING" ? "red" : "green",
            }}
          >
            {ticket.ticketStatus}
          </span>
        );
      },
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "ticketId",
      render: (text, ticket) => {
        return (
          <CheckOutlined
            style={{ color: "green", fontSize: 30 }}
            hidden={ticket.ticketStatus === "ACCEPT"}
            onClick={async () => {
              try {
                await TicketService.acceptTicketById(ticket.ticketId);
                openNotificationWithIcon(
                  SUCCESS,
                  "Accept successfully",
                  "success"
                );
                dispatch(getAllTicketsAction({}));
              } catch (error) {
                openNotificationWithIcon(
                  ERROR,
                  "Sorry, an unexpected error has occurred. Please try again",
                  "error"
                );
                console.log("error", error);
              }
            }}
          />
        );
      },
      width: "10%",
    },
  ];
  const data = ticketsDefault;
  return (
    <>
      <Form onSubmitCapture={formik.handleSubmit} className="!mb-10 !gap-2">
        <Input
          className="!py-1.5"
          name="username"
          style={{ width: "30%", fontSize: 16 }}
          onChange={formik.handleChange}
          placeholder="Input Username"
        />
        <Input
          className="!py-1.5 "
          name="numberPhone"
          style={{ width: "30%", fontSize: 16 }}
          onChange={formik.handleChange}
          placeholder="Input Number Phone"
        />

        <Search
          style={{
            width: "40%",
            fontSize: 16,
          }}
          name="ticketCode"
          onChange={formik.handleChange}
          placeholder="Input Ticket's Code"
          enterButton="Search"
          onSearch={formik.handleSubmit}
          size="large"
          loading={isLoading}
        />
      </Form>

      <Table columns={columns} dataSource={data} rowKey={"ticketId"} />
    </>
  );
};
