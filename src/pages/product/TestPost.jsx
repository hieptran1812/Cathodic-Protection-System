import "./product.css";
import MapDevice from "../../components/googleMap/mapDevice";
import axios from 'axios';
import React from 'react';

const API = process.env.REACT_APP_API;
const key = 'AIzaSyB_-Yji-hFBCnR4YC964AwLLWjnDcUSVdY';

export default class TestPost extends React.Component {

  state = {
      info: [],
  }
  
  componentDidMount() {
    axios.get(`${API}/api/testPost/1`)
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
          <div className="productTop">
              <div className="productTopRight">
                <div className="productInfoBottom">
                  <div className="productInfoItemTest">
                          <span className="productInfoKey">Mã thiết bị</span>
                          <span className="productInfoValue">123</span>
                      </div>
                      <div className="productInfoItemTest">
                          <span className="productInfoKey">Location System</span>
                          <span className="productInfoValue">{this.state.info.locationSystem}</span>
                        
                      </div>
                      <div className="productInfoItemTest">
                          <span className="productInfoKey">Điện áp pin</span>
                          <span className="productInfoValue">{this.state.info.dienApPin}</span>
                         
                      </div>
                      <div className="productInfoItemTest">
                          <span className="productInfoKey">Nhiệt độ thiết bị</span>
                          <span className="productInfoValue">{this.state.info.temperature}</span>
                          
                      </div>
                      <div className="productInfoItemTest">
                          <span className="productInfoKey">Phone number</span>
                          <span className="productInfoValue">{this.state.info.phone}</span>
                       
                      </div>
                  </div>
              </div>
              <div className="productTopRight">
                <div className="productInfoBottom">
                      <div className="productInfoItemTest">
                          <span className="productInfoKey">Central Address</span>
                          <span className="productInfoValue">{this.state.info.centralAddress}</span>
                      </div>
                      <div className="productInfoItemTest">
                          <span className="productInfoKey">Node Address</span>
                          <span className="productInfoValue">{this.state.info.nodeAddress}</span>
                      </div>
                      <div className="productInfoItemTest">
                          <span className="productInfoKey">Điện áp nguồn</span>
                          <span className="productInfoValue">{this.state.info.dienApNguon}</span>
                      </div>
                      <div className="productInfoItemTest">
                          <span className="productInfoKey">Signal quality</span>
                          <span className="productInfoValue">{this.state.info.signalQuality}</span>
                      </div>
                  </div>
              </div>
              <div className="productTopRight">
                <div className="productInfoBottom">
                      <div className="productInfoItemColumn">
                          <span className="columnTestPostLeft">Mở</span>
                          <span className="columnTestPostRight">Đóng</span>
                      </div>
                      <div className="productInfoItemTest">
                          <span className="productInfoKey">Điện áp âm 1</span>
                          <span className="productInfoValueElec">{this.state.info.openPoint1}</span>
                          <span className="productInfoValueElec">{this.state.info.closePoint1}</span>
                      </div>
                      <div className="productInfoItemTest">
                          <span className="productInfoKey">Điện áp âm 2</span>
                          <span className="productInfoValueElec">{this.state.info.openPoint2}</span>
                          <span className="productInfoValueElec">{this.state.info.closePoint2}</span>
                      </div>
                      <div className="productInfoItemTest">
                          <span className="productInfoKey">Điện áp âm 3</span>
                          <span className="productInfoValueElec">{this.state.info.openPoint3}</span>
                          <span className="productInfoValueElec">{this.state.info.closePoint3}</span>
                      </div>
                      <div className="productInfoItemTest">
                          <span className="productInfoKey">Điện áp âm 4</span>
                          <span className="productInfoValueElec">{this.state.info.openPoint4}</span>
                          <span className="productInfoValueElec">{this.state.info.closePoint4}</span>
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
