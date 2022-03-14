import "./WordCards.scss";
import WordCard from "../WordCard/WordCard";
import {useSelector} from "react-redux";
import {selectKuromojiFilteredResponse} from "../../store/kuromojiReducer/contracts/selectors";
import {v4 as uuid} from "uuid";
import {useRef, useState} from "react";

function WordCards() {
  const kuromojiResponse = useSelector(selectKuromojiFilteredResponse);

  //pagination

  const testRef = useRef<HTMLDivElement>(null);
  const [cardsPerPage, setCardsPerPage] = useState<number>(50);

  const currentCards = kuromojiResponse.slice(0, cardsPerPage);

  return (
    <div className="main-output">
      <div className="main-output__inner" ref={testRef}>
        {currentCards.map((cardData) => (
          <WordCard key={uuid()} cardData={cardData} />
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
        {kuromojiResponse.length >= cardsPerPage &&
          kuromojiResponse.length - currentCards.length >= cardsPerPage && (
            <button onClick={() => setCardsPerPage((prev) => (prev += 30))}>
              More Cards
            </button>
          )}
      </div>
    </div>
  );
}

export default WordCards;
