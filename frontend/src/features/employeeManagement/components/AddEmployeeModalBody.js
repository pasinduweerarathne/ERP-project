import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewEmployee } from "../employeeSlice";

const INITIAL_EMPLOYEE_OBJ = {
  first_name: "",
  last_name: "",
};

function AddEmployeeModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [employeeObj, setEmployeeObj] = useState(INITIAL_EMPLOYEE_OBJ);

  const saveNewEmployee = () => {
    if (employeeObj.first_name.trim() === "")
      return setErrorMessage("First Name is required!");
    else {
      let newEmployeeObj = {
        id: 7,
        first_name: employeeObj.first_name,
        last_name: employeeObj.last_name,
        avatar: "https://reqres.in/img/faces/1-image.jpg",
      };
      dispatch(addNewEmployee({ newEmployeeObj }));
      dispatch(showNotification({ message: "New Employee Added!", status: 1 }));
      closeModal();
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
        defaultValue={employeeObj.first_name}
        updateType="first_name"
        containerStyle="mt-4"
        labelTitle="First Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={employeeObj.last_name}
        updateType="last_name"
        containerStyle="mt-4"
        labelTitle="Last Name"
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
          Save
        </button>
      </div>
    </>
  );
}

export default AddEmployeeModalBody;
