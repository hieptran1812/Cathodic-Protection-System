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

export default function ChartTP() {
  const API = process.env.REACT_APP_API;
  const [maxPort, setMaxPort] = useState([]);
  const [maxPortTime, setMaxPortTime] = useState([]);
  const [maxPortName, setMaxPortName] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/chartPortMax/`)
      .then((res) => {
        const data = res.data;
        // console.log(data);
        setMaxPort(data.maxPort);
        setMaxPortName(data.maxPortName);
        setMaxPortTime(data.maxPortTime);
      })
      .catch((error) => console.log(error));
  }, [API]);

  const data = {
    labels: ["T", "T-1", "T-2", "T-3", "T-4", "T-5", "T-6", "T-7"],
    datasets: [
      {
        label: "Điện thế",
        data: [
          {
            y: maxPort[0],
            x: "T",
            name: maxPortName[0],
            time: maxPortTime[0],
          },
          {
            y: maxPort[1],
            x: "T-1",
            name: maxPortName[1],
            time: maxPortTime[1],
          },
          {
            y: maxPort[2],
            x: "T-2",
            name: maxPortName[2],
            time: maxPortTime[2],
          },
          {
            y: maxPort[3],
            x: "T-3",
            name: maxPortName[3],
            time: maxPortTime[3],
          },
          {
            y: maxPort[4],
            x: "T-4",
            name: maxPortName[4],
            time: maxPortTime[4],
          },
          {
            y: maxPort[5],
            x: "T-5",
            name: maxPortName[5],
            time: maxPortTime[5],
          },
          {
            y: maxPort[6],
            x: "T-6",
            name: maxPortName[6],
            time: maxPortTime[6],
          },
          {
            y: maxPort[7],
            x: "T-7",
            name: maxPortName[7],
            time: maxPortTime[7],
          },
        ],
        fill: false,
        backgroundColor: "rgba(118, 242, 2, 1)",
        borderColor: "rgba(39, 18, 226, 1)",
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
        text: "Biểu đồ điện thế thấp nhất trong các Bộ đo",
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
    <div
      className="chart"
      style={{ width: "50%", float: "right", clear: "none" }}
    >
      <Line data={data} options={options} />
    </div>
  );
}
