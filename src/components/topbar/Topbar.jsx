import React from "react";
import "./topbar.css";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

export default function Topbar() {

  let history = useHistory();
  function logOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    history.replace("/");
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Cathodic Protection</span>
        </div>
        <div className="topRight">
          <Button variant="contained" color="primary">
            <b>Thông tin cá nhân</b>
          </Button>
          <Button variant="contained" onClick={logOut}>
            <b>Đăng xuất</b>
          </Button>
        </div>
      </div>
    </div>
  );
}
