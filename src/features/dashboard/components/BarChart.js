import TitleCard from "../../../components/Cards/TitleCard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment, { min } from "moment";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ array, chartYaxisName }) {
  const [chartData, setChartData] = useState(null);

  // Calculate total salaries by day and zone
  useEffect(() => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const data = {
      labels: days,
      datasets: [
        {
          label: "gold-star-1",
          data: new Array(7).fill(0),
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
        },
        {
          label: "gold-star-2",
          data: new Array(7).fill(0),
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
        },
        {
          label: "gold-star-3",
          data: new Array(7).fill(0),
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
        },
        {
          label: "gold-star-4",
          data: new Array(7).fill(0),
          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(
            16
          )}`,
        },
      ],
    };

    array.forEach((item) => {
      const createdAt = new Date(item.createdAt);
      const dayOfWeek = createdAt.getDay();
      const zone = item.zoneSlug;

      // Increment the salary for the corresponding day and zone
      if (item.salary) {
        data.datasets.find((dataset) => dataset.label === zone).data[
          dayOfWeek
        ] += item.salary;
      }

      if (item.amount) {
        data.datasets.find((dataset) => dataset.label === zone).data[
          dayOfWeek
        ] += item.amount;
      }
    });

    setChartData(data);
  }, [array]);

  return (
    <TitleCard>
      {chartData && (
        <Bar
          data={chartData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: `${chartYaxisName}`,
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Days of the Week",
                },
              },
            },
          }}
        />
      )}
    </TitleCard>
  );
}

export default BarChart;
