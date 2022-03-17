import React, {useRef, useState} from "react";
import "./AnalysisWord.scss";
import {IKuromojiArticle} from "../../store/kuromojiReducer/contracts/state";
import WordPopup from "../../components/WordPopup/WordPopup";
import {isKana, isKanji} from "wanakana";

interface Props {
  kuromojiArticle: IKuromojiArticle;
  showFurigana?: boolean;
}

const AnalysisWord: React.FC<Props> = ({
  kuromojiArticle,
  showFurigana = false,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const wordRef = useRef<HTMLDivElement>(null);

  const getKanjiFurigana = (letter: string): string => {
    let a = kuromojiArticle.furigana.find(
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
      className={`word ${kuromojiArticle.engPos}`}
      ref={wordRef}
      onClick={() => {
        kuromojiArticle.pos !== "記号" && setVisible(true);
        visible && setVisible(false);
      }}
      onMouseLeave={() => setVisible(false)}
    >
      <span className="testAfter-wrapper">
        <p
          className={`testAfter ${
            kuromojiArticle.warodai.length > 0 ? kuromojiArticle.engPos : ""
          } ${visible && kuromojiArticle.warodai.length > 0 ? "visible" : ""}`}
        >
          <span className="testAfter">
            {kuromojiArticle.surface_form.split("").map((item, i) => {
              if (isKana(item)) {
                return <span>{item}</span>;
              } else if (isKanji(item)) {
                return (
                  <span>
                    {showFurigana && (
                      <span className={`furigana-wrapper show`}>
                        <span className="furigana">
                          {kuromojiArticle.furigana &&
                            kuromojiArticle.furigana?.length > 0 &&
                            getKanjiFurigana(item)}
                        </span>
                      </span>
                    )}
                    {item}
                  </span>
                );
              }
              return null;
            })}
          </span>
        </p>
      </span>

      <WordPopup
        visible={visible}
        wordRef={wordRef}
        currentArticle={kuromojiArticle}
        role={"popup"}
      />
    </div>
  );
};

export default AnalysisWord;
