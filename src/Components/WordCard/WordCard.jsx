import "./WordCard.scss";
import {useContext} from "react";
import WordModalContext from "../../Context/WordModalContext/WordModalContext";

function WordCard({cardData}) {
  const readingCheck =
    cardData.surface_form === cardData.reading || !cardData.reading;

  const {setCurrentWord} = useContext(WordModalContext);

  const onClickHandler = () => {
    setCurrentWord(cardData);
  };

  return (
    <div className="card" onClick={onClickHandler}>
      <p>{cardData.basic_form}</p>
      <p>{cardData.pos} </p>
      <p>{cardData.reading}</p>
      {cardData.meaning && <p>{cardData.meaning}</p>}
    </div>
  );
}

export default WordCard;
