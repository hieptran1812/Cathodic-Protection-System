import {
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Business,
  Notes,
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
  const [notes, setNotes] = useState("");
  const [password, setPassword] = useState("");
  const [dateRegistered, setDateRegistered] = useState("");
  const [dueDate, setDueDate] = useState("");
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
    const data = {
      name,
      email,
      phone,
      address,
      notes,
      password,
      dateRegistered,
      dueDate,
    };
    // console.log(data);

    axios
      .post(`${API}/api/editUser/${userId}`, data)
      .then((res) => {
        // console.log(res.data);
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
          setName(data.name);
          setEmail(data.email);
          setAddress(data.address);
          setPhone(data.phone);
          setNotes(data.notes);
          setPassword(data.password);
          // console.log(data);
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
              C???p nh???t th??ng tin ng?????i d??ng th??nh c??ng!
            </Alert>
          </Collapse>
          <div className="userTitleContainer">
            <h1 className="userTitle">Th??ng tin chi ti???t</h1>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={handleClickOpen}
            >
              X??a ng?????i d??ng
            </Button>
            <Dialog
              open={openClick}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"B???n ch???c ch???n mu???n x??a?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  X??a ng?????i d??ng s??? x??a t???t c??? d??? li???u c???a ng?????i d??ng ????.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Kh??ng ?????ng ??
                </Button>
                <Button onClick={() => deleteUser()} color="primary" autoFocus>
                  ?????ng ??
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <div className="userShowTopTitle">
                  <span className="userUpdateTitle">
                    H??? v?? t??n: {info.name}
                  </span>
                  <span className="userShowUserTitle">
                    Vai tr??: {info.role}
                  </span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Th??ng tin chi ti???t</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    T??n t??i kho???n: {info.username}
                  </span>
                </div>
                <div className="userShowInfo">
                  <Business className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    T??? ch???c: {info.organization}
                  </span>
                </div>
                <span className="userShowTitle">Th??ng tin li??n h???</span>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    S??? ??i???n tho???i: {info.phone}
                  </span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    ?????a ch??? email: {info.email}
                  </span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    ?????a ch???: {info.address}
                  </span>
                </div>
                <span className="userShowTitle">Ghi ch??</span>
                <div className="userShowInfo">
                  <Notes className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    Ghi ch??: {info.notes}
                  </span>
                </div>
                <div className="userShowInfo">
                  <Notes className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    Ng??y ????ng k??: {info.dateRegistered}
                  </span>
                </div>
                <div className="userShowInfo">
                  <Notes className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    Ng??y h???t h???n: {info.dueDate}
                  </span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">S???a th??ng tin</span>
              <form className="userUpdateForm" onSubmit={handleSubmit}>
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>H??? v?? t??n</label>
                    <input
                      type="text"
                      // placeholder={info.name}
                      className="userUpdateInput"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      title="Nh???p h??? v?? t??n"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder={email}
                      className="userUpdateInput"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Nh???p ?????a ch??? email h???p l???"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>S??? ??i???n tho???i</label>
                    <input
                      type="text"
                      placeholder={phone}
                      className="userUpdateInput"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b"
                      title="Nh???p s??? ??i???n tho???i h???p l???"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>?????a ch???</label>
                    <input
                      type="text"
                      placeholder={address}
                      className="userUpdateInput"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Ghi ch??</label>
                    <input
                      type="text"
                      placeholder={notes}
                      className="userUpdateInput"
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>S???a l???i m???t kh???u</label>
                    <input
                      type="password"
                      placeholder={password}
                      className="userUpdateInput"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="userUpdateRight">
                  <button className="userUpdateButton">C???p nh???t</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
