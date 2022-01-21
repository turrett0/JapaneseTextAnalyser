import React from "react";
import "./CustomForm.scss";
import { useRef, useContext } from "react";
import SearchContext from "../../Context/SearchContext/SearchContext";
import { MdOutlineCancel as CancelIcon } from "react-icons/md";
import CustomSelect from "../CustomSelect/CustomSelect";
import debounce from "lodash.debounce";
import {ReactComponent as Spinner} from '../../assets/spinner.gif'

function CustomForm() {
  const { kuromojiDBrequest, filteredWords,loading,setLoading } = useContext(SearchContext);
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    kuromojiDBrequest(inputRef.current.value);
  };

  const debouncedCallback = debounce(handleSubmit, 500);

  return (
    <div className="main-input">
      <form>
        <CancelIcon className="cancelButton" onClick={()=> inputRef.current.value = ''} />
        <textarea
          onChange={(e)=> {debouncedCallback(e); setLoading(true)}}
          ref={inputRef}
          name="submitTextArea"
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
    </div>
  );
}

export default CustomForm;
