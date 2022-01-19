import React from "react";
import "./CustomSelect.scss";

function CustomSelect() {
  return (
    <div className="filter-select">
      <select name="filter-words" className="filter-select">
        <option value="default">Default</option>
        <option value="noun">名詞</option>
        <option value="verb">動詞</option>
        <option value="adjective">形容詞</option>
      </select>
    </div>
  );
}

export default CustomSelect;
