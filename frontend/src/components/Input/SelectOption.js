import React, { useState } from "react";

const SelectOption = ({ value, setValue, options, label }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={`form-control w-full mt-4`}>
      <label className="label">
        <span className={"label-text text-base-content"}>{label}</span>
      </label>

      <select
        className="input input-bordered w-full "
        value={value}
        onChange={handleChange}
      >
        <option>--select--</option>
        {options?.map((o) => (
          <option value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectOption;
