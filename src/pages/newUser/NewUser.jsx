import "./newUser.css";
import axios from "axios";
import { React, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

const API = process.env.REACT_APP_API;

export default function NewUser() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [organization, setOrganization] = useState("")
  const [role, setRole] = useState("viewer");
  const [open, setOpen] = useState(false);
  const [dateRegistered, setDateRegistered] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      username,
      password,
      email,
      phone,
      address,
      organization,
      role,
      notes,
      dateRegistered,
      dueDate,
    };
    axios
      .post(`${API}/api/addUser`, data)
      .then((res) => {
        if (res.status === 200) {
          setOpen(true);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="newUser">
      <Topbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "100%", margin: "20px 70px 20px" }}>
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
              Th??m ng?????i d??ng th??nh c??ng!
            </Alert>
          </Collapse>
          <h1 className="newUserTitle" style={{ margin: "20px 0px 0px 0px" }}>
            T???o ng?????i d??ng m???i
          </h1>
          <form className="newUserForm" onSubmit={handleSubmit}>
            <div className="newUserItem">
              <label>T??n t??i kho???n</label>
              <input
                name="username"
                type="text"
                required="required"
                onChange={(e) => setUsername(e.target.value)}
                autofocus
              />
            </div>
            <div className="newUserItem">
              <label>M???t kh???u</label>
              <input
                type="password"
                required="required"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>H??? v?? t??n</label>
              <input
                name="name"
                type="text"
                required="required"
                onChange={(e) => setName(e.target.value)}
                autofocus
              />
            </div>
            <div className="newUserItem">
              <label>?????a ch??? Email</label>
              <input
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Nh???p ?????a ch??? email h???p l???"
              />
            </div>
            <div className="newUserItem">
              <label>T??n t??? ch???c</label>
              <input
                name="organization"
                type="text"
                onChange={(e) => setOrganization(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>S??? ??i???n tho???i</label>
              <input
                name="phone"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b"
              />
            </div>
            <div className="newUserItem">
              <label>?????a ch???</label>
              <input
                name="address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>Ghi ch??</label>
              <input
                name="notes"
                type="text"
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>Ng??y ????ng k?? t??i kho???n *</label>
              <input
                type="date"
                required="required"
                onChange={(e) => setDateRegistered(e.target.value)}
                autoFocus
              />
            </div>
            <div className="newUserItem">
              <label>Ng??y h???t h???n t??i kho???n *</label>
              <input
                type="date"
                required="required"
                onChange={(e) => setDueDate(e.target.value)}
                autoFocus
              />
            </div>

            <div className="newUserItem">
              <label>Vai tr??</label>
              <select
                className="newUserSelect"
                id="role"
                onChange={(e) => setRole(e.target.value)}
              >
                <option name="role" value="user">
                  Ng?????i xem
                </option>
                <option name="role" value="admin">
                  Qu???n tr??? vi??n
                </option>
              </select>
            </div>
            <div>
              <button className="newUserButton">Th??m ng?????i d??ng</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
