import Map from "../../components/googleMap/mapDevice";
import "./mapDevice.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function MapDeviceDashboard() {

  return (
    <div className="general">
      <Topbar />
      <div style={{ display: "flex", width: "100%" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <div className="title">
            <h1 className="productTitle">Bản đồ thiết bị</h1>
          </div>
          {/* <Autocomplete
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
          /> */}
          <Map/>
        </div>
      </div>
    </div>
  );
}
