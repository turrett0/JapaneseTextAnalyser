import { useContext } from "react";
import "./WordCards.scss";
import SearchContext from "../../Context/SearchContext/SearchContext";
import WordCard from "../WordCard/WordCard";
import { v4 as uuidv4 } from "uuid";

function Card() {
  const { kuromojiResponse } = useContext(SearchContext);

  return (
    <div className="container">
      <div className="word-cards-wrapper">
        {kuromojiResponse.map((cardData) => (
          <WordCard key={uuidv4()} cardData={cardData} />
        ))}
      </div>
    </div>
  );
}

export default Card;
