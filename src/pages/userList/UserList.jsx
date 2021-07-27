import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import axios from 'axios';
import React from 'react';

const API = process.env.REACT_APP_API;

const columns = [
  {
    field: "name",
    headerName: "Người dùng",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="userListUser">
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "role",
    headerName: "Vai trò",
    width: 120,
  },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 180,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 220,
  },
  {
    field: "action",
    headerName: "Hành động",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/user/" + params.row.id}>
            <button className="userListEdit">Thông tin chi tiết</button>
          </Link>
        </>
      );
    },
  },
];

export default class UserList extends React.Component {
  state = {
    userInfo: [],
  }

  componentDidMount() {
    axios.get(`${API}/api/users`)
      .then(res => {
        console.log(res)
        const userInfo = res.data;
        this.setState({ userInfo });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="userList">
        <Link to="/newuser">
          <button className="productAddButton">Thêm người dùng</button>
        </Link>
        <DataGrid
          rows={this.state.userInfo}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      </div>
    );
  }
}
