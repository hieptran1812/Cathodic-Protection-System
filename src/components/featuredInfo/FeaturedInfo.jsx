import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import axios from 'axios';
import { React, useEffect, useState } from "react";

const API = process.env.REACT_APP_API;
export default function FeaturedInfo() {

  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/featureInfo/`)
      .then((res) => {
        const data = res.data;
        setInfo(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Thống kê thiết bị bộ trung tâm</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{info.countDevicesBTT} thiết bị</span>
        </div>
        <span className="featuredTitle">Điện áp DC cao nhất</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{info.maxDC} (V)</span>
        </div>
        <span className="featuredTitle">Điện áp AC cao nhất</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{info.maxAC} (V)</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Thống kê thiết bị bộ đo</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{info.countDevicesBD} thiết bị</span>
        </div>
        <span className="featuredTitle">Điện áp nguồn cao nhất</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{info.maxNguon} (V)</span>
        </div>
        <span className="featuredTitle">Điện áp pin cao nhất</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{info.maxPin} (V)</span>
        </div>
      </div>
    </div>
  );
}
