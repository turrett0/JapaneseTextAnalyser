import React from "react";
import "./CustomForm.scss";
import { useRef, useContext } from "react";
import SearchContext from "../../Context/SearchContext/SearchContext";
import { AiOutlineSearch as SearchIcon } from "react-icons/ai";
import { MdOutlineCancel as CancelIcon } from "react-icons/md";
import CustomSelect from "../CustomSelect/CustomSelect";

function CustomForm() {
  const { kuromojiDBrequest, filteredWords } = useContext(SearchContext);
  const inputRef = useRef();

  const handleSubmit = (e) => {
    inputRef.current.value == "" && alert("Please, type something...");
    e.preventDefault();
    kuromojiDBrequest(inputRef.current.value);
  };

  return (
    <div className="search-component">
      <div className="search__input-wrapper">
        <form onSubmit={handleSubmit}>
          <button className="search__input-button" type="submit">
            <SearchIcon />
          </button>
          <input
            placeholder="Search..."
            className="search__input"
            type="text"
            name="SearchInput"
            ref={inputRef}
          />
        </form>
        <button
          className="search__input-cancel"
          onClick={() => (inputRef.current.value = "")}
        >
          <CancelIcon />
        </button>
      </div>
      <CustomSelect />
    </div>
  );
}

export default CustomForm;
