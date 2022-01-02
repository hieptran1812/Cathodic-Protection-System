import React from "react";
import "./topbar.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

export default function Topbar() {
  let history = useHistory();
  function logOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idCurrentUser");
    localStorage.removeItem("role");
    history.replace("/");
    window.location.reload();
  }

  function profileUser() {
    const currentUser = localStorage.getItem("idCurrentUser");
    history.replace("/user/" + currentUser);
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Cathodic Protection</span>
        </div>
        <div className="topRight">
          <Button variant="contained" color="primary" onClick={profileUser}>
            <AccountCircleIcon /><b> Thông tin cá nhân</b>
          </Button>
          <Button variant="contained" onClick={logOut}>
            <ExitToAppIcon /><b> Đăng xuất</b>
          </Button>
        </div>
      </div>
    </div>
  );
}
