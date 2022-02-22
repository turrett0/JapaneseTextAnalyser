import React from "react";
import "./CustomForm.scss";
import {useRef, useContext} from "react";
import SearchContext from "../../Context/SearchContext/SearchContext";
import {MdOutlineCancel as CancelIcon} from "react-icons/md";
import debounce from "lodash.debounce";
import {exportToCsv} from "../../csvExport";

function CustomForm() {
  const {
    kuromojiDBrequest,
    filteredWords,
    setLoading,
    setkuromojiResponse,
    kuromojiResponse,
  } = useContext(SearchContext);
  const inputRef = useRef("");

  const csvPrepare = () => {
    let rows = [];

    kuromojiResponse.forEach((item) => {
      rows.push([
        item.basic_form,
        item.reading,
        item.meaning,
        item.derivatives,
        item.phrases,
      ]);
    });
    return rows;
  };

  const onSubmitHandler = debounce((e) => {
    kuromojiDBrequest(inputRef.current.value);
  }, 1000);

  return (
    <div className="main-input">
      <form>
        <CancelIcon
          className="cancelButton"
          onClick={() => {
            inputRef.current.value = "";
            setkuromojiResponse([]);
          }}
        />
        <textarea
          onChange={() => {
            setLoading(true);
            onSubmitHandler();
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
