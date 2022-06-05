import React, {useRef, useState} from "react";
import "./AnalysisWord.scss";
import {IKuromojiArticle} from "../../store/kuromojiReducer/contracts/state";
import WordPopup from "../WordPopup/WordPopup";
import {isKanji} from "wanakana";
import Furigana from "../furigana/Furigana";
import {v4 as uuid} from "uuid";

interface Props {
  currentWord: IKuromojiArticle;
  showFurigana?: boolean;
}

const AnalysisWord: React.FC<Props> = ({currentWord, showFurigana = false}) => {
  const [popupVisible, setPopUpVisible] = useState<boolean>(false);
  const wordRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`word ${currentWord.engPos}`}
      ref={wordRef}
      onClick={() => {
        currentWord.pos !== "記号" && setPopUpVisible(true);
      }}
      onMouseLeave={() => setPopUpVisible(false)}
    >
      <p
        className={`analysis-word ${
          currentWord.warodai.length > 0 ? currentWord.engPos : ""
        }`}
      >
        <span className="analysis-word">
          {showFurigana
            ? currentWord.surface_form.split("").map((letter, i) => {
                if (isKanji(letter)) {
                  return (
                    <span key={uuid()}>
                      {showFurigana && (
                        <Furigana letter={letter} currentWord={currentWord} />
                      )}
                      {letter}
                    </span>
                  );
                } else {
                  return <span key={uuid()}>{letter}</span>;
                }
              })
            : currentWord.surface_form}
        </span>
      </p>

      <WordPopup
        visible={popupVisible}
        setVisible={setPopUpVisible}
        wordRef={wordRef}
        currentArticle={currentWord}
        role={"popup"}
      />
    </div>
  );
};

export default AnalysisWord;
