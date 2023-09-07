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
  const [employeeObj, setEmployeeObj] = useState({
    name: extraObject ? extraObject[0].name : "",
    nic: extraObject ? extraObject[0].nic : "",
    address: extraObject ? extraObject[0].address : "",
    salary: extraObject ? extraObject[0].salary : "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    nic: "",
    address: "",
    salary: "",
  });
  let hasErrors = false;

  const saveNewEmployee = () => {
    const newFormErrors = {};

    if (employeeObj.name.trim() === "") {
      newFormErrors.name = "Name is required";
      hasErrors = true;
    }
    if (employeeObj.nic.trim() === "") {
      newFormErrors.nic = "NIC is required";
      hasErrors = true;
    }
    if (employeeObj.address.trim() === "") {
      newFormErrors.address = "Address is required";
      hasErrors = true;
    }
    if (employeeObj.salary.trim() === "") {
      newFormErrors.salary = "Salary is required";
      hasErrors = true;
    } else if (isNaN(employeeObj.salary)) {
      newFormErrors.age = "Salary must be a number";
      hasErrors = true;
    }

    // Update errors and handle form submission
    if (hasErrors) {
      setFormErrors(newFormErrors);
    } else {
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
    if (updateType === "name") {
      setFormErrors({ ...formErrors, name: "" });
    }
    if (updateType === "nic") {
      setFormErrors({ ...formErrors, nic: "" });
    }
    if (updateType === "address") {
      setFormErrors({ ...formErrors, address: "" });
    }
    if (updateType === "salary") {
      setFormErrors({ ...formErrors, salary: "" });
    }
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
      <ErrorText styleClass="mt-5">{formErrors.name}</ErrorText>
      <InputText
        type="text"
        defaultValue={employeeObj.nic}
        updateType="nic"
        containerStyle="mt-4"
        labelTitle="NIC"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="mt-5">{formErrors.nic}</ErrorText>
      <InputText
        type="text"
        defaultValue={employeeObj.address}
        updateType="address"
        containerStyle="mt-4"
        labelTitle="Address"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="mt-5">{formErrors.address}</ErrorText>
      <InputText
        type="number"
        defaultValue={employeeObj.salary}
        updateType="salary"
        containerStyle="mt-4"
        labelTitle="Salary"
        updateFormValue={updateFormValue}
      />
      <ErrorText styleClass="mt-5">{formErrors.salary}</ErrorText>

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
