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
  const [organization, setOrganization] = useState("")
  const [role, setRole] = useState("viewer");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert('An essay was submitted: ' + this.state.value);
    const data = {
      name,
      username,
      password,
      email,
      phone,
      address,
      organization,
      role,
    };
    console.log(data);

    axios
      .post(`${API}/api/addUser`, data)
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) {
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
              Thêm người dùng thành công!
            </Alert>
          </Collapse>
          <h1 className="newUserTitle" style= {{margin: "20px 0px 0px 0px"}}>Tạo người dùng mới</h1>
          <form className="newUserForm" onSubmit={handleSubmit}>
            <div className="newUserItem">
              <label>Tên tài khoản</label>
              <input
                name="username"
                type="text"
                required="required"
                onChange={(e) => setUsername(e.target.value)}
                autofocus
              />
            </div>
            <div className="newUserItem">
              <label>Mật khẩu</label>
              <input
                type="password"
                required="required"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>Họ và tên</label>
              <input
                name="name"
                type="text"
                required="required"
                onChange={(e) => setName(e.target.value)}
                autofocus
              />
            </div>
            <div className="newUserItem">
              <label>Địa chỉ Email</label>
              <input
                name="email"
                type="email"
                placeholder="abc@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
            </div>
            <div className="newUserItem">
              <label>Tên tổ chức</label>
              <input
                name="organization"
                type="text"
                onChange={(e) => setOrganization(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>Số điện thoại</label>
              <input
                name="phone"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>Địa chỉ</label>
              <input
                name="address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="newUserItem">
              <label>Vai trò</label>
              <select
                className="newUserSelect"
                id="role"
                onChange={(e) => setRole(e.target.value)}
              >
                <option name="role" value="user">
                  Người dùng
                </option>
                <option name="role" value="admin">
                  Admin
                </option>
              </select>
            </div>
            <div className="newUserItem">
              <button className="newUserButton">Thêm người dùng</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
