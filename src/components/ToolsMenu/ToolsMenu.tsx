import React from "react";
import "./ToolsMenu.scss";
import {useSelector} from "react-redux";
import useActions from "../../hooks/useActions";
import {
  selectKuromojiFilteredResponse,
  selectKuromojiLoading,
  selectPageMode,
  selectRawKuromojiResponse,
} from "../../store/kuromojiReducer/contracts/selectors";
import {
  LoadingStates,
  PageMode,
} from "../../store/kuromojiReducer/contracts/state";
import Spinner from "../../assets/spinner.gif";
import {csvPrepare} from "../../services/csvExport/csvExport";
import {AiFillSave, AiOutlineDownload} from "react-icons/ai";
import {AiFillEdit} from "react-icons/ai";
import {CgCardSpades} from "react-icons/cg";
import {MdTextFormat} from "react-icons/md";
import FuriganaIcon from "../../assets/furigana.svg";

type Props = {
  setShowFurigana: React.Dispatch<React.SetStateAction<boolean>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  showFurigana: boolean;
  editMode: boolean;
  currentText: string;
};

const ToolsMenu: React.FC<Props> = ({
  setShowFurigana,
  editMode,
  setEditMode,
  showFurigana,
  currentText,
}) => {
  const {SetPageMode} = useActions();
  const currentPageMode = useSelector(selectPageMode);
  const loading = useSelector(selectKuromojiLoading);
  const kuromojiResponse = useSelector(selectKuromojiFilteredResponse);

  return (
    <div className="tools-menu">
      <button
        className="tool-item button"
        onClick={() => {
          const promptResponse = prompt("Введите имя колоды", "New deck");
          if (promptResponse) {
            csvPrepare(kuromojiResponse, promptResponse);
          }
        }}
      >
        <AiOutlineDownload />
      </button>
      <label
        className={`tool-item ${showFurigana ? "active" : ""} ${
          editMode || currentPageMode === PageMode.CARDS ? "disabled" : ""
        }`}
      >
        <input
          disabled={editMode}
          type="checkbox"
          checked={showFurigana}
          onChange={() => setShowFurigana((prev) => !prev)}
        />
        <img
          src={FuriganaIcon}
          alt=""
          style={{
            width: "20px",
            height: "20px",
            display: "block",
          }}
        />
      </label>

      <label
        className={`tool-item ${
          currentPageMode === PageMode.FULLTEXT ? "active" : ""
        }  ${editMode ? "disabled" : ""}`}
      >
        <MdTextFormat />
        <input
          disabled={editMode}
          type="radio"
          name="mode-choice"
          checked={currentPageMode === PageMode.FULLTEXT}
          onChange={(e) => SetPageMode(PageMode.FULLTEXT)}
        />
      </label>
      <label
        className={`tool-item ${
          currentPageMode === PageMode.CARDS ? "active" : ""
        }  ${editMode ? "disabled" : ""}`}
      >
        <CgCardSpades />
        <input
          disabled={editMode}
          type="radio"
          name="mode-choice"
          checked={currentPageMode === PageMode.CARDS}
          onChange={(e) => SetPageMode(PageMode.CARDS)}
        />
      </label>

      <button
        className="tool-item button"
        disabled={currentText.length === 0 || loading === LoadingStates.LOADING}
        onClick={() => {
          if (currentText.trim().length === 0) {
            alert("Напишите что-нибудь");
          } else {
            setEditMode((prev) => !prev);
          }
        }}
      >
        {loading === LoadingStates.LOADING ? (
          <img
            src={Spinner}
            alt=""
            style={{
              width: "12px",
              height: "12px",
            }}
          />
        ) : !editMode ? (
          <AiFillEdit />
        ) : (
          <AiFillSave />
        )}
      </button>
    </div>
  );
};

export default ToolsMenu;
