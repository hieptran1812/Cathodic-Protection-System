import "./newProduct.css";
import axios from 'axios';
import {React, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const API = process.env.REACT_APP_API;

export default function NewProduct() {

  const [id, setId] = useState('');
  const [maChuoi, setMaChuoi] = useState("");
  const [type, setType] = useState('0');
  const [organization, setOrganization] = useState("");
  const [date, setDate] = useState("");
  const [dateUpdate, setDateUpdate] = useState("");
  const [area, setArea] = useState("");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState("");
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id,
      maChuoi,
      type,
      organization,
      date,
      area,
      dateUpdate,
      lat,
      lng
    };
    axios.post(`${API}/api/newProduct`, data)
      .then(res => {
        if(res.status === 200){
          setOpen(true)
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="newProduct">
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%" }}>
          <div className={classes.root}>
            <Collapse in={open}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Thêm thiết bị thành công!
              </Alert>
            </Collapse>
          </div>
          <h1 className="addProductTitle">Thêm thiết bị mới</h1>
          <form className="addProductForm" onSubmit={handleSubmit}>
            <div className="addProductItem">
              <label>Tên tổ chức *</label>
              <input
                type="text"
                required="required"
                onChange={(e) => setOrganization(e.target.value)}
                autoFocus
              />
            </div>
            <div className="addProductItem">
              <label>Tên khu vực/phân xưởng *</label>
              <input
                type="text"
                required="required"
                onChange={(e) => setArea(e.target.value)}
                autoFocus
              />
            </div>
            <div className="addProductItem">
              <label>Loại thiết bị *</label>
              <select
                className="addProductItem"
                id="type"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="0">Bộ trung tâm</option>
                <option value="1">Bộ đo</option>
              </select>
            </div>
            <div className="addProductItem">
              <label>Mã thiết bị *</label>
              <input
                type="text"
                placeholder="Mã chỉ gồm số"
                required="required"
                onChange={(e) => setId(e.target.value)}
                autoFocus
              />
            </div>
            <div className="addProductItem">
              <label>Tên thiết bị *</label>
              <input
                type="text"
                placeholder="Mã có dạng XXX-XXX-XXX-XXX bao gồm cả chữ và số"
                required="required"
                onChange={(e) => setMaChuoi(e.target.value)}
                autoFocus
              />
            </div>
            <div className="addProductItem">
              <label>Ngày thêm thiết bị *</label>
              <input
                type="date"
                required="required"
                onChange={(e) => setDateUpdate(e.target.value)}
                autoFocus
              />
            </div>
            <div className="addProductItem">
              <label>Ngày bảo trì, bảo dưỡng *</label>
              <input
                type="date"
                required="required"
                onChange={(e) => setDate(e.target.value)}
                autoFocus
              />
            </div>
            <iframe
              title = "map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29793.98839009497!2d105.81945408380663!3d21.02273870409065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSGFub2ksIEhvw6BuIEtp4bq_bSwgSGFub2ksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1637593863598!5m2!1sen!2s"
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
            <div className="addProductItem">
              <label>Vĩ độ *</label>
              <input
                type="number"
                required="required"
                onChange={(e) => setLat(e.target.value)}
                autoFocus
                step="any"
              />
            </div>
            <div className="addProductItem">
              <label>Kinh độ *</label>
              <input
                type="number"
                required="required"
                onChange={(e) => setLng(e.target.value)}
                autoFocus
                step="any"
              />
            </div>
            <button className="addProductButton">Thêm mới</button>
          </form>
        </div>
      </div>
    </div>
  );
}
