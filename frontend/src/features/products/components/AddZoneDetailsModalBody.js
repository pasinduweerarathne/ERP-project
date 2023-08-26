import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../components/Input/InputText";
import SelectOption from "../../../components/Input/SelectOption";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addZoneDetails } from "../productSlice";

const selectOptionValues = {
  type: ["Expense", "Income"],
  employeeList: ["John", "Kamal", "Kalana", "Shown"],
  resourse: ["Factory 1", "Factory 2"],
};

function AddZoneDetailsModalBody({ closeModal }) {
  const [type, setType] = useState("Expense");
  const [empName, setEmpName] = useState("");
  const [resource, setResource] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [zoneDetailsObj, setZoneDetailsObj] = useState({
    description: "",
    type,
    empName,
    resource,
  });
  const data = useSelector((state) => state.product.zoneDetails);

  useEffect(() => {
    setErrorMessage("");
  }, [empName, type]);

  const saveZoneDetails = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${month}/${day}/${year}`;

    if (type === "Expense") {
      if (
        empName !== "" &&
        empName !== "--select--" &&
        zoneDetailsObj.description !== ""
      ) {
        let newZoneDetailsObj = {
          id: data.length + 1,
          name: empName,
          description: zoneDetailsObj.description,
          type,
          date: formattedDate,
        };
        dispatch(addZoneDetails({ newZoneDetailsObj }));
        dispatch(
          showNotification({ message: "Zone details added!", status: 1 })
        );
        closeModal();
      } else {
        if (empName === "" || empName === "--select--") {
          return setErrorMessage("Employee name is empty!");
        } else if (zoneDetailsObj.description === "") {
          return setErrorMessage("Description is empty!");
        }
      }
    } else {
      if (type === "--select--") return setErrorMessage("Select a type");
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setZoneDetailsObj({ ...zoneDetailsObj, [updateType]: value });
  };

  return (
    <>
      <SelectOption
        value={type}
        setValue={setType}
        options={selectOptionValues.type}
        label="Expense / Income"
      />

      {type === "Income" && (
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
      )}

      {type === "Expense" && (
        <>
          <SelectOption
            value={empName}
            setValue={setEmpName}
            options={selectOptionValues.employeeList}
            label="Name"
          />

          <TextAreaInput
            type="text"
            defaultValue={zoneDetailsObj.description}
            updateType="description"
            containerStyle="mt-4"
            labelTitle="Description"
            updateFormValue={updateFormValue}
          />
        </>
      )}

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
