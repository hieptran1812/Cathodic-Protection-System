import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from 'axios';
import React from 'react';

const API = process.env.REACT_APP_API;

const columns = [
  {
    field: "devSerial",
    headerName: "Mã thiết bị",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="productListItem">
          {params.row.devSerial}
        </div>
      );
    },
  },
  { field: "locationSystem", headerName: "Location System", width: 200 },
  {
    field: "centralAddress",
    headerName: "Central Address",
    width: 200,
  },
  {
      field: "signalQuality",
      headerName: "Chất lượng tín hiệu",
      width: 200,
    },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 160,
  },
  {
    field: "action",
    headerName: "Hành động",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/testPost/" + params.row.devSerial}>
            <button className="productListEdit">Thông tin chi tiết</button>
          </Link>
        </>
      );
    },
  },
];

export default class TestPostList extends React.Component {
  // const [data, setData] = useState(productTestRow);

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  state = {
    deviceInfo: [],
  }
  
  componentDidMount() {
    axios.get(`${API}/api/testPostList`)
      .then(res => {
        console.log(res)
        const deviceInfo = res.data;
        this.setState({ deviceInfo });
      })
      .catch(error => console.log(error));
  }

  render(){
    return (
      <div className="productList">
        <Link to="/newproduct">
          <button className="productAddButton">Thêm mới thiết bị</button>
        </Link>
        <DataGrid
          rows={this.state.deviceInfo}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      </div>
    );
  }
}
