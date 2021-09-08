import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Business,
} from "@material-ui/icons";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./user.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
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

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
export default function User() {
  const classes = useStyles();
  const [info, setInfo] = useState("");
  const { userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [openClick, setOpenClick] = useState(false);
  let history = useHistory();

  const handleClickOpen = () => {
    setOpenClick(true);
  };

  const handleClose = () => {
    setOpenClick(false);
  };
  function deleteUser() {
    axios
      .get(`${API}/api/user/delete/${userId}`)
      .then((res) => {
        history.replace("/users");
        return 0;
      })
      .catch((error) => console.log(error));
    return 0;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // alert('An essay was submitted: ' + this.state.value);
    const data = {
      name,
      email,
      phone,
      address,
    };
    console.log(data);

    axios
      .post(`${API}/api/editUser/${userId}`, data)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          setOpen(true);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    async function fetchAPI() {
      axios
        .get(`${API}/api/users/${userId}`)
        .then((res) => {
          const data = res.data;
          setInfo(data);
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
    fetchAPI();
  }, [userId]);

  return (
    <div className="user">
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%", margin: "20px 40px 20px" }}>
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
              Thêm người dùng thành công!
            </Alert>
          </Collapse>
          <div className="userTitleContainer">
            <h1 className="userTitle">Thông tin chi tiết</h1>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={handleClickOpen}
            >
              Xóa người dùng
            </Button>
            <Dialog
              open={openClick}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Bạn chắc chắn muốn xóa?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Xóa người dùng sẽ xóa tất cả dữ liệu của người dùng đó.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Không đồng ý
                </Button>
                <Button onClick={() => deleteUser()} color="primary" autoFocus>
                  Đồng ý
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{info.name}</span>
                  <span className="userShowUserTitle">{info.role}</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Thông tin chi tiết</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">{info.username}</span>
                </div>
                <div className="userShowInfo">
                  <Business className="userShowIcon" />
                  <span className="userShowInfoTitle">{info.organization}</span>
                </div>
                <span className="userShowTitle">Liên hệ</span>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">{info.phone}</span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{info.email}</span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">{info.address}</span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">Sửa thông tin</span>
              <form className="userUpdateForm" onSubmit={handleSubmit}>
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Họ và tên</label>
                    <input
                      type="text"
                      placeholder={info.name}
                      className="userUpdateInput"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder={info.email}
                      className="userUpdateInput"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      placeholder={info.phone}
                      className="userUpdateInput"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Địa chỉ</label>
                    <input
                      type="text"
                      placeholder={info.address}
                      className="userUpdateInput"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="userUpdateRight">
                  <button className="userUpdateButton">Cập nhật</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
