import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { Header } from "./Layout/Header/Header";
import { Footer } from "./Layout/Footer/Footer";
import { HomeCarousel } from "./Layout/HomeCarousel/HomeCarousel";
export const HomeTemplate = (props) => {
  const { Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Header {...propsRoute} />
            <HomeCarousel />
            <Component {...propsRoute} />
            <Footer {...propsRoute} />
          </Fragment>
        );
      }}
    />
  );
};
