import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productTestRow } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function TestPostList() {
  const [data, setData] = useState(productTestRow);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      field: "product",
      headerName: "Mã thiết bị",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.name}
          </div>
        );
      },
    },
    { field: "locationSystem", headerName: "Vị trí hệ thống", width: 180 },
    {
      field: "centralAddress",
      headerName: "Địa chỉ trung tâm",
      width: 180,
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
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Thông tin chi tiết</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <Link to="/newproduct">
        <button className="productAddButton">Thêm mới thiết bị</button>
      </Link>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
