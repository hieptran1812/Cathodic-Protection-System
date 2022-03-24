import "./documentsList.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Link } from "react-router-dom";
import axios from "axios";
import { React, useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Button from "@material-ui/core/Button";

const API = process.env.REACT_APP_API;

export default function DocumentsList() {
  const [loading, setLoading] = useState(true);
  const [documentsInfo, setDocumentsInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/documentsList`)
      .then((res) => {
        setLoading(false);
        console.log(res);
        const data = res.data;
        setDocumentsInfo(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    { field: "title", headerName: "Tên tài liệu", width: 200 },
    {
      field: "dateCreated",
      headerName: "Ngày thêm tài liệu",
      width: 220,
    },
    {
      field: "content",
      headerName: "Nội dung",
      width: 350,
    },
    {
      field: "link",
      headerName: "Link tài liệu",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: params.row.link }}
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="productListEdit">Chi tiết</button>
            </Link>
          </>
        );
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{
            fields: ["title", "dateCreated", "content", "link"],
            utf8WithBom: true,
          }}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <div className="productList">
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>
          {localStorage.getItem("role") !== "viewer" ? (
            <Button
              variant="contained"
              href="/newDocuments"
              style={{ margin: "40px" }}
              color="secondary"
              startIcon={<AddBoxIcon />}
            >
              <b>Thêm mới tài liệu</b>
            </Button>
          ) : null}
          <DataGrid
            rows={documentsInfo}
            components={{
              Toolbar: CustomToolbar,
            }}
            autoHeight
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            loading={loading}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
