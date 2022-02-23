import {useContext} from "react";
import "./WordCards.scss";
import SearchContext from "../../Context/SearchContext/SearchContext";
import WordCard from "../WordCard/WordCard";
import {v4 as uuidv4} from "uuid";
import {useEffect} from "react";
import Spinner from "../../assets/spinner.gif";

function WordCards() {
  const {filteredWords, loading, setLoading} = useContext(SearchContext);
  useEffect(() => {
    setLoading(false);
  }, [filteredWords]);

  return (
    <div className="main-output">
      <div className="main-output__inner">
        {/* {loading ? (
          <img src={Spinner} alt="" style={{ width: "70px" }} />
        ) : (
          filteredWords.map((cardData) => (
            <WordCard key={uuidv4()} cardData={cardData} />
          ))
        )} */}
        <div>
          <ul>
            <li className="word">
              <div className="furigana-wrapper">
                <span className="furigana">にほんご</span>
              </div>
              <div className="testAfter-wrapper">
                <p className="testAfter">日本語</p>
              </div>
            </li>
            <li className="word">
              <div className="furigana-wrapper">
                {/* <span className="furigana">にほんご</span> */}
              </div>
              <div className="testAfter-wrapper">
                <p className="testAfter">を</p>
              </div>
            </li>
            <li className="word" onMouseOver={() => console.log("over")}>
              <span className="furigana-wrapper">
                <span className="furigana">べんきょう</span>
                <span className="furigana hidden">する</span>
              </span>
              <span className="testAfter-wrapper">
                <p className="testAfter">勉強</p>
                <p className="testAfter">する</p>
              </span>
            </li>
            <li className="word" onMouseOver={() => console.log("over")}>
              <span className="furigana-wrapper">
                <span className="furigana">ちみもうりょう</span>
              </span>
              <span className="testAfter-wrapper">
                <p className="testAfter">魑魅魍魎</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WordCards;
