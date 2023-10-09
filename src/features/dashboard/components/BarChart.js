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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ expensesArr }) {
  const minuteData = expensesArr.reduce((acc, expense) => {
    const minute = new Date(expense.createdAt).getMinutes();
    const key = `${minute}`;

    if (!acc[key]) {
      acc[key] = 0;
    }

    acc[key] += expense.salary;

    return acc;
  }, {});

  // Convert minuteData into an array
  const data = Object.keys(minuteData).map((minute) => ({
    minute: parseInt(minute),
    amount: minuteData[minute],
  }));

  const chartData = {
    labels: data.map((entry) => entry.minute),
    datasets: [
      {
        label: "Expenses",
        data: data.map((entry) => entry.amount),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <TitleCard title={"Revenue"}>
      <Line data={chartData} />
    </TitleCard>
  );
}

export default BarChart;

// const data = [
//   {
//     _id: "652236c6c7fa0566e1ec53bc",
//     zoneId: "6511cce1235e6675447454dc",
//     zoneSlug: "gold-star-3",
//     categoryName: "New Tea",
//     empName: "Yoga Shanthi",
//     eDescription: "one",
//     type: "Expense",
//     salary: 1200,
//     createdAt: "2023-10-08T04:57:43.404+00:00",
//     updatedAt: "2023-10-08T04:57:43.404+00:00",
//     __v: 0,
//   },
//   {
//     _id: "652236c6c7fa0566e1ec53bc",
//     zoneId: "6511cce1235e6675447454dc",
//     zoneSlug: "gold-star-3",
//     categoryName: "New Tea",
//     empName: "Yoga Shanthi",
//     eDescription: "one",
//     type: "Expense",
//     salary: 1200,
//     createdAt: "2023-10-08T04:57:43.404+00:00",
//     updatedAt: "2023-10-08T04:57:43.404+00:00",
//     __v: 0,
//   },
//   {
//     _id: "652236c6c7fa0566e1ec53bc",
//     zoneId: "6511cce1235e6675447454dc",
//     zoneSlug: "gold-star-3",
//     categoryName: "New Tea",
//     empName: "Yoga Shanthi",
//     eDescription: "one",
//     type: "Expense",
//     salary: 1200,
//     createdAt: "2023-10-08T04:57:43.404+00:00",
//     updatedAt: "2023-10-08T04:57:43.404+00:00",
//     __v: 0,
//   },
// ];
