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
// import SearchBar from "material-ui-search-bar";

const API = process.env.REACT_APP_API;

export default function User() {
  const [info, setInfo] = useState("");
  const { userId } = useParams();

  // const [searched, setSearched] = useState<string>("");

  // const requestSearch = (searchedVal: string) => {
  //   const filteredRows = originalRows.filter((row) => {
  //     return row.name.toLowerCase().includes(searchedVal.toLowerCase());
  //   });
  //   setRows(filteredRows);
  // };

  // const cancelSearch = () => {
  //   setSearched("");
  //   requestSearch(searched);
  // };

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
          <div className="userTitleContainer">
            <h1 className="userTitle">Thông tin chi tiết</h1>
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
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Họ và tên</label>
                    <input
                      type="text"
                      placeholder={info.name}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder={info.email}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      placeholder={info.phone}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Địa chỉ</label>
                    <input
                      type="text"
                      placeholder={info.address}
                      className="userUpdateInput"
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
