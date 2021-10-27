import "./featuredInfo.css";
import axios from 'axios';
import Alert from "@material-ui/lab/Alert";
import { React, useEffect, useState } from "react";

const API = process.env.REACT_APP_API;

function ConditionMaxDC(props){
  if (props.value > 230) {
    return (
      <Alert variant="filled" severity="error">
        Điện áp DC quá ngưỡng, hãy kiểm tra lại!
      </Alert>
    );
  } else if (props.value === 0) {
    return (
      <Alert variant="filled" severity="error">
        Điện áp DC bằng 0, hãy kiểm tra lại!
      </Alert>
    );
  } else {
    return (
      <Alert variant="filled" severity="info">
        Điện áp ổn định
      </Alert>
    );
  }
}

function ConditionMaxAC(props) {
  if (props.value > 230) {
    return (
      <Alert variant="filled" severity="error">
        Điện áp AC quá ngưỡng, hãy kiểm tra lại!
      </Alert>
    );
  }
  else if (props.value === 0) {
    return (
      <Alert variant="filled" severity="error">
        Điện áp AC bằng 0, hãy kiểm tra lại!
      </Alert>
    ); 
  }
  else {
    return (
      <Alert variant="filled" severity="info">
        Điện áp ổn định
      </Alert>
    );
  }
}

function ConditionMaxNguon(props) {
  if (props.value > 10) {
    return (
      <Alert variant="filled" severity="error">
        Điện áp nguồn quá ngưỡng, hãy kiểm tra lại!
      </Alert>
    );
  } else if (props.value === 0) {
    return (
      <Alert variant="filled" severity="error">
        Điện áp nguồn bằng 0, hãy kiểm tra lại!
      </Alert>
    );
  } else {
    return (
      <Alert variant="filled" severity="info">
        Điện áp ổn định
      </Alert>
    );
  }
}

function ConditionMaxPin(props) {
  if (props.value > 10) {
    return (
      <Alert variant="filled" severity="error">
        Điện áp pin quá ngưỡng, hãy kiểm tra lại!
      </Alert>
    );
  } else if (props.value === 0) {
    return (
      <Alert variant="filled" severity="error">
        Điện áp pin bằng 0, hãy kiểm tra lại!
      </Alert>
    );
  } else {
    return (
      <Alert variant="filled" severity="info">
        Điện áp ổn định
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
          <ConditionMaxDC value={info.maxDC} />
        </div>
        <span className="featuredTitle">Điện áp AC cao nhất</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{info.maxAC} (V)</span>
          <ConditionMaxAC value={info.maxAC} />
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
          <ConditionMaxNguon value={info.maxNguon} />
        </div>
        <span className="featuredTitle">Điện áp pin cao nhất</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{info.maxPin} (V)</span>
          <ConditionMaxPin value={info.maxPin} />
        </div>
      </div>
    </div>
  );
}
