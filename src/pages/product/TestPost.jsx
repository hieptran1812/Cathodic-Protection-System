import "./product.css";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import ChartPort from "../../components/charts/chartPort/ChartPort";
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
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
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
    headerName: "Potential On Port 1 (mV)",
    width: 250,
  },
  {
    field: "closePoint1",
    headerName: "Potential Off Port 1 (mV)",
    width: 250,
  },
  {
    field: "openPoint2",
    headerName: "Potential On Port 2 (mV)",
    width: 250,
  },
  {
    field: "closePoint2",
    headerName: "Potential Off Port 2 (mV)",
    width: 250,
  },
  {
    field: "openPoint3",
    headerName: "Potential On Port 3 (mV)",
    width: 250,
  },
  {
    field: "closePoint3",
    headerName: "Potential Off Port 3 (mV)",
    width: 250,
  },
  {
    field: "openPoint4",
    headerName: "Potential On Port 4 (mV)",
    width: 250,
  },
  {
    field: "closePoint4",
    headerName: "Potential Off Port 4 (mV)",
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

function ConditionBatteryPower(props) {
  if (props.value === 0) {
    return (
      <Alert variant="filled" severity="error">
        {props.value} (V)
      </Alert>
    );
  } else {
    return (
      <Alert variant="filled" severity="info">
        {props.value} (V)
      </Alert>
    );
  }
}

function ConditionSignal(props) {
  if (props.value === 0) {
    return (
      <Alert variant="filled" severity="error">
        {props.value}
      </Alert>
    );
  } else {
    return (
      <Alert variant="filled" severity="info">
        {props.value}
      </Alert>
    );
  }
}

function ConditionPort(props) {
  if (
    (props.value <= 1.2 && props.value >= 0.85) ||
    (props.value >= -1.2 && props.value <= -0.85)
  ) {
    return (
      <Alert variant="filled" severity="info">
        {props.value} (mV)
      </Alert>
    );
  } else if (props.value === 0) {
    return (
      <Alert variant="filled" severity="error">
        {props.value} (mV)
      </Alert>
    );
  } else if (props.value > 1.2 || props.value < -1.2) {
    return (
      <Alert variant="filled" severity="error">
        {props.value} (mV)
      </Alert>
    );
  } else {
    return (
      <Alert variant="filled" severity="warning">
        {props.value} (mV)
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
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [organization, setOrganization] = useState("");
  const [area, setArea] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [devSerial, setDevSerial] = useState("");
  const [ACInputPower, setACInputPower] = useState("");
  const [maChuoi, setMaChuoi] = useState("");
  const [date, setDate] = useState("");
  const [dateUpdate, setDateUpdate] = useState("");
  let history = useHistory();

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const updateDevice = (e) => {
    e.preventDefault();
    const data = {
      organization,
      area,
      maChuoi,
      date,
      dateUpdate,
      lat,
      lng,
      devSerial,
      ACInputPower,
    };
    console.log(data);
    axios
      .post(`${API}/api/testPost/update/${productId}`, data)
      .then((res) => {
        // console.log(data)
        history.replace("/testPost/" + data.devSerial);
        window.location.reload();
        return 0;
      })
      .catch((error) => console.log(error));
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
          // console.log(data);
          setInfoTop(data);
          setInfoBottom(data);
        })
        .catch((error) => console.log(error));
    }
    setInterval(fetchAPI, 2000);
  }, [productId]);

  useEffect(() => {
    async function fetchAPIInput() {
      await axios
        .get(`${API}/api/testPost/table/${productId}`)
        .then((res) => {
          const data = res.data;
          setMaChuoi(String(data[0].tenThietBi));
          setDate(data[0].date);
          setDateUpdate(data[0].dateUpdate);
          setOrganization(String(data[0].organization));
          setArea(data[0].area);
          setLat(data[0].lat);
          setLng(data[0].lng);
          setDevSerial(String(data[0].devSerial));
          setACInputPower(data[0].ACInputPower);
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
    fetchAPIInput();
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
            {localStorage.getItem("role") !== "viewer" ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddCircleOutlinedIcon />}
                onClick={handleClickOpenUpdate}
              >
                Cập nhật thiết bị
              </Button>
            ) : null}
            <Dialog
              open={openUpdate}
              onClose={handleCloseUpdate}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Bạn chắc chắn muốn cập nhật thông tin của thiết bị?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleCloseUpdate} color="primary">
                  Không đồng ý
                </Button>
                <Button onClick={updateDevice} color="primary" autoFocus>
                  Đồng ý
                </Button>
              </DialogActions>
            </Dialog>
            <h1 className="productTitle">Thông tin Bộ đo</h1>
            {localStorage.getItem("role") !== "viewer" ? (
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={handleClickOpenDelete}
              >
                Xóa thiết bị
              </Button>
            ) : null}
            <Dialog
              open={openDelete}
              onClose={handleCloseDelete}
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
                <Button onClick={handleCloseDelete} color="primary">
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
          {localStorage.getItem("role") === "superadmin" ? (
            <div>
              <div className="connect">
                <span className="productInfoKey">Tổ chức: </span>
                <input
                  id="organization"
                  type="text"
                  className="inp"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
                <div className="connectRight">
                  <span className="productInfoKey">Ngày thêm thiết bị: </span>
                  <input
                    id="dateUpdate"
                    type="date"
                    className="inp"
                    value={dateUpdate}
                    onChange={(e) => setDateUpdate(e.target.value)}
                  />
                </div>
              </div>

              <div className="connect">
                <span className="productInfoKey">Khu vực/ Phân xưởng: </span>
                <input
                  id="area"
                  type="text"
                  className="inp"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
                <div className="connectRight">
                  <span className="productInfoKey">Ngày bảo trì: </span>
                  <input
                    id="date"
                    type="date"
                    className="inp"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="connect">
                <span className="productInfoKey">Tên thiết bị: </span>
                <input
                  id="maChuoi"
                  type="text"
                  className="inp"
                  value={maChuoi}
                  onChange={(e) => setMaChuoi(e.target.value)}
                />
                <div className="connectRight">
                  <span className="productInfoKey">Vĩ độ: </span>
                  <input
                    id="lat"
                    type="text"
                    className="inp"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                  />
                </div>
              </div>
              <div className="connect">
                <span className="productInfoKey">Mã thiết bị: </span>
                <input
                  id="devSerial"
                  type="text"
                  className="inp"
                  value={devSerial}
                  onChange={(e) => setDevSerial(e.target.value)}
                />
                <div className="connectRight">
                  <span className="productInfoKey">Kinh độ: </span>
                  <input
                    id="lng"
                    type="text"
                    className="inp"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                  />
                </div>
              </div>
              <div className="connect">
                <span className="productInfoKey">AC Input Power (Watt): </span>
                <input
                  id="ACInputPower"
                  type="text"
                  className="inp"
                  value={ACInputPower}
                  onChange={(e) => setACInputPower(e.target.value)}
                />
                <div className="connectRight">
                  <span className="productInfoKey">
                    Kết nối với các bộ đo:{" "}
                  </span>
                  <span className="productInfoValue">{infoTop[0].connect}</span>
                </div>
              </div>
            </div>
          ) : null}

          {localStorage.getItem("role") === "admin" ? (
            <div>
              <div className="connect">
                <span className="productInfoKey">Tổ chức: </span>
                <span className="productInfoValue">{organization}</span>
                <div className="connectRight">
                  <span className="productInfoKey">Ngày thêm thiết bị: </span>
                  <input
                    id="dateUpdate"
                    type="date"
                    className="inp"
                    value={dateUpdate}
                    onChange={(e) => setDateUpdate(e.target.value)}
                  />
                </div>
              </div>

              <div className="connect">
                <span className="productInfoKey">Khu vực/ Phân xưởng: </span>
                <input
                  id="area"
                  type="text"
                  className="inp"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
                <div className="connectRight">
                  <span className="productInfoKey">Ngày bảo trì: </span>
                  <input
                    id="date"
                    type="date"
                    className="inp"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="connect">
                <span className="productInfoKey">Tên thiết bị: </span>
                <input
                  id="maChuoi"
                  type="text"
                  className="inp"
                  value={maChuoi}
                  onChange={(e) => setMaChuoi(e.target.value)}
                />
                <div className="connectRight">
                  <span className="productInfoKey">Vĩ độ: </span>
                  <input
                    id="lat"
                    type="text"
                    className="inp"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                  />
                </div>
              </div>
              <div className="connect">
                <span className="productInfoKey">Mã thiết bị: </span>
                <span className="productInfoValue">{devSerial}</span>
                <div className="connectRight">
                  <span className="productInfoKey">Kinh độ: </span>
                  <input
                    id="lng"
                    type="text"
                    className="inp"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                  />
                </div>
              </div>
              <div className="connect">
                <span className="productInfoKey">AC Input Power (Watt): </span>
                <input
                  id="ACInputPower"
                  type="text"
                  className="inp"
                  value={ACInputPower}
                  onChange={(e) => setACInputPower(e.target.value)}
                />
                <div className="connectRight">
                  <span className="productInfoKey">
                    Kết nối với các bộ đo:{" "}
                  </span>
                  <span className="productInfoValue">{infoTop[0].connect}</span>
                </div>
              </div>
            </div>
          ) : null}

          {localStorage.getItem("role") === "viewer" ? (
            <div>
              <div className="connect">
                <span className="productInfoKey">Tổ chức: </span>
                <span className="productInfoValue">{organization}</span>
                <div className="connectRight">
                  <span className="productInfoKey">Ngày thêm thiết bị: </span>
                  <span className="productInfoValue">{dateUpdate}</span>
                </div>
              </div>
              <div className="connect">
                <span className="productInfoKey">Khu vực/ Phân xưởng: </span>
                <span className="productInfoValue">{area}</span>
                <div className="connectRight">
                  <span className="productInfoKey">Ngày bảo trì: </span>
                  <span className="productInfoValue">{date}</span>
                </div>
              </div>

              <div className="connect">
                <span className="productInfoKey">Tên thiết bị: </span>
                <span className="productInfoValue">{maChuoi}</span>
                <div className="connectRight">
                  <span className="productInfoKey">Vĩ độ: </span>
                  <span className="productInfoValue">{lat}</span>
                </div>
              </div>
              <div className="connect">
                <span className="productInfoKey">Mã thiết bị: </span>
                <span className="productInfoValue">{devSerial}</span>
                <div className="connectRight">
                  <span className="productInfoKey">Kinh độ: </span>
                  <span className="productInfoValue">{lng}</span>
                </div>
              </div>
              <div className="connect">
                <span className="productInfoKey">AC Input Power (Watt): </span>
                <span className="productInfoValue">{ACInputPower}</span>
                <div className="connectRight">
                  <span className="productInfoKey">
                    Kết nối với các bộ đo:{" "}
                  </span>
                  <span className="productInfoValue">{infoTop[0].connect}</span>
                </div>
              </div>
            </div>
          ) : null}
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
                  <span className="productInfoKey">Temperature</span>
                  <span className="productInfoValue">
                    <ConditionTemperature value={infoTop[0].temperature} />
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Signal quality</span>
                  <span className="productInfoValue">
                    <ConditionSignal value={infoTop[0].signalQuality} />
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Battery voltage</span>
                  <span className="productInfoValue">
                    <ConditionBatteryPower value={infoTop[0].dienApPin} />
                  </span>
                </div>

                <div className="productInfoItemTest">
                  <span className="productInfoKey">Power supply voltage</span>
                  <span className="productInfoValue">
                    <ConditionBatteryPower value={infoTop[0].dienApNguon} />
                  </span>
                </div>
              </div>
            </div>
            <div className="productTopRight">
              <div className="productInfoBottom">
                <div className="productInfoItemColumn">
                  <span className="columnTestPostLeft">On</span>
                  <span className="columnTestPostRight">Off</span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Potential 1</span>
                  <span className="productInfoValueElec">
                    <ConditionPort value={infoTop[0].openPoint1} />
                  </span>
                  <span className="productInfoValueElec">
                    <ConditionPort value={infoTop[0].closePoint1} />
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Potential 2</span>
                  <span className="productInfoValueElec">
                    <ConditionPort value={infoTop[0].openPoint2} />
                  </span>
                  <span className="productInfoValueElec">
                    <ConditionPort value={infoTop[0].closePoint2} />
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Potential 3</span>
                  <span className="productInfoValueElec">
                    <ConditionPort value={infoTop[0].openPoint3} />
                  </span>
                  <span className="productInfoValueElec">
                    <ConditionPort value={infoTop[0].closePoint3} />
                  </span>
                </div>
                <div className="productInfoItemTest">
                  <span className="productInfoKey">Potential 4</span>
                  <span className="productInfoValueElec">
                    <ConditionPort value={infoTop[0].openPoint4} />
                  </span>
                  <span className="productInfoValueElec">
                    <ConditionPort value={infoTop[0].closePoint4} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ChartPort />
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
