import "./newProduct.css";
import axios from 'axios';
import {React, useState} from 'react';

const API = process.env.REACT_APP_API;

export default function NewProduct() {

  const [inputData, setInputData] = useState('');
  const info = {}

  async function postAPI() {
    await axios.post(`${API}/api/newProduct`, {info})
    .then(res => {
      console.log(info)
      console.log(res.data)
    })
    .catch(error => console.log(error));
  }

  const handleSubmit = (e) => {
    // alert('An essay was submitted: ' + this.state.value);
    e.preventDefault();
    console.log(e.target.value);
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Thêm thiết bị mới</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Mã thiết bị</label>
          <input type="text" required="required" value={inputData.value} onChange={e => setInputData(e.target.value)} autoFocus/>
        </div>
        <div className="addProductItem">
          <label>Loại thiết bị</label>
          <select className="addProductItem" id="type" value={inputData.value} onChange={e => setInputData(e.target.value)}>
            <option name="type" value="0">Bộ trung tâm</option>
            <option name="type" value="1">Bộ đo</option>
          </select>
        </div>
        <button className="addProductButton">Thêm mới</button>
      </form>
    </div>
  );
}
