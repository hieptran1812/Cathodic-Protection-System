import { Link } from "react-router-dom";
import "./product.css";
import {productData} from "../../dummyData"
import MapDevice from "../../components/googleMap/mapDevice";

const key = 'AIzaSyB_-Yji-hFBCnR4YC964AwLLWjnDcUSVdY'
export default function RectifierTransformer() {
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Thông tin thiết bị</h1>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">Hệ thống cục bộ</span>
                      <span className="productInfoValue">123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Địa chỉ cục bộ</span>
                      <span className="productInfoValue">test2</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Chất lượng tín hiệu</span>
                      <span className="productInfoValue">tốt</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Số điện thoại</span>
                      <span className="productInfoValue">0987938321</span>
                  </div>
              </div>
              {/* <form className="productForm">
                <div className="productFormLeft">
                    <label>Đầu vào AC</label>
                    <input type="text" placeholder="Thiết bị 1" />
                    <label>In Stock</label>
                    <select name="Hoạt động" id="idStock">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </form> */}
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
