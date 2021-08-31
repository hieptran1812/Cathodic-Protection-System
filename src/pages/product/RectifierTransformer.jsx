import "./product.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { useParams } from "react-router-dom";
import axios from "axios";
import { React, useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

const API = process.env.REACT_APP_API;

const columns = [
  { field: "id", hide: true },
  {
    field: "time",
    headerName: "Thời gian",
    width: 230,
  },
  {
    field: "dienApPin",
    headerName: "Điện áp pin (V)",
    width: 180,
  },
  {
    field: "dienApNguon",
    headerName: "Điện áp nguồn (V)",
    width: 190,
  },
  {
    field: "temperature",
    headerName: "Nhiệt độ thiết bị (độ C)",
    width: 220,
  },
  {
    field: "dienAC3PhaA",
    headerName: "Điện AC pha A (V)",
    width: 200,
  },
  {
    field: "dienAC3PhaB",
    headerName: "Điện AC pha B (V)",
    width: 200,
  },
  {
    field: "dienAC3PhaC",
    headerName: "Điện AC pha C (V)",
    width: 200,
  },
  {
    field: "dienDCPoint1",
    headerName: "Điện DC Point 1 (V)",
    width: 200,
  },
  {
    field: "dongDienDC",
    headerName: "Dòng điện DC (A)",
    width: 200,
  },
  {
    field: "signalQuality",
    headerName: "Chất lượng tín hiệu",
    width: 200,
  },
];

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function RectifierTransformer() {
  const classes = useStyles();
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [infoTop, setInfoTop] = useState([{}]);
  const [infoBottom, setInfoBottom] = useState([]);
  const [open, setOpen] = useState(false);

  let history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function deleteDevice() {
    axios
      .get(`${API}/api/rectifierTransformer/delete/${productId}`)
      .then((res) => {
        console.log(res.data);
        history.replace("/rectifierTransformerList");
        return 0;
      })
      .catch((error) => console.log(error));
    return 0;
  }
  useEffect(() => {
    async function fetchAPI() {
      await axios
        .get(`${API}/api/rectifierTransformer/table/${productId}`)
        .then((res) => {
          setLoading(false);
          const data = res.data;
          setInfoTop(data);
          setInfoBottom(data);
        })
        .catch((error) => console.log(error));
    }
    setInterval(fetchAPI, 2000);
  }, [productId]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport
          csvOptions={{
            fields: [
              "time",
              "dienApPin",
              "dienApNguon",
              "temperature",
              "dienAC3PhaA",
              "dienAC3PhaB",
              "dienAC3PhaC",
              "dienDCPoint1",
              "dongDienDC",
              "signalQuality",
            ],
            utf8WithBom: true,
          }}
        />
      </GridToolbarContainer>
    );
  }

  return (
    <div className="product">
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%", margin: "20px 40px 20px" }}>
          <div className="productTitleContainer">
            <h1 className="productTitle">Thông tin Bộ trung tâm</h1>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={handleClickOpen}
            >
              Xóa thiết bị
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Bạn chắc chắn muốn xóa?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Xóa thiết bị sẽ xóa tất cả dữ liệu của thiết bị đó.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Không đồng ý
                </Button>
                <Button onClick={() => deleteDevice()} color="primary" autoFocus>
                  Đồng ý
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="time">
            <span className="productInfoKey">Dữ liệu được cập nhật vào: </span>
            <span className="productInfoValue">{infoTop[0].time}</span>
          </div>
          <div className="productTop">
            <div className="productTopRight">
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">Location System</span>
                  <span className="productInfoValue">
                    {infoTop[0].locationSystem}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Mã thiết bị</span>
                  <span className="productInfoValue">{productId}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Central Address</span>
                  <span className="productInfoValue">
                    {infoTop[0].centralAddress}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Phone number</span>
                  <span className="productInfoValue">{infoTop[0].phone}</span>
                </div>
              </div>
            </div>
            <div className="productTopRight">
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">Điện áp nguồn</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienApNguon} (V)
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Điện AC pha A</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienAC3PhaA} (V)
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Điện AC pha B</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienAC3PhaB} (V)
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Điện AC pha C</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienAC3PhaC} (V)
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Điện áp pin</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienApPin} (V)
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Nhiệt độ thiết bị</span>
                  <span className="productInfoValue">
                    {infoTop[0].temperature} độ C
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Điện DC point 1</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienDCPoint1} (V)
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Dòng điện DC</span>
                  <span className="productInfoValue">
                    {infoTop[0].dongDienDC} (A)
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Signal quality</span>
                  <span className="productInfoValue">
                    {infoTop[0].signalQuality}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DataGrid
            rows={infoBottom}
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
