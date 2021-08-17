import { React, useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";
import axios from "axios";
// import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

// const options = { closeBoxURL: "", enableEventPropagation: true };
const API = process.env.REACT_APP_API;
const Map = () => {
  // const [loading, setLoading] = useState(true);
  // const [infoTop, setInfoTop] = useState([{}]);
  const [location, setLocation] = useState([{}]);
  useEffect(() => {
    axios
      .get(`${API}/api/locationAllDevices`)
      .then((res) => {
        const infoLocation = res.data;
        console.log(infoLocation);
        setLocation(infoLocation);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 20.980592, lng: 105.786841 }}
      ></GoogleMap>
      {location.map((value, index) => {
        return (
          <Marker
            icon={{
              url: "https://image.flaticon.com/icons/png/512/2794/2794289.png",
              scaledSize: new window.google.maps.Size(20, 20),
            }}
            position={{
              lat: value["lat"],
              lng: value["lng"],
            }}
          />
        );
      })}
      {/* <InfoBox options={options}>
          <>
            <div
              style={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "1em",
                padding: "0.2em",
              }}
            >
              someone's house
            </div>
          </>
        </InfoBox> */}
      {/* </Marker> */}
    </div>
  );
};

export default withScriptjs(withGoogleMap(Map));
