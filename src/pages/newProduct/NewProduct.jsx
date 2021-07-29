import "./newProduct.css";

export default function NewProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm thiết bị mới</h1>
      <form className="addProductForm" method="POST">
        <div className="addProductItem">
          <label>Mã thiết bị</label>
          <input type="text" required="required" autofocus/>
        </div>
        <div className="addProductItem">
          <label>Loại thiết bị</label>
          <select className="addProductItem" id="type">
            <option name="type" value="0">Bộ trung tâm</option>
            <option name="type" value="1">Bộ đo</option>
          </select>
        </div>
        <button className="addProductButton">Thêm mới</button>
      </form>
    </div>
  );
}
