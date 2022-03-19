import React, {useRef, useState} from "react";
import "./AnalysisWord.scss";
import {IKuromojiArticle} from "../../store/kuromojiReducer/contracts/state";
import WordPopup from "../../components/WordPopup/WordPopup";
import {isKana, isKanji} from "wanakana";

interface Props {
  currentWord: IKuromojiArticle;
  showFurigana?: boolean;
}

const AnalysisWord: React.FC<Props> = ({currentWord, showFurigana = false}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const wordRef = useRef<HTMLDivElement>(null);

  const getKanjiFurigana = (letter: string): string => {
    let a: IKuromojiArticle | null = currentWord.furigana.find(
      (item: IKuromojiArticle["furigana"]) => {
        if (item.kanji === letter) {
          return item.kanji;
        }
      }
    );
    if (a) {
      return a.furigana;
    }

    return "";
  };

  return (
    <div
      className={`word ${currentWord.engPos}`}
      ref={wordRef}
      onClick={() => {
        console.log(currentWord);
        currentWord.pos !== "記号" && setVisible(true);
        visible && setVisible(false);
      }}
      onMouseLeave={() => setVisible(false)}
    >
      <span className="testAfter-wrapper">
        <p
          className={`testAfter ${
            currentWord.warodai.length > 0 ? currentWord.engPos : ""
          } ${visible && currentWord.warodai.length > 0 ? "visible" : ""}`}
        >
          <span className="testAfter">
            {currentWord.surface_form.split("").map((item, i) => {
              if (isKana(item)) {
                return <span>{item}</span>;
              } else if (isKanji(item)) {
                return (
                  <span>
                    {showFurigana && (
                      <span className={`furigana-wrapper show`}>
                        <span className="furigana">
                          {currentWord.furigana &&
                            currentWord.furigana?.length > 0 &&
                            getKanjiFurigana(item)}
                        </span>
                      </span>
                    )}
                    {item}
                  </span>
                );
              }
              return currentWord.surface_form;
            })}
          </span>
        </p>
      </span>

      <WordPopup
        visible={visible}
        wordRef={wordRef}
        currentArticle={currentWord}
        role={"popup"}
      />
    </div>
  );
};

export default AnalysisWord;
