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
    field: "openPoint1",
    headerName: "Điện áp âm 1 mở (V)",
    width: 200,
  },
  {
    field: "closePoint1",
    headerName: "Điện áp âm 1 đóng (V)",
    width: 220,
  },
  {
    field: "openPoint2",
    headerName: "Điện áp âm 2 mở (V)",
    width: 200,
  },
  {
    field: "closePoint2",
    headerName: "Điện áp âm 2 đóng (V)",
    width: 220,
  },
  {
    field: "openPoint3",
    headerName: "Điện áp âm 3 mở (V)",
    width: 200,
  },
  {
    field: "closePoint3",
    headerName: "Điện áp âm 3 đóng (V)",
    width: 220,
  },
  {
    field: "openPoint4",
    headerName: "Điện áp âm 4 mở (V)",
    width: 200,
  },
  {
    field: "closePoint4",
    headerName: "Điện áp âm 4 đóng (V)",
    width: 220,
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
export default function TestPost() {
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
      .get(`${API}/api/testPost/delete/${productId}`)
      .then((res) => {
        // console.log(res.data);
        history.replace("/testPostList");
        return 0;
      })
      .catch((error) => console.log(error));
    return 0;
  }
  useEffect(() => {
    async function fetchAPI() {
      await axios
        .get(`${API}/api/testPost/table/${productId}`)
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
              "openPoint1",
              "closePoint1",
              "openPoint2",
              "closePoint2",
              "openPoint3",
              "closePoint3",
              "openPoint4",
              "closePoint4",
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
            <h1 className="productTitle">Thông tin Bộ đo</h1>
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
                <Button
                  onClick={() => deleteDevice()}
                  color="primary"
                  autoFocus
                >
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
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Location System</span>
                  <span className="productInfoValue">
                    {infoTop[0].locationSystem}
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Mã thiết bị</span>
                  <span className="productInfoValue">{productId}</span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Central Address</span>
                  <span className="productInfoValue">
                    {infoTop[0].centralAddress}
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Node Address</span>
                  <span className="productInfoValue">
                    {infoTop[0].nodeAddress}
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Phone number</span>
                  <span className="productInfoValue">{infoTop[0].phone}</span>
                </div>
              </div>
            </div>
            <div className="productTopRight">
              <div className="productInfoBottom">
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Điện áp pin</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienApPin} (V)
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Nhiệt độ thiết bị</span>
                  <span className="productInfoValue">
                    {infoTop[0].temperature} độ C
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Điện áp nguồn</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienApNguon} (V)
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Signal quality</span>
                  <span className="productInfoValue">
                    {infoTop[0].signalQuality}
                  </span>
                </div>
              </div>
            </div>
            <div className="productTopRight">
              <div className="productInfoBottom">
                <div className="productInfoItemColumn">
                  <span className="columnTestPostLeft">Mở</span>
                  <span className="columnTestPostRight">Đóng</span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Điện áp âm 1</span>
                  <span className="productInfoValueElec">
                    {infoTop[0].openPoint1} (V)
                  </span>
                  <span className="productInfoValueElec">
                    {infoTop[0].closePoint1} (V)
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Điện áp âm 2</span>
                  <span className="productInfoValueElec">
                    {infoTop[0].openPoint2} (V)
                  </span>
                  <span className="productInfoValueElec">
                    {infoTop[0].closePoint2} (V)
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Điện áp âm 3</span>
                  <span className="productInfoValueElec">
                    {infoTop[0].openPoint3} (V)
                  </span>
                  <span className="productInfoValueElec">
                    {infoTop[0].closePoint3} (V)
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Điện áp âm 4</span>
                  <span className="productInfoValueElec">
                    {infoTop[0].openPoint4} (V)
                  </span>
                  <span className="productInfoValueElec">
                    {infoTop[0].closePoint4} (V)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="tableGrid">
            <DataGrid
              rows={infoBottom}
              autoHeight
              disableSelectionOnClick
              columns={columns}
              loading={loading}
              pageSize={8}
              checkboxSelection
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
