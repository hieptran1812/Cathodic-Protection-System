import "./notifications.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import axios from "axios";
import { React, useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

const API = process.env.REACT_APP_API;

export default function NotificationsList() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/notificationsList`)
      .then((res) => {
        setLoading(false);
        // console.log(res);
        const data = res.data;
        setInfo(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    {
      field: "dateCreated",
      headerName: "Thời gian",
      width: 220,
    },
    { field: "title", headerName: "Tên thông báo", width: 200 },
    {
      field: "organization",
      headerName: "Tổ chức",
      width: 220,
    },
    {
      field: "name",
      headerName: "Họ và tên",
      width: 220,
    },
    {
      field: "username",
      headerName: "Tên đăng nhập",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      width: 220,
    },
    {
      field: "notes",
      headerName: "Ghi chú",
      width: 220,
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{
            fields: [
              "dateCreated",
              "title",
              "organization",
              "name",
              "username",
              "phone",
              "email",
              "address",
            ],
            utf8WithBom: true,
          }}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <div className="productList">
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <DataGrid
            rows={info}
            components={{
              Toolbar: CustomToolbar,
            }}
            autoHeight
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            loading={loading}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
