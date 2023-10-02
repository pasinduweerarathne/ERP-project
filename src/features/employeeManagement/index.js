import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import { getEmployeesContent } from "./employeeSlice";
import Table from "./components/Table";
import { useLocation, useNavigate } from "react-router-dom";
import Paginate from "../../components/Pagination/Paginate";

const TopSideButtons = ({ page }) => {
  const dispatch = useDispatch();

  const openAddNewEmployeeModal = () => {
    dispatch(
      openModal({
        title: "Add New Employee",
        bodyType: MODAL_BODY_TYPES.EMPLOYEE_ADD_NEW,
        extraObject: { page },
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewEmployeeModal()}
      >
        Add New
      </button>
    </div>
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function EmployeeManagement() {
  const dispatch = useDispatch();
  const currentPage = useRef();
  const query = useQuery();
  const page = query.get("page") || 1;

  const fetchEmployees = useSelector((state) => state.employee.employees);

  const deleteEmployee = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this employee?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.EMPLOYEE_DELETE,
          _id: id,
          page: page,
          toastMsg: "Employee Deleted!",
        },
      })
    );
  };

  const editEmployee = (id) => {
    const selectedEmp = fetchEmployees.modelResults.filter((e) => e._id === id);
    const dataObj = { page: page, selectedEmp };

    dispatch(
      openModal({
        title: "Edit Employee",
        bodyType: MODAL_BODY_TYPES.EMPLOYEE_ADD_NEW,
        extraObject: dataObj,
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Employees"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="overflow-x-auto w-full">
          {!fetchEmployees.modelResults ? (
            <h1 className="font-semibold text-center">
              No data available, Please add an employee
            </h1>
          ) : (
            <Table
              tableHeader={["Name", "Nic", "Address", "Salary", "Actions"]}
              tableBody={fetchEmployees.modelResults}
              editEmp={editEmployee}
              deleteEmp={deleteEmployee}
              showAction={true}
            />
          )}
          <div className="flex justify-center">
            <Paginate
              page={parseInt(page) || 1}
              totalPages={fetchEmployees.totalPages}
            />
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default EmployeeManagement;
