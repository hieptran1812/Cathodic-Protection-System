import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import axios from "axios";

const API = process.env.REACT_APP_API;

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 20.98041582814874,
    longitude: 105.78735636908121,
    width: "80vw",
    height: "80vh",
    zoom: 15,
  });
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [locate, setLocate] = useState([]);
  useEffect(() => {
    async function fetchAPI() {
      await axios
        .get(`${API}/api/locationAllDevices`)
        .then((res) => {
          const data = res.data;
          console.log(data);
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
          <Marker
            latitude={device.lat}
            longitude={device.lng}
          >
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                setSelectedDevice(device);
              }}
            >
              <img
                width="20"
                height="20"
                src="https://cdn-icons-png.flaticon.com/512/2922/2922456.png"
                alt="Bo trung tam icon"
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
              <p>Tổ chức: {selectedDevice.organization}</p>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}
