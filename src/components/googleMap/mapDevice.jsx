import { React, useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import axios from "axios";
// import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

const API = process.env.REACT_APP_API;
const Map = () => {
  // const [loading, setLoading] = useState(true);
  const [openInfoWindow, setOpenInfoWindow] = useState(false);
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

  // displayMarkers = () => {
  //   return this.state.stores.map((store, index) => {
  //     return <Marker key={index} id={index} position={{
  //      lat: store.latitude,
  //      lng: store.longitude
  //    }}
  //    onClick={() => console.log("You clicked me!")} />
  //   })
  // }
  const onMarkerClick = (evt) => {
    console.log("clicked marker");
    // return (
    //   <InfoWindow>
    //     <div>
    //       <div>nhà trọ cho thuê</div>
    //       <div>1.500.000đ</div>
    //     </div>
    //   </InfoWindow>
    // );
  };

  // const onToggleOpen = (evt) => {
  //   console.log("clicked marker");
  //   // return (
  //   //   <InfoWindow>
  //   //     <div>
  //   //       <div>nhà trọ cho thuê</div>
  //   //       <div>1.500.000đ</div>
  //   //     </div>
  //   //   </InfoWindow>
  //   // );
  // };

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
            onClick={onMarkerClick}
          />
            /* <InfoWindow onCloseClick={onToggleOpen}>
              <div>
                <div>nhà trọ cho thuê</div>
                <div>1.500.000đ</div>
              </div>
            </InfoWindow> */
          // </Marker>
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
