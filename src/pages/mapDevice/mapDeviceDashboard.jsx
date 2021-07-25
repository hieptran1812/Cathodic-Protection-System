import MapDevice from "../../components/googleMap/mapDevice";
import "./mapDevice.css"
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

const key = 'AIzaSyB_-Yji-hFBCnR4YC964AwLLWjnDcUSVdY'
export default function MapDeviceDashboard() {
    return(
        <div className="general">
            <div className="title">
                <h1 className="productTitle">Bản đồ thiết bị</h1>
            </div>
            {/* <Autocomplete
                className="search"
                id="search-combo-box"
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Tìm kiếm" variant="outlined" />}
            /> */}
            <MapDevice 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
        
    );
}