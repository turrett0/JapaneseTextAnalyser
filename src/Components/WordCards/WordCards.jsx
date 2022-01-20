import { useContext } from "react";
import "./WordCards.scss";
import SearchContext from "../../Context/SearchContext/SearchContext";
import WordCard from "../WordCard/WordCard";
import { v4 as uuidv4 } from "uuid";

function Card() {
  const { filteredWords } = useContext(SearchContext);

  return (
    <div className="container">
      <div className="word-cards-wrapper">
        {filteredWords.map((cardData) => (
          <WordCard key={uuidv4()} cardData={cardData} />
        ))}
      </div>
    </div>
  );
}

export default Card;
