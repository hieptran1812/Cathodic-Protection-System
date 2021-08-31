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
        console.log(res);
        const data = res.data;
        setInfo(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Tổng thiết bị bộ trung tâm</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{info.countDevices}</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Trung bình điện áp DC</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{info.averageDC}</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Trung bình điện áp AC</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{info.averageAC}</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
      </div>
    </div>
  );
}
