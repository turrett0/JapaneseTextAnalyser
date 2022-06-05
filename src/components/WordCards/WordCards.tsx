import "./WordCards.scss";
import {useSelector} from "react-redux";
import {selectKuromojiResponse} from "../../store/kuromojiReducer/contracts/selectors";
import {v4 as uuid} from "uuid";
import {useRef, useState} from "react";
import WordPopup from "../WordPopup/WordPopup";
import _ from "underscore";

function WordCards() {
  const kuromojiArticles = useSelector(selectKuromojiResponse, _.isEqual);

  //pagination

  const testRef = useRef<HTMLDivElement>(null);
  const [cardsPerPage, setCardsPerPage] = useState<number>(50);

  const currentCards = kuromojiArticles.slice(0, cardsPerPage);

  return (
    <div className="main-output">
      <div className="main-output__inner" ref={testRef}>
        {currentCards.map((cardData) => (
          <WordPopup key={uuid()} currentArticle={cardData} role={"card"} />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "60px",
        }}
      >
        {kuromojiArticles.length >= cardsPerPage &&
          kuromojiArticles.length - currentCards.length >= cardsPerPage && (
            <button onClick={() => setCardsPerPage((prev) => (prev += 30))}>
              Больше
            </button>
          )}
      </div>
    </div>
  );
}

export default WordCards;
