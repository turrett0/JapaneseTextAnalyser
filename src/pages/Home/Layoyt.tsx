import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../../components/Header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="App">
        {/* <div className="container"> */}
        <Outlet />
        {/* </div> */}
      </div>
    </>
  );
};

export default Layout;
