import Map from "../../components/googleMap/mapDevice";
import "./mapDevice.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { React, useEffect, useState } from "react";

const key = "AIzaSyB_-Yji-hFBCnR4YC964AwLLWjnDcUSVdY";

export default function MapDeviceDashboard() {

  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [infoTop, setInfoTop] = useState([{}]);
  const [infoBottom, setInfoBottom] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      await axios
        .get(`${API}/api/rectifierTransformer/table/${productId}`)
        .then((res) => {
          setLoading(false);
          const data = res.data;
          setInfoTop(data);
          setInfoBottom(data);
        })
        .catch((error) => console.log(error));
    }
    fetchAPI();
  }, [productId]);

  return (
    <div className="general">
      <Topbar />
      <div style={{ display: "flex", width: "100%" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <div className="title">
            <h1 className="productTitle">Bản đồ thiết bị</h1>
          </div>
          <Autocomplete
            className="search"
            id="search-combo-box"
            getOptionLabel={(option) => option.title}
            style={{ width: 300, margin: "20px 40px 20px" }}
            renderInput={(params) => (
              <TextField {...params} label="Loại thiết bị" variant="outlined" />
            )}
          />
          <Autocomplete
            className="search"
            id="search-combo-box"
            getOptionLabel={(option) => option.title}
            style={{ width: 300, margin: "20px 40px 20px", display: "flex" }}
            renderInput={(params) => (
              <TextField {...params} label="Mã thiết bị" variant="outlined" />
            )}
          />

          {/* <MapDevice
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
          /> */}
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div
                style={{
                  height: `90vh`,
                  margin: `40px`,
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
