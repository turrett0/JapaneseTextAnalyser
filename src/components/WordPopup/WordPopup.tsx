import React, {Fragment, useState} from "react";
import "./WordPopup.scss";
import {
  IKuromojiArticle,
  IWarodaiArticle,
} from "../../store/kuromojiReducer/contracts/state";
import {v4 as uuid} from "uuid";

type Props = {
  visible?: boolean;
  setVisible?: (state: boolean) => void;
  currentArticle: IKuromojiArticle;
  wordRef?: React.RefObject<HTMLDivElement>;
  role?: string;
};

const WordPopup: React.FC<Props> = ({
  visible = true,
  setVisible,
  currentArticle,
  wordRef,
  role = "",
}) => {
  const getCardPosition = () => {
    let cardPosition = "";
    if (wordRef && wordRef.current) {
      if (wordRef.current.getBoundingClientRect().left < 400) {
        cardPosition += "left ";
      }
      if (
        window.innerWidth - wordRef.current.getBoundingClientRect().right <
        400
      ) {
        cardPosition += "right ";
      }
      if (wordRef.current.getBoundingClientRect().top <= 380) {
        cardPosition += "bottom ";
      } else {
        cardPosition += "top ";
      }
    }
    return cardPosition;
  };

  return (
    <>
      {visible && currentArticle.warodai.length !== 0 && (
        <div className={`word-card ${role} ${getCardPosition()}`} key={uuid()}>
          <div className="word-card__close">
            {role !== "card" && (
              <button
                style={{
                  margin: "20px 0",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (setVisible) setVisible(false);
                }}
              >
                Закрыть окно
              </button>
            )}
          </div>
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
                <div className="word-card__article" key={uuid()}>
                  <div className="word-card__main">
                    {`${arr.length > 1 ? `${warodaiIndex + 1}.` : ""} `}
                    {warodaiArticle.word.length !== 0 &&
                      `[${warodaiArticle.word}]: `}
                    {` ${warodaiArticle.wordReadings.kana} | ${warodaiArticle.wordReadings.kiriji} `}
                  </div>
                  {warodaiArticle.meanings.map((meaning, i, arr) => (
                    <Fragment key={uuid()}>
                      <div className="word-card__meanings">
                        <span
                          key={uuid()}
                          dangerouslySetInnerHTML={{
                            __html: `${arr.length > 1 ? `${i + 1}.` : ""} ${
                              meaning.meaning
                            }`,
                          }}
                        />
                      </div>
                      {meaning.phrases.length > 0 && (
                        <div className="word-card__phrases">
                          {meaning.phrases.map((phrase) => (
                            <span
                              className="word-card__phrase"
                              key={uuid()}
                              dangerouslySetInnerHTML={{
                                __html: `・ ${phrase}`,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </Fragment>
                  ))}

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
                        />
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
