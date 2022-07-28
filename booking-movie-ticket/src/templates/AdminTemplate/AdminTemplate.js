import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { Layout, Menu, Breadcrumb, Dropdown, Space } from "antd";
import {
  VideoCameraOutlined,
  UserOutlined,
  VideoCameraAddOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { USER_LOGIN, WARNING } from "../../utils/settings/config";
import { logoutAction } from "../../redux/actions/UserActions";
import { openNotificationWithIcon } from "../../components/Notification/Notification";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminTemplate = (props) => {
  const { Component, ...restProps } = props;
  const { userLogin } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Redirect to="/" />;
  }

  if (userLogin.role !== "ADMIN") {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Redirect to="/" />;
  }

  const menuItems = [
    {
      key: "1",
      label: (
        <NavLink
          to="/admin"
          className=" text-black font-semibold"
          onClick={() => {
            openNotificationWithIcon(
              WARNING,
              "Sorry this feature is being updated!!",
              "warning"
            );
          }}
        >
          Settings
        </NavLink>
      ),
    },
    {
      key: "2",
      danger: true,
      label: (
        <NavLink
          className="font-bold hover:!text-red-600 duration-500"
          to="/"
          onClick={() => {
            dispatch(logoutAction());
          }}
        >
          LOGOUT
        </NavLink>
      ),
    },
  ];

  const menuDropdown = <Menu items={menuItems} />;

  const dropdownHeader = () => (
    <Dropdown overlay={menuDropdown}>
      <Space>
        <span
          style={{
            width: 50,
            height: 50,
          }}
          className="text-2xl ml-5 rounded-full bg-red-200 flex justify-center items-center"
        >
          {userLogin.username.substr(0, 1).toUpperCase()}
        </span>
        <NavLink to="/profile" className="!text-white !font-bold">
          {userLogin.username}
        </NavLink>
      </Space>
    </Dropdown>
  );

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Layout>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div
                  className="logo mb-2.5 cursor-pointer"
                  onClick={() => propsRoute.history.push("/")}
                >
                  <img src="/logo.svg" alt="logo" />
                </div>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                  <Menu.Item key="1" icon={<UserOutlined />}>
                    <NavLink to="/admin/users">Users</NavLink>
                  </Menu.Item>
                  <SubMenu
                    key="sub1"
                    icon={<VideoCameraOutlined />}
                    title="Movies"
                  >
                    <Menu.Item key="10" icon={<VideoCameraOutlined />}>
                      <NavLink to="/admin/movies">Movies</NavLink>
                    </Menu.Item>
                    <Menu.Item key="11" icon={<VideoCameraAddOutlined />}>
                      <NavLink to="/admin/movies/add-new">Add new</NavLink>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="12" icon={<TagOutlined />}>
                    <NavLink to="/admin/tickets">Tickets</NavLink>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{ padding: 0 }}
                >
                  <div className="text-right pr-5">{dropdownHeader()}</div>
                </Header>
                <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: "85vh" }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }} className="font-bold">
                  <NavLink to="/" className="text-red-600 hover:text-red-600">
                    MovieStar
                  </NavLink>{" "}
                  ©2022 Created by{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/lai.vinh.718"
                    title="Facebook"
                    className="text-black hover:text-black"
                  >
                    Ngũ Duy Vinh
                  </a>
                </Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};

export default AdminTemplate;
