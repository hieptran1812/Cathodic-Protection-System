import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import axios from "axios";
import { React, useState, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Button from "@material-ui/core/Button";

const API = process.env.REACT_APP_API;

const columns = [
  {
    field: "name",
    headerName: "Tên người dùng",
    width: 230,
    renderCell: (params) => {
      return <div className="userListUser">{params.row.name}</div>;
    },
  },
  {
    field: "role",
    headerName: "Vai trò",
    width: 200,
  },
  {
    field: "organization",
    headerName: "Tổ chức",
    width: 220,
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 180,
  },
  {
    field: "action",
    headerName: "Thông tin người dùng",
    width: 220,
    renderCell: (params) => {
      return (
        <>
          <Link
            to={"/user/" + params.row.id}
            style={{ textDecoration: "none" }}
          >
            <button className="userListEdit">Chi tiết</button>
          </Link>
        </>
      );
    },
  },
];

export default function UserList() {
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAPI() {
      axios
        .get(`${API}/api/users`)
        .then((res) => {
          setLoading(false);
          // console.log(res);
          const info = res.data;
          setUserInfo(info);
        })
        .catch((error) => console.log(error));
    }
    fetchAPI();
  }, []);

  return (
    <div className="userList">
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <Button
            variant="contained"
            href="/newuser"
            style={{ margin: "40px" }}
          >
            <b>Thêm người dùng</b>
          </Button>
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
