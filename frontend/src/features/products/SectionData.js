import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import "./pagination.css";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import { openModal } from "../common/modalSlice";
import Table from "./components/Table";
import { fetchZoneDetails } from "./productSlice";
import ReactPaginate from "react-paginate";

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

function convertProductName(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const SectionData = () => {
  const { zone, section } = useParams();
  const zoneSlug = zone;
  const category = convertProductName(section);

  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    currentPage.current = 1;
    getPaginatedExpenses();
  }, []);

  function getPaginatedExpenses() {
    fetch(
      `http://localhost:4000/api/expenses/${zoneSlug}/${category}?page=${currentPage.current}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPageCount(data.pageCount);
        setData(data);
      });
  }

  function handlePageClick(e) {
    currentPage.current = e.selected + 1;
    getPaginatedExpenses();
  }

  const deleteZoneDetails = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this zone details?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.ZONE_DETAILS_DELETE,
          _id: id,
          section,
          zone,
          toastMsg: "Successfully Deleted!",
        },
      })
    );
  };

  const editZoneDetails = (id) => {
    const selectedData = data.expensesResult?.filter((z) => z._id === id);
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
        <NavLink
          className={"btn btn-primary btn-sm ml-5"}
          to={`/app/zones/${zone}`}
        >
          Back
        </NavLink>
      </div>

      <div className="grid lg:grid-cols-3 mt-4 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="stats shadow p-4">
          <div className="text-center">
            <div className={`text-2xl dark:text-slate-300`}>Total Income:</div>
            <div className="text-2xl">
              {/* {totalIncome === undefined ? 0 : totalIncome} */}
            </div>
          </div>
        </div>
        <div className="stats shadow p-4">
          <div className="text-center">
            <div className={`text-2xl dark:text-slate-300`}>Total Expense:</div>
            <div className="text-2xl">
              {/* {totalExpenses === undefined ? 0 : totalExpenses} */}
            </div>
          </div>
        </div>
        <div className="stats shadow p-4">
          <div className="text-center">
            <div className={`text-2xl dark:text-slate-300`}>
              Total Net Income(Profit):
            </div>
            {/* <div className="text-2xl">{isNaN(netProfit) ? 0 : netProfit}</div> */}
          </div>
        </div>
      </div>

      {/* <TopSideButtons /> */}
      <TitleCard
        title="Zone Details"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {!data.expensesResult?.length ? (
          <h1 className="font-semibold text-center">
            No data available, Please add one
          </h1>
        ) : (
          <>
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
                tableBody={data?.expensesResult}
                editData={editZoneDetails}
                deleteData={deleteZoneDetails}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: 20,
                  boxSizing: "border-box",
                }}
              >
                <ReactPaginate
                  activeClassName={"item active "}
                  breakClassName={"item break-me "}
                  breakLabel={"..."}
                  containerClassName={"pagination"}
                  disabledClassName={"disabled-page"}
                  marginPagesDisplayed={2}
                  nextClassName={"item next"}
                  nextLabel={"-->"}
                  onPageChange={handlePageClick}
                  pageCount={pageCount}
                  pageClassName={"item pagination-page "}
                  pageRangeDisplayed={2}
                  previousClassName={"item previous"}
                  previousLabel={"<--"}
                />
              </div>
            </div>
          </>
        )}
      </TitleCard>
    </>
  );
};

export default SectionData;
