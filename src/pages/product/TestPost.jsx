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
    field: "openPoint1",
    headerName: "Potential Open Port 1 (mV)",
    width: 250,
  },
  {
    field: "closePoint1",
    headerName: "Potential Closed Port 1 (mV)",
    width: 250,
  },
  {
    field: "openPoint2",
    headerName: "Potential Open Port 2 (mV)",
    width: 250,
  },
  {
    field: "closePoint2",
    headerName: "Potential Closed Port 2 (mV)",
    width: 250,
  },
  {
    field: "openPoint3",
    headerName: "Potential Open Port 3 (mV)",
    width: 250,
  },
  {
    field: "closePoint3",
    headerName: "Potential Closed Port 3 (mV)",
    width: 250,
  },
  {
    field: "openPoint4",
    headerName: "Potential Open Port 4 (mV)",
    width: 250,
  },
  {
    field: "closePoint4",
    headerName: "Potential Closed Port 4 (mV)",
    width: 250,
  },
  {
    field: "signalQuality",
    headerName: "Signal quality",
    width: 165,
  },
  {
    field: "dienApPin",
    headerName: "Battery voltage (V)",
    width: 200,
  },
  {
    field: "dienApNguon",
    headerName: "Power supply voltage (V)",
    width: 230,
  },
  {
    field: "temperature",
    headerName: "Temperature (°C)",
    width: 180,
  },
];

function ConditionTemperature(props) {
  if (props.value > 50) {
    return (
      <Alert variant="filled" severity="error">
        {props.value} °C
      </Alert>
    );
  } else if (props.value === 0) {
    return (
      <Alert variant="filled" severity="error">
        {props.value} °C
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

function ConditionPort1(props) {
  if (props.value <-1.2) {
    return (
      <Alert variant="filled" severity="warning">
        {props.value} (V)
      </Alert>
    );
  } else if (props.value > -0.85) {
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
          console.log(data);
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
              "openPoint1",
              "closePoint1",
              "openPoint2",
              "closePoint2",
              "openPoint3",
              "closePoint3",
              "openPoint4",
              "closePoint4",
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
          <div className="time">
            <span className="productInfoKey">Kết nối với bộ trung tâm: </span>
            <span className="productInfoValue">
              {infoTop[0].idStringCentralDevice}
            </span>
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
                  <span className="productInfoKey">Device code</span>
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
                  <span className="productInfoKey">Battery voltage</span>
                  <span className="productInfoValue">
                    {infoTop[0].dienApPin} (V)
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Temperature</span>
                  <span className="productInfoValue">
                    <ConditionTemperature value={infoTop[0].temperature} />
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Power supply voltage</span>
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
                  <span className="columnTestPostLeft">Open</span>
                  <span className="columnTestPostRight">Close</span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Potential 1</span>
                  <span className="productInfoValueElec">
                    <ConditionPort1 value={infoTop[0].openPoint1} />
                  </span>
                  <span className="productInfoValueElec">
                    <ConditionPort1 value={infoTop[0].closePoint1} />
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Potential 2</span>
                  <span className="productInfoValueElec">
                    {infoTop[0].openPoint2} (V)
                  </span>
                  <span className="productInfoValueElec">
                    {infoTop[0].closePoint2} (V)
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Potential 3</span>
                  <span className="productInfoValueElec">
                    {infoTop[0].openPoint3} (V)
                  </span>
                  <span className="productInfoValueElec">
                    {infoTop[0].closePoint3} (V)
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Potential 4</span>
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
