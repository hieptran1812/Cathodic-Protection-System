import { React, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
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

export default function ChartDC() {
  const API = process.env.REACT_APP_API;
  const { productId } = useParams();
  const [infoDC, setInfoDC] = useState([]);
  const [timeOn, setTimeOn] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      axios
        .get(`${API}/api/getChartDC/${productId}`)
        .then((res) => {
          const data = res.data;
          // console.log(data);
          setInfoDC(data.dc)
          setTimeOn(data.time);
        })
        .catch((error) => console.log(error));
    }
    setInterval(fetchAPI, 2000);
  }, [productId, API]);

  const data = {
    labels: ["T", "T-1", "T-2", "T-3", "T-4", "T-5", "T-6", "T-7"],
    datasets: [
      {
        label: "DC Voltage (V)",
        data: [
          {
            y: infoDC[0],
            x: "T",
            time: timeOn[0],
          },
          {
            y: infoDC[1],
            x: "T-1",
            time: timeOn[1],
          },
          {
            y: infoDC[2],
            x: "T-2",
            time: timeOn[2],
          },
          {
            y: infoDC[3],
            x: "T-3",
            time: timeOn[3],
          },
          {
            y: infoDC[4],
            x: "T-4",
            time: timeOn[4],
          },
          {
            y: infoDC[5],
            x: "T-5",
            time: timeOn[5],
          },
          {
            y: infoDC[6],
            x: "T-6",
            time: timeOn[6],
          },
          {
            y: infoDC[7],
            x: "T-7",
            time: timeOn[7],
          },
        ],
        fill: false,
        backgroundColor: "rgb(240, 187, 98)",
        borderColor: "rgb(240, 187, 98)",
      },
    ],
  };

  const options = {
    tension: 0.4,
    maintainAspectRatio: false,
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
        text: "Biểu đồ giá trị điện thế DC",
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return `Thời gian:  ${context[0]["raw"]["time"]}`;
          },
        },
      },
    },
  };

  return (
    <div className="chart">
      <Line width={"200px"} height={"500px"} data={data} options={options} />
    </div>
  );
}
