import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import axios from "axios";
import { React, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

const API = process.env.REACT_APP_API;

const columns = [
  {
    field: "name",
    headerName: "Tên người dùng",
    width: 200,
    renderCell: (params) => {
      return <div className="userListUser">{params.row.name}</div>;
    },
  },
  {
    field: "role",
    headerName: "Vai trò",
    width: 120,
  },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 180,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 220,
  },
  {
    field: "organization",
    headerName: "Tổ chức",
    width: 220,
  },
  {
    field: "action",
    headerName: "Hành động",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/user/" + params.row.id}>
            <button className="userListEdit">Thông tin chi tiết</button>
          </Link>
        </>
      );
    },
  },
];

export default function UserList() {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  axios
    .get(`${API}/api/users`)
    .then((res) => {
      setLoading(false);
      console.log(res);
      const info = res.data;
      setUserInfo(info);
    })
    .catch((error) => console.log(error));

  return (
    <div className="userList">
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <Link to="/newuser">
            <button className="productAddButton">Thêm người dùng</button>
          </Link>
          <DataGrid
            rows={userInfo}
            disableSelectionOnClick
            autoHeight
            columns={columns}
            pageSize={8}
            checkboxSelection
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
