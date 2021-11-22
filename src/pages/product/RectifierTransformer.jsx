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
import Alert from "@material-ui/lab/Alert";

const API = process.env.REACT_APP_API;

const columns = [
  { field: "id", hide: true },
  {
    field: "time",
    headerName: "Date",
    width: 230,
  },
  {
    field: "dienAC3PhaA",
    headerName: "AC power phase A (V)",
    width: 210,
  },
  {
    field: "dienAC3PhaB",
    headerName: "AC power phase B (V)",
    width: 210,
  },
  {
    field: "dienAC3PhaC",
    headerName: "AC power phase C (V)",
    width: 210,
  },
  {
    field: "dienDCPoint1",
    headerName: "Power DC Point(V)",
    width: 210,
  },
  {
    field: "dongDienDC",
    headerName: "DC current (A)",
    width: 180,
  },
  {
    field: "signalQuality",
    headerName: "Signal quality",
    width: 170,
  },
  {
    field: "dienApPin",
    headerName: "Battery voltage (V)",
    width: 200,
  },
  {
    field: "dienApNguon",
    headerName: "Power supply voltage (V)",
    width: 240,
  },
  {
    field: "temperature",
    headerName: "Temperature (°C)",
    width: 180,
  },
];

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function ConditionTemperature(props) {
  if (props.value > 50) {
    return (
      <Alert variant="filled" severity="error">
        {props.value} °C Nhiệt độ cao, hãy kiểm tra lại!
      </Alert>
    );
  } else if (props.value === 0) {
    return (
      <Alert variant="filled" severity="error">
        {props.value} °C, hãy kiểm tra lại!
      </Alert>
    );
  } else {
    return (
      <Alert variant="filled" severity="info">
        {props.value} °C
      </Alert>
    );
  }
}

function ConditionACInputPhaA(props) {
  if (props.value > 380) {
    return (
      <Alert variant="filled" severity="warning">
        {props.value} (V)
      </Alert>
    );
  } else if (props.value < 220) {
    return (
      <Alert variant="filled" severity="error">
        {props.value} (V)
      </Alert>
    );
  } else{
    return (
      <Alert variant="filled" severity="info">
        {props.value} (V)
      </Alert>
    );
  }
}

function ConditionDCOutput(props) {
  if (props.value > 50) {
    return (
      <Alert variant="filled" severity="warning">
        {props.value} (V)
      </Alert>
    );
  } else if (props.value < 10) {
    return (
      <Alert variant="filled" severity="error">
        {props.value} (V)
      </Alert>
    );
  } else{
    return (
      <Alert variant="filled" severity="info">
        {props.value} (V)
      </Alert>
    );
  }
}

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
        // console.log(res.data);
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
          // console.log(data);
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
              "dienAC3PhaA",
              "dienAC3PhaB",
              "dienAC3PhaC",
              "dienDCPoint1",
              "dongDienDC",
              "signalQuality",
              "dienApPin",
              "dienApNguon",
              "temperature",
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
          <div className="connect">
            <span className="productInfoKey">Kết nối với các bộ đo: </span>
            <span className="productInfoValue">
              {infoTop[0].testPostResultList}
            </span>
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
                  <span className="productInfoKey">Device code</span>
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
                  <span className="productInfoKey">Power supply voltage</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienApNguon} (V)
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">AC power phase A</span>
                  <span className="productInfoValue">
                    <ConditionACInputPhaA value={infoTop[0].dienAC3PhaA} />
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">AC power phase B</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienAC3PhaB} (V)
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">AC power phase C</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienAC3PhaC} (V)
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Battery voltage</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienApPin} (V)
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Temperature</span>
                  <span className="productInfoValue">
                    <ConditionTemperature value={infoTop[0].temperature} />
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Power DC point</span>
                  <span className="productInfoValue">
                    <ConditionDCOutput value={infoTop[0].dienDCPoint1} />
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">DC current</span>
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
