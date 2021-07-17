import { Link } from "react-router-dom";
import "./product.css";
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";

export default function Product() {
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Thông tin thiết bị</h1>
      </div>
      <div className="productTop">
          <div className="productTopRight">
              <div className="productInfoTop">
                  <span className="productName">Thiết bị 1</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Trạng thái</span>
                      <span className="productInfoValue">Hoạt động</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Tên thiết bị</label>
                  <input type="text" placeholder="Thiết bị 1" />
                  <label>In Stock</label>
                  <select name="Hoạt động" id="idStock">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
              </div>
          </form>
      </div>
    </div>
  );
}
