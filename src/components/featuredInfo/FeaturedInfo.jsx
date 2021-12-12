import "./featuredInfo.css";
import axios from 'axios';
import Alert from "@material-ui/lab/Alert";
import { React, useEffect, useState } from "react";

const API = process.env.REACT_APP_API;

function ConditionMaxDC(props){
  if (props.value >= 50) {
    return (
      <Alert variant="filled" severity="error">
        Cảnh báo điện thế cao! (Từ 50V trở lên)
      </Alert>
    );
  } else if (props.value === 0) {
    return (
      <Alert variant="filled" severity="warning">
        Điện áp DC bằng 0, hãy kiểm tra lại!
      </Alert>
    );
  } else if (props.value <= 10) {
    return (
      <Alert variant="filled" severity="warning">
        Cảnh báo điện thế thấp! (Từ 10V trở xuống)
      </Alert>
    );
  } else {
    return (
      <Alert variant="filled" severity="info">
        Điện áp ổn định (lớn hơn 10V và nhỏ hơn 50V)
      </Alert>
    );
  }
}

function ConditionMaxAC(props) {
  if (props.value > 380) {
    return (
      <Alert variant="filled" severity="error">
        Cảnh báo điện thế cao! (lớn hơn 380V)
      </Alert>
    );
  }
  else if (props.value === 0) {
    return (
      <Alert variant="filled" severity="warning">
        Điện thế bằng 0, hãy kiểm tra lại!
      </Alert>
    ); 
  }
  else if (props.value < 220) {
    return (
      <Alert variant="filled" severity="warning">
        Cảnh báo điện thế thấp! (nhỏ hơn 220V)
      </Alert>
    );
  } else {
    return (
      <Alert variant="filled" severity="info">
        Điện thế ổn định! (lớn hơn 220V và nhỏ hơn 380V)
      </Alert>
    );
  }
}

function ConditionMaxPort(props) {
  if (
    (props.value <= 1.2 && props.value >= 0.85) ||
    (props.value >= -1.2 && props.value <= -0.85)
  ) {
    return (
      <Alert variant="filled" severity="info">
        Điện thế ổn định (Giá trị tuyệt đối điện thế lớn hơn 850mV và nhỏ hơn 1200mV)
      </Alert>
    );
  } else if (props.value === 0) {
    return (
      <Alert variant="filled" severity="error">
        Điện thế bằng 0, hãy kiểm tra lại!
      </Alert>
    );
  } else if (props.value > 1.2 || props.value < -1.2) {
    return (
      <Alert variant="filled" severity="error">
        Điện thế quá ngưỡng, hãy kiểm tra lại!
      </Alert>
    );
  } else {
    return (
      <Alert variant="filled" severity="warning">
        Điện thế quá ngưỡng, hãy kiểm tra lại!
      </Alert>
    );
  }
}
export default function FeaturedInfo() {

  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/featureInfo/`)
      .then((res) => {
        const data = res.data;
        // console.log(data)
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
          <span className="featuredMoney">
            {info.maxDC} (V) - ({info.maxDCName})
          </span>
          <ConditionMaxDC value={info.maxDC} />
        </div>
        <span className="featuredTitle">Điện áp AC cao nhất</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {info.maxAC} (V) - ({info.maxACName})
          </span>
          <ConditionMaxAC value={info.maxAC} />
        </div>
        <span className="featuredTitle">Tổng số tín hiệu bị lỗi</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {info.countErrorRectifiers} tín hiệu ({info.BTTLoi})
          </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Thống kê thiết bị bộ đo</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{info.countDevicesBD} thiết bị</span>
        </div>
        <span className="featuredTitle">Điện thế cao nhất</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {info.maxPort * 1000} (mV) - ({info.maxPortName})
          </span>
          <ConditionMaxPort value={info.maxPin} />
        </div>
        <span className="featuredTitle">Điện thế thấp nhất</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {info.minPort * 1000} (mV) - ({info.minPortName})
          </span>
          <ConditionMaxPort value={info.minPin} />
        </div>
        <span className="featuredTitle">Tổng số tín hiệu bị lỗi</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {info.countErrorTestPosts} tín hiệu ({info.BDLoi})
          </span>
        </div>
      </div>
    </div>
  );
}
