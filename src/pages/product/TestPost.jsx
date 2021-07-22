import { Link } from "react-router-dom";
import "./product.css";
import {productData} from "../../dummyData"
import MapDevice from "../../components/googleMap/mapDevice";

const key = 'AIzaSyB_-Yji-hFBCnR4YC964AwLLWjnDcUSVdY'
export default function TestPost() {
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
                      <span className="productInfoValue">123</span>
                    
                  </div>
                  <div className="productInfoItemTest">
                      <span className="productInfoKey">Điện áp pin</span>
                      <span className="productInfoValue">test2</span>
                     
                  </div>
                  <div className="productInfoItemTest">
                      <span className="productInfoKey">Nhiệt độ thiết bị</span>
                      <span className="productInfoValue">tốt</span>
                      
                  </div>
                  <div className="productInfoItemTest">
                      <span className="productInfoKey">Nhiệt độ thiết bị</span>
                      <span className="productInfoValue">0987938321</span>
                      
                  </div>
                  <div className="productInfoItemTest">
                      <span className="productInfoKey">Phone number</span>
                      <span className="productInfoValue">0987938321</span>
                   
                  </div>
              </div>
          </div>
          <div className="productTopRight">
            <div className="productInfoBottom">
                  <div className="productInfoItemTest">
                      <span className="productInfoKey">Central Address</span>
                      <span className="productInfoValue">test central</span>
                  </div>
                  <div className="productInfoItemTest">
                      <span className="productInfoKey">Node Address</span>
                      <span className="productInfoValue">test2</span>
                  </div>
                  <div className="productInfoItemTest">
                      <span className="productInfoKey">Điện AC 3 pha</span>
                      <span className="productInfoValue">tốt</span>
                  </div>
                  <div className="productInfoItemTest">
                      <span className="productInfoKey">Điện áp nguồn</span>
                      <span className="productInfoValue">0987938321</span>
                  </div>
                  <div className="productInfoItemTest">
                      <span className="productInfoKey">Signal quality</span>
                      <span className="productInfoValue">0987938321</span>
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
                      <span className="productInfoValueElec">1</span>
                      <span className="productInfoValueElec">1</span>
                  </div>
                  <div className="productInfoItemTest">
                      <span className="productInfoKey">Điện áp âm 2</span>
                      <span className="productInfoValueElec">2</span>
                      <span className="productInfoValueElec">1</span>
                  </div>
                  <div className="productInfoItemTest">
                      <span className="productInfoKey">Điện áp âm 3</span>
                      <span className="productInfoValueElec">3</span>
                      <span className="productInfoValueElec">1</span>
                  </div>
                  <div className="productInfoItemTest">
                      <span className="productInfoKey">Điện áp âm 4</span>
                      <span className="productInfoValueElec">4</span>
                      <span className="productInfoValueElec">115</span>
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
