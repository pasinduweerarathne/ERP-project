import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import { openModal } from "../common/modalSlice";
import Table from "./components/Table";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const open = () => {
    dispatch(
      openModal({
        title: "Add zone details",
        bodyType: MODAL_BODY_TYPES.ADD_ZONE_DETAILS,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button className="btn btn-primary btn-sm ml-5" onClick={() => open()}>
        Add New
      </button>
    </div>
  );
};

const CoconutZoneData = () => {
  const { zone, type } = useParams();
  const dispatch = useDispatch();
  const zoneData = useSelector((state) => state.product.tea);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(zoneData);
  }, [zoneData]);

  // expenses calculate
  const filteredExensesData = data.filter((data) => data.type === "Expense");
  const expensesArray = filteredExensesData.map((data) => data.salary);
  const totalExpenses = expensesArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  // income calculate
  const filteredIncomeData = data.filter((data) => data.type === "Income");
  const incomeArray = filteredIncomeData.map((data) => Number(data.amount));
  const totalIncome = incomeArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  const deleteZoneDetails = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this zone details?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.ZONE_DETAILS_DELETE,
          _id: id,
          toastMsg: "Successfully Deleted!",
        },
      })
    );
  };

  const editZoneDetails = (id) => {
    const selectedData = zoneData.filter((z) => z.id === id);

    dispatch(
      openModal({
        title: "Edit zone details",
        bodyType: MODAL_BODY_TYPES.ADD_ZONE_DETAILS,
        extraObject: selectedData,
      })
    );
  };

  return (
    <>
      <div className="dark:text-white flex items-center justify-between">
        <h1 className="text-center text-4xl font-extrabold dark:text-white">
          Zone {zone}
        </h1>
        <NavLink
          className={"btn btn-primary btn-sm ml-5"}
          to={`/app/products/${type}`}
        >
          Back
        </NavLink>
      </div>

      <div className="grid lg:grid-cols-3 mt-4 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="stats shadow p-4">
          <div className="text-center">
            <div className={`text-2xl dark:text-slate-300`}>Total Income:</div>
            <div className="text-2xl">{totalIncome}</div>
          </div>
        </div>
        <div className="stats shadow p-4">
          <div className="text-center">
            <div className={`text-2xl dark:text-slate-300`}>Total Expense:</div>
            <div className="text-2xl">{totalExpenses}</div>
          </div>
        </div>
        <div className="stats shadow p-4">
          <div className="text-center">
            <div className={`text-2xl dark:text-slate-300`}>
              Total Net Income(Profit):
            </div>
            <div className="text-2xl">{totalIncome - totalExpenses}</div>
          </div>
        </div>
      </div>

      {/* <TopSideButtons /> */}
      <TitleCard
        title="Zone Details"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {!data.length ? (
          <h1 className="font-semibold text-center">
            No data available, Please add one
          </h1>
        ) : (
          <div className="overflow-x-auto w-full">
            <Table
              tableHeader={[
                "name",
                "description",
                "expense/income",
                "amount",
                "date",
                "actions",
              ]}
              tableBody={data}
              editData={editZoneDetails}
              deleteData={deleteZoneDetails}
            />
          </div>
        )}
      </TitleCard>
    </>
  );
};

export default CoconutZoneData;
