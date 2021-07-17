import React from 'react';

const MapDevice = () => {
  return (
    <div className="map">
      <iframe
        width="100%"
        height="450"
        title="map"
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJca2h2M2sNTERh4FkNmCx-aI&key=AIzaSyB_-Yji-hFBCnR4YC964AwLLWjnDcUSVdY"
      />
    </div>
  );
};

export default MapDevice;
