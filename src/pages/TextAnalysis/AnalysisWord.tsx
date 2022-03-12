import React, {useState} from "react";
import "./AnalysisWord.scss";
import {IKuromojiArticle} from "../../store/kuromojiReducer/contracts/state";
import {isKana} from "wanakana";

interface Props {
  kuromojiArticle: IKuromojiArticle;
  showFurigana: boolean;
}

const AnalysisWord: React.FC<Props> = ({
  kuromojiArticle,
  showFurigana = false,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div
      className={`word ${kuromojiArticle.engPos}`}
      onMouseOver={() => {
        setVisible(true);
        console.log(kuromojiArticle);
      }}
      onMouseLeave={() => setVisible(false)}
    >
      {visible && (
        <div className={`word-card visible`}>
          <div className="word-card__inner">
            <span>{kuromojiArticle.surface_form}</span>
            {!isKana(kuromojiArticle.basic_form) && (
              <span>
                [ {kuromojiArticle.basic_form} ]:
                {kuromojiArticle.defaultReading}
              </span>
            )}
            <span
              style={{
                textAlign: "center",
              }}
            >
              {kuromojiArticle.warodai[0]?.meanings[0]?.split(";")[0]}
            </span>
            <span>
              {kuromojiArticle.pos} | {kuromojiArticle.engPos?.toUpperCase()}
            </span>
          </div>
        </div>
      )}
      <li className="word">
        {!isKana(kuromojiArticle.surface_form) && (
          <span
            className={`furigana-wrapper ${showFurigana ? "show" : "hidden"}`}
          >
            <span
              className={`furigana ${
                kuromojiArticle.kanjiCount && kuromojiArticle.kanjiCount >= 2
                  ? ""
                  : ""
              }`}
            >
              {kuromojiArticle.furigana}
            </span>
          </span>
        )}
        <span className="testAfter-wrapper">
          <p
            className={`testAfter ${kuromojiArticle.engPos} ${
              visible ? "visible" : ""
            }`}
          >
            {kuromojiArticle.surface_form}
          </p>
        </span>
      </li>
    </div>
  );
};

export default AnalysisWord;
