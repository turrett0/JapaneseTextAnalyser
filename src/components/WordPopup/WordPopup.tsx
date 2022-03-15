import React from "react";
import "./WordPopup.scss";
import {
  IKuromojiArticle,
  IWarodaiArticle,
} from "../../store/kuromojiReducer/contracts/state";
import {v4 as uuid} from "uuid";

type Props = {
  visible?: boolean;
  currentArticle: IKuromojiArticle;
  wordRef?: React.RefObject<HTMLDivElement>;
  role?: string;
};

const WordPopup: React.FC<Props> = ({
  visible = true,
  currentArticle,
  wordRef,
  role = "",
}) => {
  const getCardPosition = () => {
    let tmp = "";
    if (wordRef && wordRef.current) {
      if (wordRef.current.getBoundingClientRect().left < 400) {
        tmp += "left ";
      }
      if (
        window.innerWidth - wordRef.current.getBoundingClientRect().right <
        400
      ) {
        tmp += "right ";
      }
      if (wordRef.current.getBoundingClientRect().top <= 380) {
        tmp += "bottom ";
      } else {
        tmp += "top ";
      }
    }
    return tmp;
  };

  return (
    <>
      {visible && currentArticle.warodai.length !== 0 && (
        <div className={`word-card ${role} ${getCardPosition()}`}>
          <div className="word-card__inner">
            {role !== "card" && (
              <span className="word-card__dictonary-name">
                Японский-Русский
              </span>
            )}
            {currentArticle.warodai.length > 1 && (
              <span className="word-card__headline">
                {currentArticle.surface_form}
              </span>
            )}
            {currentArticle.warodai.map(
              (warodaiArticle: IWarodaiArticle, warodaiIndex, arr) => (
                <div key={uuid()}>
                  <div className="word-card__main">
                    {`${arr.length > 1 ? `${warodaiIndex + 1}.` : ""} `}
                    {warodaiArticle.word.length !== 0 &&
                      `[${warodaiArticle.word}]: `}
                    {` ${warodaiArticle.wordReadings.kana} | ${warodaiArticle.wordReadings.kiriji} `}
                  </div>
                  <div className="word-card__meanings">
                    {warodaiArticle.meanings.map((meaning, i, arr) => (
                      <span
                        key={uuid()}
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
                          key={uuid()}
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
                          key={uuid()}
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
    </>
  );
};

export default WordPopup;
