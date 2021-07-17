import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRectifiersRow } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function RectifierTransformerList() {
  const [data, setData] = useState(productRectifiersRow);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      field: "product",
      headerName: "Mã thiết bị",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.name}
          </div>
        );
      },
    },
    { field: "localSystem", headerName: "Hệ thống cục bộ", width: 200 },
    {
      field: "localAddress",
      headerName: "Địa chỉ cục bộ",
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
            <Link to={"/rectifierTransformer/" + params.row.id}>
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
