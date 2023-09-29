import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import { getEmployeesContent } from "./employeeSlice";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Table from "./components/Table";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewEmployeeModal = () => {
    dispatch(
      openModal({
        title: "Add New Employee",
        bodyType: MODAL_BODY_TYPES.EMPLOYEE_ADD_NEW,
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

function EmployeeManagement() {
  const dispatch = useDispatch();
  const fetchEmployees = useSelector((state) => state.employee.employees);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    dispatch(getEmployeesContent());
  }, []);

  console.log(fetchEmployees);

  // useEffect(() => {
  //   setEmployees(fetchEmployees);
  // }, [fetchEmployees]);

  const deleteEmployee = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this employee?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.EMPLOYEE_DELETE,
          _id: id,
          toastMsg: "Employee Deleted!",
        },
      })
    );
  };

  const editEmployee = (id) => {
    const selectedEmp = fetchEmployees.filter((e) => e._id === id);

    dispatch(
      openModal({
        title: "Edit Employee",
        bodyType: MODAL_BODY_TYPES.EMPLOYEE_ADD_NEW,
        extraObject: selectedEmp,
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
          {fetchEmployees.length === 0 ? (
            <h1 className="font-semibold text-center">
              No data available, Please add an employee
            </h1>
          ) : (
            <Table
              tableHeader={["Name", "Nic", "Address", "Salary", "Actions"]}
              tableBody={fetchEmployees}
              editEmp={editEmployee}
              deleteEmp={deleteEmployee}
              showAction={true}
            />
          )}
        </div>
      </TitleCard>
    </>
  );
}

export default EmployeeManagement;
