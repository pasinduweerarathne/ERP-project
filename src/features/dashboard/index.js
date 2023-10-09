import DashboardStats from "./components/DashboardStats";
import UserChannels from "./components/UserChannels";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../common/headerSlice";
import { useEffect } from "react";
import { getAllExpensesAndIncomes } from "./dashboardSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const updateDashboardPeriod = (newRange) => {
    // Dashboard range changed, write code to refresh your values
    dispatch(
      showNotification({
        message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
        status: 1,
      })
    );
  };

  useEffect(() => {
    dispatch(getAllExpensesAndIncomes());
  }, []);

  const fetchTotExpAndInc = useSelector((state) => state.dashboard.total);

  return (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        <DashboardStats
          title="Incomes"
          value={fetchTotExpAndInc.totalIncomes}
        />

        <DashboardStats
          title="Expenses"
          value={fetchTotExpAndInc.totalExpenses}
        />

        <DashboardStats
          title="Profit"
          value={
            fetchTotExpAndInc.totalIncomes - fetchTotExpAndInc.totalExpenses
          }
        />
      </div>

      {/** ---------------------- Different charts ------------------------- */}
      <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
        {/* <LineChart /> */}
        <BarChart expensesArr={fetchTotExpAndInc?.expenses} />
      </div>

      {/** ---------------------- User source channels table  ------------------------- */}
      {/* <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
        <UserChannels />
      </div> */}
    </>
  );
}

export default Dashboard;
