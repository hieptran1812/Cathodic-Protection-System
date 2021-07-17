import { Link } from "react-router-dom";
import "./product.css";
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import Map from "../../components/googleMap/map";

const key = 'AIzaSyB_-Yji-hFBCnR4YC964AwLLWjnDcUSVdY'
export default function Product() {
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Thông tin thiết bị</h1>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">Mã thiết bị</span>
                      <span className="productInfoValue">123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Hệ thống cục bộ</span>
                      <span className="productInfoValue">test2</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Địa chỉ cục bộ</span>
                      <span className="productInfoValue">test3</span>
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
      {/* <iframe
        width="600"
            height="450"
  style="border:0"
  loading="lazy"
  allowfullscreen
  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB_-Yji-hFBCnR4YC964AwLLWjnDcUSVdY
    &q=Space+Needle,Seattle+WA">
    </iframe> */}
      <div className="productBottom">
        <Map 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `90vh`, margin: `auto`, border: '2px solid black' }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
      </div>  
    </div>
  );
}
