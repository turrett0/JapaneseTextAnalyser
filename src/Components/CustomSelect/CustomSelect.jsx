import {useContext} from "react";
import SearchContext from "../../Context/SearchContext/SearchContext";
import "./CustomSelect.scss";

function CustomSelect() {
  const {searchSelectHandler} = useContext(SearchContext);

  const selectHandler = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="filter-select">
      <select
        name="filter-words"
        className="filter-select"
        onChange={(e) => searchSelectHandler(e.target.value)}
      >
        <option value="default">default</option>
        <option value="名詞">noun</option>
        <option value="動詞">verb</option>
        <option value="形容詞">adjective</option>
        <option value="福祉">adverb</option>
      </select>
    </div>
  );
}

export default CustomSelect;
