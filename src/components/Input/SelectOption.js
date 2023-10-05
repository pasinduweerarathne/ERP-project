import React, { useState } from "react";

const SelectOption = ({
  label,
  id,
  defaultValue,
  options,
  updateType,
  updateFormValue,
}) => {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`form-control w-full mt-4`}>
      <label htmlFor={id} className="label">
        <span className={"label-text text-base-content"}>{label}</span>
      </label>

      <select
        id={id}
        className="input input-bordered w-full "
        value={value}
        onChange={(e) => updateInputValue(e.target.value)}
      >
        <option value=""></option>
        {options?.map((emp, i) => (
          <option key={i} value={emp.value}>
            {emp.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOption;
