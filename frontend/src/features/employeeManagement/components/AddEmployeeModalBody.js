import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import {
  addEmployee,
  addNewEmployee,
  editEmployee,
  getEmployeesContent,
} from "../employeeSlice";

function AddEmployeeModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [employeeObj, setEmployeeObj] = useState({
    name: extraObject ? extraObject[0].name : "",
    nic: extraObject ? extraObject[0].nic : "",
    address: extraObject ? extraObject[0].address : "",
    salary: extraObject ? extraObject[0].salary : null,
  });

  const saveNewEmployee = () => {
    if (employeeObj.name.trim() === "")
      return setErrorMessage("First Name is required!");
    else {
      if (!extraObject) {
        dispatch(addEmployee(employeeObj));
        dispatch(
          showNotification({ message: "New Employee Added!", status: 1 })
        );
        closeModal();
      } else {
        dispatch(editEmployee({ ...employeeObj, _id: extraObject[0]._id }));
        dispatch(showNotification({ message: "Employee Updated!", status: 1 }));
        closeModal();
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setEmployeeObj({ ...employeeObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={employeeObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={employeeObj.nic}
        updateType="nic"
        containerStyle="mt-4"
        labelTitle="NIC"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={employeeObj.address}
        updateType="address"
        containerStyle="mt-4"
        labelTitle="Address"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="number"
        defaultValue={employeeObj.salary}
        updateType="salary"
        containerStyle="mt-4"
        labelTitle="Salary"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveNewEmployee()}
        >
          {extraObject ? "Update" : "Save"}
        </button>
      </div>
    </>
  );
}

export default AddEmployeeModalBody;
