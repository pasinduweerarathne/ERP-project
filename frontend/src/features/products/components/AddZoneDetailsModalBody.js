import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import SelectOption from "../../../components/Input/SelectOption";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addZoneDetails, editZoneDetails } from "../productSlice";

const selectOptionValues = {
  type: [
    { text: "Expense", value: "Expense" },
    { text: "Income", value: "Income" },
  ],
  employeeList: [
    { text: "Select", value: "" },
    { text: "Pasindu", value: "Pasindu" },
    { text: "John", value: "John" },
    { text: "Kamal", value: "Kamal" },
    { text: "Kalana", value: "Kalana" },
    { text: "Shown", value: "Shown" },
  ],
  resourse: ["Factory 1", "Factory 2"],
};

function AddZoneDetailsModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: extraObject ? extraObject[0].type : "Expense",
    description: extraObject ? extraObject[0].description : "",
    empName: extraObject ? extraObject[0].empName : "",
    resource: extraObject ? extraObject[0].resource : "",
  });
  const [formErrors, setFormErrors] = useState({
    type: "",
    description: "",
    empName: "",
    resource: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  let hasErrors = false;

  const data = useSelector((state) => state.product.tea.zoneData);

  const saveZoneDetails = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${month}/${day}/${year}`;
    const newFormErrors = {};

    if (formData.empName.trim() === "") {
      newFormErrors.empName = "Name is required";
      hasErrors = true;
    }
    if (formData.description.trim() === "") {
      newFormErrors.description = "Description is required";
      hasErrors = true;
    }

    // Update errors and handle form submission
    if (hasErrors) {
      setFormErrors(newFormErrors);
    } else {
      if (formData.type === "Expense") {
        if (!extraObject) {
          dispatch(addZoneDetails({ ...formData, date: formattedDate }));
          dispatch(
            showNotification({ message: "Zone details added!", status: 1 })
          );
          closeModal();
        } else {
          dispatch(editZoneDetails(formData));
          dispatch(
            showNotification({ message: "Zone details Updated!", status: 1 })
          );
          closeModal();
        }
      }
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    if (updateType === "empName") {
      setFormErrors({ ...formErrors, empName: "" });
    }
    if (updateType === "description") {
      setFormErrors({ ...formErrors, description: "" });
    }
    setFormData({ ...formData, [updateType]: value });
  };

  return (
    <>
      <SelectOption
        label="Expense / Income"
        id="type"
        defaultValue={formData.type}
        options={selectOptionValues.type}
        updateFormValue={updateFormValue}
        updateType="type"
      />

      {/* {type === "Income" && (
        <>
          <SelectOption
            value={resource}
            setValue={setResource}
            options={selectOptionValues.resourse}
            label="Resource"
          />

          <InputText
            type="number"
            defaultValue={zoneDetailsObj.name}
            updateType="amount"
            containerStyle="mt-4"
            labelTitle="Amount"
            updateFormValue={updateFormValue}
          />

          <TextAreaInput
            type="text"
            defaultValue={zoneDetailsObj.name}
            updateType="description"
            containerStyle="mt-4"
            labelTitle="Description"
            updateFormValue={updateFormValue}
          />
        </>
      )} */}

      {formData.type === "Expense" && (
        <>
          <SelectOption
            label="Employee Name"
            id="empName"
            defaultValue={formData.empName}
            options={selectOptionValues.employeeList}
            updateFormValue={updateFormValue}
            updateType="empName"
          />
          <ErrorText styleClass="mt-5">{formErrors.empName}</ErrorText>

          <TextAreaInput
            type="text"
            defaultValue={formData.description}
            updateType="description"
            containerStyle="mt-4"
            labelTitle="Description"
            updateFormValue={updateFormValue}
          />
          <ErrorText styleClass="mt-5">{formErrors.description}</ErrorText>
        </>
      )}

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
