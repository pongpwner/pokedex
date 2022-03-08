import "./drop-down-list.styles.scss";
import React from "react";

const DropDownList = ({ options, onChange }) => (
  <select onChange={onChange} className="drop-down-list">
    {options &&
      options.map((option) => (
        <option name={option.name} key={option.name} value={option.url}>
          {option.name}
        </option>
      ))}
  </select>
);

export default DropDownList;
