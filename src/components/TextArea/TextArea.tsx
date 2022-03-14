import "./TextArea.scss";
import debounce from "lodash.debounce";
import React, {useEffect, useRef, useState} from "react";
import useActions from "../../hooks/useActions";
import {useSelector} from "react-redux";
import {selectCurrentText} from "../../store/kuromojiReducer/contracts/selectors";

const TextArea: React.FC<any> = ({...props}) => {
  const {FetchKuromojiAction, SetCurrentText} = useActions();
  const currentText = useSelector(selectCurrentText);
  const [textAreaValue, setCurrentText] = useState<string>(currentText);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(
        textAreaRef.current.value.length,
        textAreaRef.current.value.length
      );
    }
  }, []);
  const onSubmitHandler = debounce(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (textAreaValue.trim() !== e.target.value.trim()) {
        FetchKuromojiAction(e.target.value);
        SetCurrentText(e.target.value);
      }
    },
    3000
  );
  return (
    <textarea
      onChange={(e) => {
        onSubmitHandler(e);
        setCurrentText(e.target.value);
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
