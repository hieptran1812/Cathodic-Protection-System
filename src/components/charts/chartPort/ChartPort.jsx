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

export default function ChartPort() {
  const API = process.env.REACT_APP_API;
  const { productId } = useParams();
  const [port1, setPort1] = useState([]);
  const [port2, setPort2] = useState([]);
  const [port3, setPort3] = useState([]);
  const [port4, setPort4] = useState([]);
  const [timeOn, setTimeOn] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      axios
        .get(`${API}/api/getChartPort/${productId}`)
        .then((res) => {
          const data = res.data;
          // console.log(data);
          setPort1(data.portOn1);
          setPort2(data.portOn2);
          setPort3(data.portOn3);
          setPort4(data.portOn4);
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
        label: "Potential On Port 1 (mV)",
        data: [
          {
            y: port1[0],
            x: "T",
            time: timeOn[0],
          },
          {
            y: port1[1],
            x: "T-1",
            time: timeOn[1],
          },
          {
            y: port1[2],
            x: "T-2",
            time: timeOn[2],
          },
          {
            y: port1[3],
            x: "T-3",
            time: timeOn[3],
          },
          {
            y: port1[4],
            x: "T-4",
            time: timeOn[4],
          },
          {
            y: port1[5],
            x: "T-5",
            time: timeOn[5],
          },
          {
            y: port1[6],
            x: "T-6",
            time: timeOn[6],
          },
          {
            y: port1[7],
            x: "T-7",
            time: timeOn[7],
          },
        ],
        fill: false,
        backgroundColor: "rgb(6, 70, 53)",
        borderColor: "rgb(6, 70, 53)",
      },
      {
        label: "Potential On Port 2 (mV)",
        data: [
          {
            y: port2[0],
            x: "T",
            time: timeOn[0],
          },
          {
            y: port2[1],
            x: "T-1",
            time: timeOn[1],
          },
          {
            y: port2[2],
            x: "T-2",
            time: timeOn[2],
          },
          {
            y: port2[3],
            x: "T-3",
            time: timeOn[3],
          },
          {
            y: port2[4],
            x: "T-4",
            time: timeOn[4],
          },
          {
            y: port2[5],
            x: "T-5",
            time: timeOn[5],
          },
          {
            y: port2[6],
            x: "T-6",
            time: timeOn[6],
          },
          {
            y: port2[7],
            x: "T-7",
            time: timeOn[7],
          },
        ],
        fill: false,
        backgroundColor: "rgb(81, 146, 89)",
        borderColor: "rgb(81, 146, 89)",
      },
      {
        label: "Potential On Port 3 (mV)",
        data: [
          {
            y: port3[0],
            x: "T",
            time: timeOn[0],
          },
          {
            y: port3[1],
            x: "T-1",
            time: timeOn[1],
          },
          {
            y: port3[2],
            x: "T-2",
            time: timeOn[2],
          },
          {
            y: port3[3],
            x: "T-3",
            time: timeOn[3],
          },
          {
            y: port3[4],
            x: "T-4",
            time: timeOn[4],
          },
          {
            y: port3[5],
            x: "T-5",
            time: timeOn[5],
          },
          {
            y: port3[6],
            x: "T-6",
            time: timeOn[6],
          },
          {
            y: port3[7],
            x: "T-7",
            time: timeOn[7],
          },
        ],
        fill: false,
        backgroundColor: "rgb(240, 187, 98)",
        borderColor: "rgb(240, 187, 98)",
      },
      {
        label: "Potential On Port 4 (mV)",
        data: [
          {
            y: port4[0],
            x: "T",
            time: timeOn[0],
          },
          {
            y: port4[1],
            x: "T-1",
            time: timeOn[1],
          },
          {
            y: port4[2],
            x: "T-2",
            time: timeOn[2],
          },
          {
            y: port4[3],
            x: "T-3",
            time: timeOn[3],
          },
          {
            y: port4[4],
            x: "T-4",
            time: timeOn[4],
          },
          {
            y: port4[5],
            x: "T-5",
            time: timeOn[5],
          },
          {
            y: port4[6],
            x: "T-6",
            time: timeOn[6],
          },
          {
            y: port4[7],
            x: "T-7",
            time: timeOn[7],
          },
        ],
        fill: false,
        backgroundColor: "rgb(244, 238, 169)",
        borderColor: "rgb(244, 238, 169)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    tension: 0.4,
    scales: {
      y: {
        title: {
          display: true,
          text: "??i???n ??p (V)",
        },
      },
      x: {
        title: {
          display: true,
          text: "T??n hi???u nh???n theo th???i gian",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Bi???u ????? gi?? tr??? ??i???n th??? On t???i 4 port",
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return `Th???i gian:  ${context[0]["raw"]["time"]}`;
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
