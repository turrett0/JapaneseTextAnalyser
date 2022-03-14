import React, {useRef, useState} from "react";
import "./AnalysisWord.scss";
import {
  IKuromojiArticle,
  IWarodaiArticle,
} from "../../store/kuromojiReducer/contracts/state";

interface Props {
  kuromojiArticle: IKuromojiArticle;
  showFurigana: boolean;
}

const AnalysisWord: React.FC<Props> = ({
  kuromojiArticle,
  showFurigana = false,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const wordPopPup = useRef<HTMLDivElement>(null);
  const isBottom = () => {
    let tmp = "";
    if (wordPopPup.current) {
      if (wordPopPup.current.getBoundingClientRect().left < 400) {
        tmp += "left ";
      }
      if (
        window.innerWidth - wordPopPup.current.getBoundingClientRect().right <
        400
      ) {
        tmp += "right ";
      }
      if (wordPopPup.current.getBoundingClientRect().top <= 380) {
        tmp += "bottom ";
      } else {
        tmp += "top ";
      }
    }
    return tmp;
  };

  return (
    <div
      className={`word ${kuromojiArticle.engPos}`}
      ref={wordPopPup}
      onClick={() => kuromojiArticle.pos !== "記号" && setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <li className="word">
        <span className={`furigana-wrapper show`}>
          <span
            className={`furigana ${
              kuromojiArticle.kanjiCount && kuromojiArticle.kanjiCount >= 2
                ? ""
                : ""
            }`}
          >
            {showFurigana &&
            kuromojiArticle.furigana &&
            kuromojiArticle.furigana?.length > 0
              ? kuromojiArticle.furigana
              : ""}
          </span>
        </span>
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
      {visible && (
        <div className={`word-card visible ${isBottom()} `}>
          <div className="word-card__inner">
            <span className="word-card__dictonary-name">Японский-Русский</span>
            {kuromojiArticle.warodai.length > 1 && (
              <span>{kuromojiArticle.surface_form}</span>
            )}
            {kuromojiArticle.warodai.map(
              (warodaiArticle: IWarodaiArticle, warodaiIndex, arr) => (
                <div>
                  <div className="word-card__main">
                    {`${arr.length > 1 ? `${warodaiIndex + 1}.` : ""} `}
                    {warodaiArticle.word.length !== 0 &&
                      `[${warodaiArticle.word}]: `}
                    {` ${warodaiArticle.wordReadings.kana} | ${warodaiArticle.wordReadings.kiriji} `}
                  </div>
                  <div className="word-card__meanings">
                    {warodaiArticle.meanings.map((meaning, i, arr) => (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: `${
                            arr.length > 1 ? `${i + 1}.` : ""
                          } ${meaning} `,
                        }}
                      ></span>
                    ))}
                  </div>
                  {warodaiArticle.derivatives.length > 0 && (
                    <div className="word-card__derivatives">
                      {warodaiArticle.derivatives.map((derivative, i, arr) => (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: `${
                              arr.length > 1 ? `${i + 1}.` : ""
                            } ${derivative} `,
                          }}
                        ></span>
                      ))}
                    </div>
                  )}
                  {warodaiArticle.phrases.length > 0 && (
                    <div className="word-card__phrases">
                      {warodaiArticle.phrases.map((phrase, i, arr) => (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: `${
                              arr.length > 1 ? `${i + 1}.` : ""
                            } ${phrase} `,
                          }}
                        ></span>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisWord;
