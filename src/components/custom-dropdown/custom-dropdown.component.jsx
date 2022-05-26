import React from "react";

const CustomDropdown = ({ list, label, listname, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <select onChange={(e) => onChange(e.target.value)} id={listname}>
        {list.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
export default CustomDropdown;
