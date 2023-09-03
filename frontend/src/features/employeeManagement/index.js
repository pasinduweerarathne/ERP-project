import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import { showNotification } from "../common/headerSlice";
import { CURRENT_EMPLOYEES } from "../../utils/dummyData";
import { getEmployeesContent } from "./employeeSlice";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

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
  const [employees, setEmployees] = useState(fetchEmployees);

  useEffect(() => {
    dispatch(getEmployeesContent());
  }, []);

  useEffect(() => {
    setEmployees(fetchEmployees);
  }, [fetchEmployees]);

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
    const selectedEmp = employees.filter((e) => e._id === id);

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
        title="Current Employee"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>NIC</th>
                <th>Address</th>
                <th>Salary</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((e) => {
                return (
                  <tr key={e._id}>
                    <td>{e.name}</td>
                    <td>{e.nic}</td>
                    <td>{e.address}</td>
                    <td>{e.salary}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteEmployee(e._id)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                      <button
                        className="mr-4 btn btn-square btn-ghost"
                        onClick={() => editEmployee(e._id)}
                      >
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default EmployeeManagement;
