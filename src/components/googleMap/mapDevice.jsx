import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
import axios from "axios";
import { Link } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const API = process.env.REACT_APP_API;

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 20.98078647683709,
    longitude: 105.78990983199284,
    width: "76vw",
    height: "80vh",
    zoom: 15,
  });

  function updateLatLng(lat, lng){
    setViewport({
      latitude: Number(lat),
      longitude: Number(lng),
      zoom: 14,
      width: "76vw",
      height: "80vh",
      transitionDuration: 4000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const columns = [
    {
      field: "address",
      headerName: "Vị trí",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <button
              className="findAddress"
              onClick={() => updateLatLng(params.row.lat, params.row.lng)}
            >
              Tìm vị trí
            </button>
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
    {
      field: "devSerial",
      headerName: "Mã thiết bị",
      width: 220,
      renderCell: (params) => {
        return <div className="productListItem">{params.row.devSerial}</div>;
      },
    },
    {
      field: "lat",
      headerName: "Vĩ độ",
      width: 200,
    },
    {
      field: "lng",
      headerName: "Kinh độ",
      width: 200,
    },
  ];
  const [loading, setLoading] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/dashboardMap`)
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
              "lat",
              "lng",
            ],
            utf8WithBom: true,
          }}
        />
      </GridToolbarContainer>
    );
  }

  

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [locate, setLocate] = useState([]);
  useEffect(() => {
    async function fetchAPI() {
      await axios
        .get(`${API}/api/locationAllDevices`)
        .then((res) => {
          const data = res.data;
          // console.log(data);
          setLocate(data);
        })
        .catch((error) => console.log(error));
    }
    fetchAPI();
  }, []);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedDevice(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="map">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/halley1812/ckszt26zdaaqb18ljqjyi166h"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {locate.map((device) => (
          <Marker latitude={device.lat} longitude={device.lng}>
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedDevice(device);
              }}
            >
              <div>{device.devType}</div>
              <div>{device.maChuoi}</div>
              <img
                width="30"
                height="30"
                src="https://cdn-icons-png.flaticon.com/512/900/900618.png"
                alt={device.devType}
              />
            </button>
          </Marker>
        ))}

        {selectedDevice ? (
          <Popup
            latitude={selectedDevice.lat}
            longitude={selectedDevice.lng}
            onClose={() => {
              setSelectedDevice(null);
            }}
          >
            <div>
              <h4>{selectedDevice.devType}</h4>
              <p>Mã thiết bị: {selectedDevice.devSerial}</p>
              <p>Tên thiết bị: {selectedDevice.maChuoi}</p>
              <p>Tổ chức: {selectedDevice.organization}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
      <DataGrid
        className="table"
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
  );
}

// export default Map(lat, lng);
