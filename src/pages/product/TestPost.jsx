import "./product.css";
import MapDevice from "../../components/googleMap/mapDevice";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport
} from "@material-ui/data-grid";
import { useParams } from "react-router-dom";
import axios from "axios";
import { React, useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

const API = process.env.REACT_APP_API;
const key = "AIzaSyB_-Yji-hFBCnR4YC964AwLLWjnDcUSVdY";

const columns = [
  { field: "id", hide: true },
  {
    field: "time",
    headerName: "Thời gian",
    width: 230,
  },
  {
    field: "dienApPin",
    headerName: "Điện áp pin (V)",
    width: 180,
  },
  {
    field: "dienApNguon",
    headerName: "Điện áp nguồn (V)",
    width: 190,
  },
  {
    field: "temperature",
    headerName: "Nhiệt độ thiết bị (độ C)",
    width: 220,
  },
  {
    field: "openPoint1",
    headerName: "Điện áp âm 1 mở (V)",
    width: 200,
  },
  {
    field: "closePoint1",
    headerName: "Điện áp âm 1 đóng (V)",
    width: 220,
  },
  {
    field: "openPoint2",
    headerName: "Điện áp âm 2 mở (V)",
    width: 200,
  },
  {
    field: "closePoint2",
    headerName: "Điện áp âm 2 đóng (V)",
    width: 220,
  },
  {
    field: "openPoint3",
    headerName: "Điện áp âm 3 mở (V)",
    width: 200,
  },
  {
    field: "closePoint3",
    headerName: "Điện áp âm 3 đóng (V)",
    width: 220,
  },
  {
    field: "openPoint4",
    headerName: "Điện áp âm 4 mở (V)",
    width: 200,
  },
  {
    field: "closePoint4",
    headerName: "Điện áp âm 4 đóng (V)",
    width: 220,
  },
  {
    field: "signalQuality",
    headerName: "Chất lượng tín hiệu",
    width: 200,
  },
];
export default function TestPost() {
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [infoTop, setInfoTop] = useState([{}]);
  const [infoBottom, setInfoBottom] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      await axios
        .get(`${API}/api/testPost/table/${productId}`)
        .then((res) => {
          setLoading(false);
          const data = res.data;
          setInfoTop(data);
          setInfoBottom(data);
        })
        .catch((error) => console.log(error));
    }
    setInterval(fetchAPI, 2000);
  }, [productId]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{
            fields: [
              "Thoi gian",
              "Dien ap pin",
              "Dien ap nguon",
              "Nhiet do thiet bi",
              "Dien AC 3 pha",
              "Dien DC Point 1",
              "Dong dien DC",
              "Chat luong tin hieu",
            ],
            utf8WithBom: true,
          }}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <div className="product">
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%", margin: "20px 40px 20px" }}>
          <div className="productTitleContainer">
            <h1 className="productTitle">Thông tin thiết bị</h1>
          </div>
          <div className="time">
            <span className="productInfoKey">Dữ liệu được cập nhật vào: </span>
            <span className="productInfoValue">{infoTop[0].time}</span>
          </div>
          <div className="productTop">
            <div className="productTopRight">
              <div className="productInfoBottom">
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Location System</span>
                  <span className="productInfoValue">
                    {infoTop[0].locationSystem}
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Mã thiết bị</span>
                  <span className="productInfoValue">{productId}</span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Central Address</span>
                  <span className="productInfoValue">
                    {infoTop[0].centralAddress}
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Node Address</span>
                  <span className="productInfoValue">
                    {infoTop[0].nodeAddress}
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Phone number</span>
                  <span className="productInfoValue">{infoTop[0].phone}</span>
                </div>
              </div>
            </div>
            <div className="productTopRight">
              <div className="productInfoBottom">
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Điện áp pin</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienApPin} (V)
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Nhiệt độ thiết bị</span>
                  <span className="productInfoValue">
                    {infoTop[0].temperature} độ C
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Điện áp nguồn</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienApNguon} (V)
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Signal quality</span>
                  <span className="productInfoValue">
                    {infoTop[0].signalQuality}
                  </span>
                </div>
              </div>
            </div>
            <div className="productTopRight">
              <div className="productInfoBottom">
                <div className="productInfoItemColumn">
                  <span className="columnTestPostLeft">Mở</span>
                  <span className="columnTestPostRight">Đóng</span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Điện áp âm 1</span>
                  <span className="productInfoValueElec">
                    {infoTop[0].openPoint1} (V)
                  </span>
                  <span className="productInfoValueElec">
                    {infoTop[0].closePoint1} (V)
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Điện áp âm 2</span>
                  <span className="productInfoValueElec">
                    {infoTop[0].openPoint2} (V)
                  </span>
                  <span className="productInfoValueElec">
                    {infoTop[0].closePoint2} (V)
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Điện áp âm 3</span>
                  <span className="productInfoValueElec">
                    {infoTop[0].openPoint3} (V)
                  </span>
                  <span className="productInfoValueElec">
                    {infoTop[0].closePoint3} (V)
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Điện áp âm 4</span>
                  <span className="productInfoValueElec">
                    {infoTop[0].openPoint4} (V)
                  </span>
                  <span className="productInfoValueElec">
                    {infoTop[0].closePoint4} (V)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="tableGrid">
            <DataGrid
              rows={infoBottom}
              autoHeight
              disableSelectionOnClick
              columns={columns}
              loading={loading}
              pageSize={8}
              checkboxSelection
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
          <MapDevice
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div
                style={{
                  height: `90vh`,
                  margin: `auto`,
                  border: "2px solid black",
                }}
              />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    </div>
  );
}
