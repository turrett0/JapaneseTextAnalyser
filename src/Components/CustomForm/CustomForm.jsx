import React from "react";
import "./CustomForm.scss";
import {useRef, useContext} from "react";
import SearchContext from "../../Context/SearchContext/SearchContext";
import {MdOutlineCancel as CancelIcon} from "react-icons/md";
import CustomSelect from "../CustomSelect/CustomSelect";
import debounce from "lodash.debounce";
import {ReactComponent as Spinner} from "../../assets/spinner.gif";
import {exportToCsv} from "../../csvExport";

function CustomForm() {
  const {
    kuromojiDBrequest,
    filteredWords,
    loading,
    setLoading,
    setfilteredWords,
  } = useContext(SearchContext);
  const inputRef = useRef();

  const csvPrepare = () => {
    let rows = [];

    filteredWords.forEach((item) => {
      rows.push([item.basic_form, item.reading, item.meaning]);
    });
    return rows;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    kuromojiDBrequest(inputRef.current.value);
  };

  const debouncedCallback = debounce(handleSubmit, 1000);

  return (
    <div className="main-input">
      <form>
        <CancelIcon
          className="cancelButton"
          onClick={() => {
            inputRef.current.value = "";
            setfilteredWords([]);
          }}
        />
        <textarea
          onChange={(e) => {
            debouncedCallback(e);
            setLoading(true);
          }}
          ref={inputRef}
          id="text"
          placeholder="Search..."
          className="search__input"
          type="text"
          name="SearchInput"
        ></textarea>
      </form>
      <div className="main-input__info">
        Length: {filteredWords.length} words
      </div>
      <button
        style={{padding: "10px 20px"}}
        onClick={() => exportToCsv("deck", csvPrepare())}
      >
        CSV
      </button>
    </div>
  );
}

export default CustomForm;
