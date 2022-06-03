import React, {useRef, useState} from "react";
import "./AnalysisWord.scss";
import {IKuromojiArticle} from "../../../store/kuromojiReducer/contracts/state";
import WordPopup from "../../../components/WordPopup/WordPopup";
import {isKanji} from "wanakana";
import Furigana from "../../../components/furigana/Furigana";
import {v4 as uuid} from "uuid";

interface Props {
  currentWord: IKuromojiArticle;
  showFurigana?: boolean;
}

const AnalysisWord: React.FC<Props> = ({currentWord, showFurigana = false}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [popupVisible, setPopUpVisible] = useState<boolean>(false);
  const wordRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`word ${currentWord.engPos}`}
      ref={wordRef}
      onClick={() => {
        console.log(visible);
        currentWord.pos !== "記号" && setPopUpVisible(true);
      }}
      onMouseLeave={() => setPopUpVisible(false)}
    >
      <span className="analysis-word-wrapper">
        <p
          className={`analysis-word ${
            currentWord.warodai.length > 0 ? currentWord.engPos : ""
          } ${visible && currentWord.warodai.length > 0 ? "visible" : ""}`}
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
      </span>

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
