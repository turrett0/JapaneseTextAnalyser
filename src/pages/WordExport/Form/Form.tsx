import React from "react";
import "./Form.scss";

import {MdOutlineCancel as CancelIcon} from "react-icons/md";
import {useSelector} from "react-redux";
import {csvPrepare} from "../../../services/csvExport/csvExport";
import {selectKuromojiFilteredResponse} from "../../../store/kuromojiReducer/contracts/selectors";
import TextArea from "../../../components/TextArea/TextArea";
import useActions from "../../../hooks/useActions";

const CustomForm: React.FC = (): React.ReactElement => {
  const {SetCurrentText, SetKuromojiResponseAction} = useActions();
  const kuromojiResponse = useSelector(selectKuromojiFilteredResponse);

  return (
    <div className="main-input">
      <form
        style={{
          width: "95%",
        }}
      >
        <CancelIcon
          className="cancelButton"
          onClick={() => {
            SetKuromojiResponseAction([]);
            SetCurrentText("");
          }}
        />
        <div className="form-wrapper">
          <TextArea placeholder="Поиск..." />
        </div>
      </form>
      {kuromojiResponse.length > 0 && (
        <div className="main-input__info">
          <p>
            {kuromojiResponse.length}{" "}
            {kuromojiResponse.length < 2 ? "слово" : "слов"}
          </p>
          <button
            onClick={() => {
              const promptResponse = prompt("Введите имя колоды", "New deck");
              if (promptResponse) {
                csvPrepare(kuromojiResponse, promptResponse);
              }
            }}
          >
            Экспорт
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomForm;
