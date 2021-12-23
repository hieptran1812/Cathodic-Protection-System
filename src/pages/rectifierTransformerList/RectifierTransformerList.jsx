import "./productList.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Link } from "react-router-dom";
import axios from "axios";
import { React, useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Button from "@material-ui/core/Button";

const API = process.env.REACT_APP_API;

const columns = [
  { field: "maChuoi", headerName: "Tên thiết bị", width: 200 },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 160,
  },
  {
    field: "signalQuality",
    headerName: "Signal quality",
    width: 170,
  },
  {
    field: "dateUpdate",
    headerName: "Ngày thêm thiết bị",
    width: 200,
  },
  {
    field: "date",
    headerName: "Ngày bảo trì",
    width: 200,
  },
  {
    field: "centralAddress",
    headerName: "Central Address",
    width: 200,
  },
  {
    field: "devSerial",
    headerName: "Mã thiết bị",
    width: 220,
    renderCell: (params) => {
      return <div className="productListItem">{params.row.devSerial}</div>;
    },
  },
  {
    field: "dienApPin",
    headerName: "Battery voltage (V)",
    width: 180,
  },
  {
    field: "action",
    headerName: "Thông tin",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <Link
            to={"/rectifierTransformer/" + params.row.devSerial}
            style={{ textDecoration: "none" }}
          >
            <button className="productListEdit">Chi tiết</button>
          </Link>
        </>
      );
    },
  },
];
export default function RectifierTransformerList() {
  const [loading, setLoading] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/rectifierTransformerList`)
      .then((res) => {
        setLoading(false);
        // console.log(res);
        const data = res.data;
        setDeviceInfo(data);
      })
      .catch((error) => console.log(error));
  }, []);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{
            fields: [
              "maChuoi",
              "phone",
              "signalQuality",
              "dateUpdate",
              "date",
              "centralAddress",
              "devSerial",
              "dienApPin",
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
          {localStorage.getItem("role") !== "viewer" ? (
            <Button
              variant="contained"
              href="/newRectifier"
              style={{ margin: "40px" }}
              color="secondary"
              startIcon={<AddBoxIcon />}
            >
              <b>Thêm mới Bộ trung tâm</b>
            </Button>
          ) : null}
          <DataGrid
            rows={deviceInfo}
            components={{
              Toolbar: CustomToolbar,
            }}
            autoHeight
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            loading={loading}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
