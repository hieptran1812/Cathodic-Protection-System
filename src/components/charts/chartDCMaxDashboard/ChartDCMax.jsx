import { React, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart,
  ArcElement,
  LineElement,
  PointElement,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  LineElement,
  PointElement,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
);

export default function ChartDCMax() {
  const API = process.env.REACT_APP_API;
  const [maxDC, setMaxDC] = useState([]);
  const [maxAC, setMaxAC] = useState([]);
  const [maxACName, setMaxACName] = useState([]);
  const [maxDCName, setMaxDCName] = useState([]);
  const [maxDCTime, setMaxDCTime] = useState([]);
  const [maxACTime, setMaxACTime] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/chartDCMax/`)
      .then((res) => {
        const data = res.data;
        // console.log(data);
        setMaxAC(data.maxAC);
        setMaxDC(data.maxDC);
        setMaxACName(data.maxACName);
        setMaxDCName(data.maxDCName);
        setMaxACTime(data.maxACTime);
        setMaxDCTime(data.maxDCTime);
      })
      .catch((error) => console.log(error));
  }, [API]);

  const data = {
    labels: ["T", "T-1", "T-2", "T-3", "T-4", "T-5", "T-6", "T-7"],
    datasets: [
      {
        label: "Điện áp DC",
        data: [
          {
            y: maxDC[0],
            x: "T",
            name: maxDCName[0],
            time: maxDCTime[0],
          },
          {
            y: maxDC[1],
            x: "T-1",
            name: maxDCName[1],
            time: maxDCTime[1],
          },
          {
            y: maxDC[2],
            x: "T-2",
            name: maxDCName[2],
            time: maxDCTime[2],
          },
          {
            y: maxDC[3],
            x: "T-3",
            name: maxDCName[3],
            time: maxDCTime[3],
          },
          {
            y: maxDC[4],
            x: "T-4",
            name: maxDCName[4],
            time: maxDCTime[4],
          },
          {
            y: maxDC[5],
            x: "T-5",
            name: maxDCName[5],
            time: maxDCTime[5],
          },
          {
            y: maxDC[6],
            x: "T-6",
            name: maxDCName[6],
            time: maxDCTime[6],
          },
          {
            y: maxDC[7],
            x: "T-7",
            name: maxDCName[7],
            time: maxDCTime[7],
          },
        ],
        fill: false,
        backgroundColor: "rgba(118, 242, 2, 1)",
        borderColor: "rgba(39, 18, 226, 1)",
      },
      {
        label: "Điện áp AC",
        data: [
          {
            y: maxAC[0],
            x: "T",
            name: maxACName[0],
            time: maxACTime[0],
          },
          {
            y: maxAC[1],
            x: "T-1",
            name: maxACName[1],
            time: maxACTime[1],
          },
          {
            y: maxAC[2],
            x: "T-2",
            name: maxACName[2],
            time: maxACTime[2],
          },
          {
            y: maxAC[3],
            x: "T-3",
            name: maxACName[3],
            time: maxACTime[3],
          },
          {
            y: maxAC[4],
            x: "T-4",
            name: maxACName[4],
            time: maxACTime[4],
          },
          {
            y: maxAC[5],
            x: "T-5",
            name: maxACName[5],
            time: maxACTime[5],
          },
          {
            y: maxAC[6],
            x: "T-6",
            name: maxACName[6],
            time: maxACTime[6],
          },
          {
            y: maxAC[7],
            x: "T-7",
            name: maxACName[7],
            time: maxACTime[7],
          },
        ],
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  const options = {
    tension: 0.4,
    scales: {
      y: {
        title: {
          display: true,
          text: "Điện áp (V)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Tín hiệu nhận theo thời gian",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Biểu đồ điện áp DC và AC cao nhất trong các Bộ trung tâm",
      },
      tooltip: {
        callbacks: {
          beforeTitle: function (context) {
            return `Tên thiết bị:  ${context[0]["raw"]["name"]}`;
          },
          title: function (context) {
            return `Thời gian:  ${context[0]["raw"]["time"]}`;
          },
        },
      },
    },
  };

  return (
    <div className="chart">
      <Line data={data} options={options} />
    </div>
  );
}
