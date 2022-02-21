import React from "react";
import "./WordModal.scss";
import WordModalContext from "../../Context/WordModalContext/WordModalContext";
import {useContext} from "react";

function WordModal() {
  const {currentWord, setCurrentWord} = useContext(WordModalContext);
  // const [jishoWord, setJishoWord] = useState({});

  const clickHandler = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      setCurrentWord({});
    }
  };

  return (
    Object.keys(currentWord).length !== 0 && (
      <div className="wordModal" onClick={clickHandler}>
        <div className="wordModal-card">
          {/* <h1>詳細情報</h1> */}
          <p>Word: {currentWord.basic_form}</p>
          <p>Reading: {currentWord.reading}</p>
          <p>Word Type: {currentWord.pos}</p>
          {currentWord.meaning && <p>Meaning(RU): {currentWord.meaning}</p>}
          <button disabled>Look Up Jisho</button>
        </div>
      </div>
    )
  );
}

export default WordModal;
