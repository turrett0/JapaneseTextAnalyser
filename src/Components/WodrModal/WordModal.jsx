import React from "react";
import "./WordModal.scss";
import WordModalContext from "../../Context/WordModalContext/WordModalContext";
import {useContext} from "react";
import {v4 as uuid} from "uuid";

function WordModal() {
  const {currentWord, setCurrentWord} = useContext(WordModalContext);

  const clickHandler = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setCurrentWord({});
    }
  };

  if (Object.keys(currentWord).length === 0) {
    document.body.style.overflow = "unset";
  } else {
    document.body.style.overflow = "hidden";
  }

  function createMarkup(word) {
    return {__html: word};
  }

  return Object.keys(currentWord).length !== 0 ? (
    <div className="wordModal" onClick={clickHandler}>
      <div className="wordModal-card">
        <p>{currentWord.basic_form}</p>
        {currentWord.word_forms.map(
          (word) =>
            currentWord.basic_form !== word && <p key={uuid()}>Also - {word}</p>
        )}

        <p>Reading: {currentWord.reading}</p>
        <p>Word Type: {currentWord.pos}</p>
        {currentWord.meaning && <p>Meaning(RU): {currentWord.meaning}</p>}
        {currentWord.phrases.length > 0 && (
          <div className="wordModal-examples">
            {currentWord.phrases.map((phrase) => (
              <p key={uuid()} dangerouslySetInnerHTML={createMarkup(phrase)} />
            ))}
          </div>
        )}
      </div>
    </div>
  ) : null;
}

export default WordModal;
