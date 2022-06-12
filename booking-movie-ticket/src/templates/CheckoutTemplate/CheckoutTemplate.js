import React, { Fragment } from "react";
import { Redirect, Route } from "react-router-dom";
import { TOKEN } from "../../utils/settings/config";

const CheckoutTemplate = (props) => {
  const { Component, ...restProps } = props;

  if (!localStorage.getItem(TOKEN)) {
    return <Redirect to="/login" exact />;
  }
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <Fragment>
            <Component {...propsRoute} />
          </Fragment>
        );
      }}
    />
  );
};

export default CheckoutTemplate;
