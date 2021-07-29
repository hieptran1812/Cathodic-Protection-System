import "./product.css";
import MapDevice from "../../components/googleMap/mapDevice";
import axios from 'axios';
import React from 'react';

const API = process.env.REACT_APP_API;
const key = 'AIzaSyB_-Yji-hFBCnR4YC964AwLLWjnDcUSVdY';
export default class RectifierTransformer extends React.Component {

    state = {
        info: [],
    }
    
    componentDidMount() {
        axios.get(`${API}/api/rectifierTransformer/1`)
          .then(res => {
            console.log(res)
            const info = res.data;
            this.setState({ info });
          })
          .catch(error => console.log(error));
      }
    render(){
        return (
            <div className="product">
              <div className="productTitleContainer">
                <h1 className="productTitle">Thông tin thiết bị</h1>
              </div>
              <div className="time">
                <span className="productInfoKey">Dữ liệu được cập nhật vào: </span>
                <span className="productInfoValue">{this.state.info.time}</span>
              </div>
              <div className="productTop">
                  <div className="productTopRight">
                      <div className="productInfoBottom">
                          <div className="productInfoItem">
                              <span className="productInfoKey">Mã thiết bị</span>
                              <span className="productInfoValue">{this.state.info.devSerial}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">Location System</span>
                              <span className="productInfoValue">{this.state.info.locationSystem}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">Điện áp pin</span>
                              <span className="productInfoValue">{this.state.info.dienApPin}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">Nhiệt độ thiết bị</span>
                              <span className="productInfoValue">{this.state.info.temperature}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">Điện DC point 1</span>
                              <span className="productInfoValue">{this.state.info.dienDCPoint1}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">Phone number</span>
                              <span className="productInfoValue">{this.state.info.phone}</span>
                          </div>
                      </div>
                  </div>
                  <div className="productTopRight">
                      <div className="productInfoBottom">
                          <div className="productInfoItem">
                              <span className="productInfoKey">Central Address</span>
                              <span className="productInfoValue">{this.state.info.centralAddress}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">Điện áp nguồn</span>
                              <span className="productInfoValue">{this.state.info.dienApNguon}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">Điện AC 3 pha</span>
                              <span className="productInfoValue">{this.state.info.dienAC3Pha}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">Dòng điện DC</span>
                              <span className="productInfoValue">{this.state.info.dongDienDC}</span>
                          </div>
                          <div className="productInfoItem">
                              <span className="productInfoKey">Signal quality</span>
                              <span className="productInfoValue">{this.state.info.signalQuality}</span>
                          </div>
                      </div>
                  </div>
              </div>
                <MapDevice 
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
          );
    }
}
