import { useContext } from "react";
import "./WordCards.scss";
import SearchContext from "../../Context/SearchContext/SearchContext";
import WordCard from "../WordCard/WordCard";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import Spinner from "../../assets/spinner.gif";

function WordCards() {
  const { filteredWords, loading, setLoading } = useContext(SearchContext);
  useEffect(() => {
    setLoading(false);
  }, [filteredWords]);

  return (
    <div className="main-output">
      <div className="main-output__inner">
        {loading ? (
          <img src={Spinner} alt="" style={{ width: "70px" }} />
        ) : (
          filteredWords.map((cardData) => (
            <WordCard key={uuidv4()} cardData={cardData} />
          ))
        )}
      </div>
    </div>
  );
}

export default WordCards;
