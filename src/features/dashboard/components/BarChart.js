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
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ expensesArr }) {
  // const dataByMinute = {};

  // expensesArr.forEach((item) => {
  //   const createdAt = moment(item.createdAt);
  //   const minute = createdAt.format("YYYY-MM-DD HH:mm"); // Group by minute
  //   const salary = item.salary;

  //   if (dataByMinute[minute]) {
  //     dataByMinute[minute] = salary;
  //   } else {
  //     dataByMinute[minute] = salary;
  //   }
  // });

  // Extract the minutes and salary sums for chart data
  // const minutes = Object.keys(dataByMinute);
  // const salaries = Object.values(dataByMinute);

  // const chartData = {
  //   labels: minutes,
  //   datasets: [
  //     {
  //       label: "Salary",
  //       data: salaries,
  //       backgroundColor: "rgba(75,192,192,0.2)", // Bar color
  //       borderColor: "rgba(75,192,192,1)", // Border color
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   scales: {
  //     x: {
  //       title: {
  //         display: true,
  //         text: "Minutes",
  //       },
  //     },
  //     y: {
  //       title: {
  //         display: true,
  //         text: "Salary",
  //       },
  //     },
  //   },
  // };
  // console.log(expensesArr);

  const salaries = [];
  const minutes = [];

  expensesArr.forEach((expense) => {
    const originalDate = new Date(expense.createdAt);
    const formattedDate = moment(originalDate).format("YY/MM/DD-HH:mm:ss");

    salaries.push(expense.salary);
    minutes.push(formattedDate);
  });

  const chartData = {
    labels: minutes,
    datasets: [
      {
        label: "Salary",
        data: salaries,
        backgroundColor: "rgba(75,192,192,0.2)", // Bar color
        borderColor: "rgba(75,192,192,1)", // Border color
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Minutes",
        },
      },
      y: {
        title: {
          display: true,
          text: "Salary",
        },
      },
    },
  };

  return (
    <TitleCard title={"Revenue"}>
      <Bar data={chartData} options={chartOptions} />
    </TitleCard>
  );
}

export default BarChart;

// const data =
// [
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
