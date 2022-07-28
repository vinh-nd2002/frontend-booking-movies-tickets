import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../../redux/actions/UserActions";
import { Table } from "antd";

const avatarMale = "/img/avatar-nam.jpg";
const avatarFemale = "/img/avatar-nu.jpg";
export default function Dashboard(props) {
  const dispatch = useDispatch();
  const { usersDefault } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, []);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "username",
      render: (text, user, index) => {
        return (
          <Fragment>
            <img
              src={
                user.avatar
                  ? user.avatar
                  : user.gender === "MALE"
                  ? avatarMale
                  : avatarFemale
              }
              alt={user.lastName + " " + user.firstName}
              width={100}
              title={user.lastName + " " + user.firstName}
            />
          </Fragment>
        );
      },
      width: "15%",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      render: (text, user, index) => {
        return (
          <span className="font-bold">
            {user.lastName + " " + user.firstName}
          </span>
        );
      },
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
      render: (text, user) => {
        return <span className="font-bold">{user.email}</span>;
      },
    },

    {
      title: "Number Phone",
      dataIndex: "numberPhone",

      render: (text, user) => {
        return <span className="font-bold">{user.numberPhone}</span>;
      },
      width: "15%",
    },
    {
      title: "Gender",
      dataIndex: "gender",

      render: (text, user) => {
        return <span className="font-bold">{user.gender}</span>;
      },
      width: "10%",
    },
    {
      title: "Address",
      dataIndex: "address",

      render: (text, user) => {
        return <span className="font-bold">{user.address}</span>;
      },
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Role",
      dataIndex: "role",

      render: (text, user) => {
        return (
          <span
            className="font-bold"
            style={{
              color: user.role === "ADMIN" ? "red" : "blue",
            }}
          >
            {user.role}
          </span>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "10%",
    },
  ];
  const data = usersDefault;
  return <Table columns={columns} dataSource={data} rowKey={"userId"} />;
}
