import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import ChartDCMax from "../../components/charts/chartDCMaxDashboard/ChartDCMax";
import ChartTP from "../../components/charts/chartTPDashboard/ChartTP";
import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { Link } from "react-router-dom";

import axios from "axios";
import { React, useEffect, useState } from "react";

const API = process.env.REACT_APP_API;

const columns = [
  {
    field: "status",
    headerName: "Trạng thái",
    width: 180,
    renderCell: (params) => {
      return (
        <>
          {params.row.status === "notConnected" ? (
            <Link
              to={"/rectifierTransformer/" + params.row.devSerial}
              style={{ textDecoration: "none" }}
            >
              <button className="notConnected">Không hoạt động</button>
            </Link>
          ) : (
            <Link
              to={"/testPost/" + params.row.devSerial}
              style={{ textDecoration: "none" }}
            >
              <button className="connected">Hoạt động</button>
            </Link>
          )}
        </>
      );
    },
  },
  {
    field: "organization",
    headerName: "Tổ chức",
    width: 220,
  },
  { field: "devType", headerName: "Loại thiết bị", width: 220 },
  {
    field: "maChuoi",
    headerName: "Tên thiết bị",
    width: 220,
  },
  {
    field: "dateUpdate",
    headerName: "Ngày thêm",
    width: 200,
  },
  {
    field: "date",
    headerName: "Ngày bảo trì",
    width: 200,
  },
  {
    field: "signalQuality",
    headerName: "Chất lượng tín hiệu",
    width: 220,
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
    field: "action",
    headerName: "Thông tin",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          {params.row.devType === "Bo trung tam" ? (
            <Link
              to={"/rectifierTransformer/" + params.row.devSerial}
              style={{ textDecoration: "none" }}
            >
              <button className="productListEdit">Chi tiết</button>
            </Link>
          ) : (
            <Link
              to={"/testPost/" + params.row.devSerial}
              style={{ textDecoration: "none" }}
            >
              <button className="productListEdit">Chi tiết</button>
            </Link>
          )}
        </>
      );
    },
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/dashboardList`)
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
              "organization",
              "devType",
              "maChuoi",
              "dateUpdate",
              "date",
              "signalQuality",
              "devSerial",
            ],
            utf8WithBom: true,
          }}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <div className="home">
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <FeaturedInfo />
          <ChartDCMax />
          <ChartTP />
          <DataGrid
            rows={deviceInfo}
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
