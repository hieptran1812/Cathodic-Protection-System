// import React from 'react';

// const MapDevice = () => {
//   return (
//     <div className="map">
//       <iframe
//         width="100%"
//         height="600"
//         title="map"
//         loading="lazy"
//         allowFullScreen
//         src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJca2h2M2sNTERh4FkNmCx-aI&key=AIzaSyB_-Yji-hFBCnR4YC964AwLLWjnDcUSVdY"
//       />
//     </div>
//   );
// };

// export default MapDevice;
import React from "react";
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps";

const Map = () => {
  return (
    <div>
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 20.980592, lng: 105.786841 }}
      ></GoogleMap>
    </div>
  );
};

export default withScriptjs(withGoogleMap(Map));