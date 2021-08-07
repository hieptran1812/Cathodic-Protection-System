import "./product.css";
import MapDevice from "../../components/googleMap/mapDevice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { React, useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

const API = process.env.REACT_APP_API;
const key = "AIzaSyB_-Yji-hFBCnR4YC964AwLLWjnDcUSVdY";
export default function RectifierTransformer() {
  const [info, setInfo] = useState("");
  const { productId } = useParams();

  useEffect(() => {
    async function fetchAPI() {
      await axios
        .get(`${API}/api/rectifierTransformer/${productId}`)
        .then((res) => {
          const data = res.data;
          setInfo(data);
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
    setInterval(fetchAPI, 1500);
  }, [productId]);

  return (
    <div className="product">
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%", margin: '20px 40px 20px' }}>
          <div className="productTitleContainer">
            <h1 className="productTitle">Thông tin thiết bị</h1>
          </div>
          <div className="time">
            <span className="productInfoKey">Dữ liệu được cập nhật vào: </span>
            <span className="productInfoValue">{info.time}</span>
          </div>
          <div className="productTop">
            <div className="productTopRight">
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">Mã thiết bị</span>
                  <span className="productInfoValue">{info.devSerial}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Location System</span>
                  <span className="productInfoValue">
                    {info.locationSystem}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Điện áp pin</span>
                  <span className="productInfoValue">{info.dienApPin}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Nhiệt độ thiết bị</span>
                  <span className="productInfoValue">{info.temperature}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Điện DC point 1</span>
                  <span className="productInfoValue">{info.dienDCPoint1}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Phone number</span>
                  <span className="productInfoValue">{info.phone}</span>
                </div>
              </div>
            </div>
            <div className="productTopRight">
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">Central Address</span>
                  <span className="productInfoValue">
                    {info.centralAddress}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Điện áp nguồn</span>
                  <span className="productInfoValue">{info.dienApNguon}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Điện AC 3 pha</span>
                  <span className="productInfoValue">{info.dienAC3Pha}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Dòng điện DC</span>
                  <span className="productInfoValue">{info.dongDienDC}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Signal quality</span>
                  <span className="productInfoValue">{info.signalQuality}</span>
                </div>
              </div>
            </div>
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
