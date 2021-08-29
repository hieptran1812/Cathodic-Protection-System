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
  const [type, setType] = useState('0');
  const [organization, setOrganization] = useState("");
  const [date, setDate] = useState("");
  const [dateUpdate, setDateUpdate] = useState("");
  const [area, setArea] = useState("");
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id,
      type,
      organization,
      date,
      area,
      dateUpdate,
    };
    console.log(data);
    
    axios.post(`${API}/api/newProduct`, data)
      .then(res => {
        console.log(res.data)
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
                required="required"
                onChange={(e) => setId(e.target.value)}
                autoFocus
              />
            </div>
            <div className="addProductItem">
              <label>Ngày cập nhật *</label>
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

            {/* <div className="addProductItem">
              <label>Vị trí thiết bị</label>
              <input
                type="text"
                required="required"
                // onChange={(e) => setId(e.target.value)}
                autoFocus
              />
            </div> */}
            <button className="addProductButton">Thêm mới</button>
          </form>
        </div>
      </div>
    </div>
  );
}
