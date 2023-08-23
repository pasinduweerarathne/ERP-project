import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addZoneDetails } from "../productSlice";

const INITIAL_ZONE_DETAILS_OBJ = {
  name: "",
  description: "",
};

function AddZoneDetailsModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [zoneDetailsObj, setEmployeeObj] = useState(INITIAL_ZONE_DETAILS_OBJ);

  const saveZoneDetails = () => {
    if (zoneDetailsObj.name.trim() === "")
      return setErrorMessage("First Name is required!");
    else {
      let newZoneDetailsObj = {
        name: zoneDetailsObj.name,
        description: zoneDetailsObj.description,
        type: "expense",
        date: "1st Jan 2023",
      };
      dispatch(addZoneDetails({ newZoneDetailsObj }));
      dispatch(showNotification({ message: "Zone details added!", status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setEmployeeObj({ ...zoneDetailsObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={zoneDetailsObj.name}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={zoneDetailsObj.description}
        updateType="description"
        containerStyle="mt-4"
        labelTitle="Description"
        updateFormValue={updateFormValue}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => saveZoneDetails()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddZoneDetailsModalBody;
