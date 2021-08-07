import "./sidebar.css";
import {
  Dashboard,
  Room,
  PermIdentity,
  SettingsCell,
  NetworkCheck,
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <NavLink exact to="/" className="link" activeClassName="active">
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
            <li className="sidebarListItem">
              <NavLink to="/users" className="link" activeClassName="active">
                <PermIdentity className="sidebarIcon" />
                Người dùng
              </NavLink>
            </li>
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
          </ul>
        </div>
      </div>
    </div>
  );
}
