import "./TextArea.scss";
import React, {useCallback, useEffect, useRef, useState} from "react";
import useActions from "../../hooks/useActions";
import {useSelector} from "react-redux";
import {selectCurrentText} from "../../store/kuromojiReducer/contracts/selectors";
import _ from "lodash";

const TextArea: React.FC<any> = ({...props}) => {
  const {FetchKuromojiAction, SetCurrentText} = useActions();
  const currentText = useSelector(selectCurrentText);
  const [textAreaValue, setTextAreaValue] = useState<string>(currentText);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const debounce = useCallback(
    _.debounce((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (textAreaValue.trim() !== e.target.value.trim()) {
        FetchKuromojiAction(e.target.value);
        SetCurrentText(e.target.value);
      }
    }, 1000),
    []
  );
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(
        textAreaRef.current.value.length,
        textAreaRef.current.value.length
      );
    }
  }, []);

  return (
    <textarea
      onChange={(e) => {
        setTextAreaValue(e.target.value);
        debounce(e);
      }}
      id="custom__text-area"
      className="search__input"
      name="SearchInput"
      value={textAreaValue}
      ref={textAreaRef}
      placeholder="Search..."
      {...props}
    />
  );
};

export default TextArea;
