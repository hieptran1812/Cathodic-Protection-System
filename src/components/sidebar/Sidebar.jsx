import "./sidebar.css";
import {
  Dashboard,
  Room,
  PermIdentity,
  SettingsCell,
  NetworkCheck,
} from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { React, useEffect, useState } from "react";

const API = process.env.REACT_APP_API;

export default function Sidebar() {
  const [notiInfo, setNotiInfo] = useState({});

  useEffect(() => {
    axios
      .get(`${API}/api/notificationsSidebar`)
      .then((res) => {
        const data = res.data;
        setNotiInfo(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <NavLink to="/home" className="link" activeClassName="active">
                <Dashboard className="sidebarIcon" />
                Tổng quan
              </NavLink>
            </li>
            <li className="sidebarListItem">
              <NavLink
                to="/mapDevice"
                className="link"
                activeClassName="active"
              >
                <Room className="sidebarIcon" />
                Bản đồ thiết bị
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý</h3>
          <ul className="sidebarList">
            {localStorage.getItem("role") !== "viewer" ? (
              <li className="sidebarListItem">
                <NavLink to="/users" className="link" activeClassName="active">
                  <PermIdentity className="sidebarIcon" />
                  Người dùng
                </NavLink>
              </li>
            ) : null}
            <li className="sidebarListItem">
              <NavLink
                to="/rectifierTransformerList"
                className="link"
                activeClassName="active"
              >
                <SettingsCell className="sidebarIcon" />
                Bộ trung tâm
              </NavLink>
            </li>
            <li className="sidebarListItem">
              <NavLink
                to="/testPostList"
                className="link"
                activeClassName="active"
              >
                <NetworkCheck className="sidebarIcon" />
                Bộ đo
              </NavLink>
            </li>
            <li className="sidebarListItem">
              <NavLink
                to="/documentsList"
                className="link"
                activeClassName="active"
              >
                <InsertDriveFileIcon className="sidebarIcon" />
                Tài liệu hướng dẫn
              </NavLink>
            </li>
            {localStorage.getItem("role") === "superadmin" ? (
              <li className="sidebarListItem">
                <NavLink
                  to="/notifications"
                  className="link"
                  activeClassName="active"
                >
                  <NotificationsIcon className="sidebarIcon" />
                  Thông báo
                  {notiInfo.count !== 0 ? (
                    <b className="tipNoti">{notiInfo.count}</b>
                  ) : null}
                </NavLink>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
