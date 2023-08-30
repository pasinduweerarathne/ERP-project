import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import { ZONE_DATA } from "../../utils/dummyData";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import { showNotification } from "../common/headerSlice";
import { openModal } from "../common/modalSlice";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

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

const ProductZone = () => {
  const { zone, type } = useParams();
  const dispatch = useDispatch();
  const zoneData = useSelector((state) => state.product.zoneDetails);

  const deleteZoneDetails = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this zone details?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.ZONE_DETAILS_DELETE,
          index: id,
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
                    <button
                      className="mr-4"
                      onClick={() => editZoneDetails(d.id)}
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => deleteZoneDetails(d.id)}>
                      <TrashIcon className="w-5 h-5" />
                    </button>
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
