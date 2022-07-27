import { Button } from "antd";
import { NavLink } from "react-router-dom";

export const Page500 = () => (
  <div
    className="flex justify-center items-center"
    style={{ width: "100vw", height: "100vh" }}
  >
    <div className="text-center text-black">
      <h1
        className="font-semibold"
        style={{
          fontSize: "6rem",
          lineHeight: 1.2,
          marginBottom: "0.5rem",
        }}
      >
        500
      </h1>
      <p
        className="font-semibold"
        style={{
          marginBottom: "0.5rem",
          fontSize: "1.75rem",
          lineHeight: 1.2,
        }}
      >
        Internal server error.
      </p>
      <p className=" font-normal mt-3 mb-4" style={{ fontSize: "1.53rem" }}>
        The server encountered something unexpected that didn't allow it to
        complete the request.
      </p>
      <NavLink to="/">
        <Button color="primary">Return to website</Button>
      </NavLink>
    </div>
  </div>
);
