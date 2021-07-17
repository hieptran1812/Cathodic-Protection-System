import "./newProduct.css";

export default function NewProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm thiết bị mới</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Mã thiết bị</label>
          <input type="text" />
        </div>
        <div className="addProductItem">
          <label>Hệ thống cục bộ</label>
          <input type="text" placeholder="123" />
        </div>
        <button className="addProductButton">Thêm mới</button>
      </form>
    </div>
  );
}
