import "./sidebar.css";
import {
  Dashboard,
  Room,
  PermIdentity,
  SettingsCell,
  Notifications,
  NetworkCheck,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <Dashboard className="sidebarIcon" />
              Tổng quan
            </li>
            </Link>
            <Link to="/mapDevice" className="link">
            <li className="sidebarListItem">
              <Room className="sidebarIcon" />
              Bản đồ thiết bị
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Người dùng
              </li>
            </Link>
            <Link to="/rectifierTransformerList" className="link">
              <li className="sidebarListItem">
                <SettingsCell className="sidebarIcon" />
                Biến áp chỉnh lưu
              </li>
            </Link>
            <Link to="/testPostList" className="link">
              <li className="sidebarListItem">
                <NetworkCheck className="sidebarIcon" />
                Trụ kiểm tra
              </li>
            </Link>
            <Link to="/alarm" className="link">
              <li className="sidebarListItem">
                <Notifications className="sidebarIcon" />
                Thông báo
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
