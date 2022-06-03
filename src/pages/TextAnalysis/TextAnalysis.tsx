import React, {useEffect, useState} from "react";
import "./TextAnalysis.scss";
import {useSelector} from "react-redux";
import AnalysisWord from "./TextAnalysisWord/AnalysisWord";
import {v4 as uuid} from "uuid";
import _ from "underscore";
import TextArea from "../../components/TextArea/TextArea";
import ToolsMenu from "../../components/ToolsMenu/ToolsMenu";
import {
  selectCurrentText,
  selectKuromojidResponseWithEngPos,
  selectKuromojiLoading,
  selectPageMode,
} from "../../store/kuromojiReducer/contracts/selectors";
import {
  IKuromojiArticle,
  LoadingStates,
  PageMode,
} from "../../store/kuromojiReducer/contracts/state";
import WordCards from "../../components/WordCards/WordCards";

const TextAnalysis: React.FC = () => {
  const loading = useSelector(selectKuromojiLoading);
  const [showFurigana, setShowFurigana] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const currentText = useSelector(selectCurrentText);
  const pageMode = useSelector(selectPageMode);
  const loadingState = useSelector(selectKuromojiLoading);
  const kuromojiArticles = useSelector(
    selectKuromojidResponseWithEngPos,
    _.isEqual
  );

  const keyHandler = (e: KeyboardEvent) => {
    if (
      currentText.trim().length > 0 &&
      loading === LoadingStates.LOADED &&
      editMode &&
      e.ctrlKey &&
      e.key.toLowerCase() === "s"
    ) {
      setEditMode(false);
    }
  };

  useEffect(() => {
    if (currentText.length === 0) setEditMode(true);

    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  });

  return (
    //Menu above words
    <div className="analysis__words">
      <ToolsMenu
        showFurigana={showFurigana}
        setShowFurigana={setShowFurigana}
        editMode={editMode}
        setEditMode={setEditMode}
        currentText={currentText}
      />
      <div
        className={`words ${
          editMode || currentText.length === 0 ? "edit" : ""
        } ${pageMode}`}
        // onDoubleClick={() =>
        //   !editMode && pageMode === PageMode.FULLTEXT && setEditMode(true)
        // }
      >
        {editMode || currentText.length === 0 ? (
          <div className="analysis__form__wrapper">
            <TextArea placeholder="Напишите что-нибудь..." />
          </div>
        ) : pageMode === PageMode.FULLTEXT ? (
          kuromojiArticles.map((kuromojiArticle: IKuromojiArticle) => (
            <AnalysisWord
              key={uuid()}
              currentWord={kuromojiArticle}
              showFurigana={showFurigana}
            />
          ))
        ) : (
          <WordCards />
        )}
      </div>
    </div>
  );
};

export default TextAnalysis;
