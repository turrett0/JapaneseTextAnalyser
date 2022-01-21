import { useContext } from "react";
import "./WordCards.scss";
import SearchContext from "../../Context/SearchContext/SearchContext";
import WordCard from "../WordCard/WordCard";
import { v4 as uuidv4 } from "uuid";

function WordCards() {
  const { filteredWords } = useContext(SearchContext);

  return (
    <div className="main-output">
      <div className="main-output__inner">
        {filteredWords.map((cardData) => (
          <WordCard key={uuidv4()} cardData={cardData} />
        ))}
      </div>
    </div>
  );
}

export default WordCards;
