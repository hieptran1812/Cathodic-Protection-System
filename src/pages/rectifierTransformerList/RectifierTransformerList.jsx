import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import axios from "axios";
import { React, useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";


const API = process.env.REACT_APP_API;

const columns = [
  {
    field: "devSerial",
    headerName: "Mã thiết bị",
    width: 200,
    renderCell: (params) => {
      return <div className="productListItem">{params.row.devSerial}</div>;
    },
  },
  { field: "locationSystem", headerName: "Location System", width: 200 },
  {
    field: "centralAddress",
    headerName: "Central Address",
    width: 200,
  },
  {
    field: "signalQuality",
    headerName: "Chất lượng tín hiệu",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 160,
  },
  {
    field: "action",
    headerName: "Mô tả",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/rectifierTransformer/" + params.row.devSerial}>
            <button className="productListEdit">Thông tin chi tiết</button>
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
        console.log(res);
        const data = res.data;
        setDeviceInfo(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="productList">
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <Link to="/newproduct">
            <button className="productAddButton">Thêm mới thiết bị</button>
          </Link>
          <DataGrid
            rows={deviceInfo}
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
