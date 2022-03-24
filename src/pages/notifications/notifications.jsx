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
  async function changeStatus(noti, idNoti) {
    const statusNoti = { status: noti, id: idNoti };
    await axios
      .post(`${API}/api/editStatus/`, statusNoti)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => console.log(error));
  }

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
      field: "status",
      headerName: "Trạng thái",
      width: 180,
      renderCell: (params) => {
        if (params.row.status === "notResponse") {
          return (
            <button
              className="notConnected"
              onClick={() => changeStatus(params.row.status, params.row.id)}
            >
              Chưa phản hồi
            </button>
          );
        } else {
          return (
            <button
              className="connected"
              onClick={() => changeStatus(params.row.status, params.row.id)}
            >
              Đã phản hồi
            </button>
          );
        }
      },
    },
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
