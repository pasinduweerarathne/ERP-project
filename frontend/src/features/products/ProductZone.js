import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import { ZONE_DATA } from "../../utils/dummyData";
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil";
import { openModal } from "../common/modalSlice";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openModel = () => {
    dispatch(
      openModal({
        title: "Add zone details",
        bodyType: MODAL_BODY_TYPES.ADD_ZONE_DETAILS,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openModel()}
      >
        Add New
      </button>
    </div>
  );
};

const ProductZone = () => {
  const { zone, type } = useParams();
  const dispatch = useDispatch();
  const zoneData = useSelector((state) => state.product.zoneDetails);

  const deleteZoneData = () => {};

  return (
    <>
      <div className="dark:text-white flex items-center justify-between">
        <h1 className="text-center text-4xl font-extrabold dark:text-white">
          Zone {zone}
        </h1>
        <NavLink
          className={"bg-primary rounded-2xl px-5 py-2 text-white"}
          to={`/app/products/${type}`}
        >
          Back
        </NavLink>
      </div>

      <div className="grid lg:grid-cols-3 mt-4 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="stats shadow p-5">
          <div className="flex items-center justify-around">
            <div className={`text-2xl dark:text-slate-300`}>Income</div>
            <div className="mt-[8px]">20000</div>
          </div>
        </div>
        <div className="stats shadow p-5">
          <div className="flex items-center justify-around">
            <div className={`text-2xl dark:text-slate-300`}>Expense</div>
            <div className="mt-[8px]">20000</div>
          </div>
        </div>
        <div className="stats shadow p-5">
          <div className="flex items-center justify-around">
            <div className={`text-2xl dark:text-slate-300`}>Profit</div>
            <div className="mt-[8px]">20000</div>
          </div>
        </div>
      </div>

      {/* <TopSideButtons /> */}
      <TitleCard
        title="Zone Details"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Expense / Income</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {zoneData?.map((d, i) => (
                <tr key={i}>
                  <td>{d.name}</td>
                  <td>{d.description}</td>
                  <td>{d.type}</td>
                  <td>{d.date}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
};

export default ProductZone;
