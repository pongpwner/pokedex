import "./drop-down-list.styles.scss";
import React from "react";

const DropDownList = ({ options, onChange }) => (
  <select onChange={onChange} className="drop-down-list">
    {options &&
      options.map((option, idx) => (
        <option name={option.name} key={idx + 1} value={idx + 1}>
          {option.name}
        </option>
      ))}
  </select>
);

export default DropDownList;
