import "./WordCard.scss";
import data from "../../warodaiDB.js";

function WordCard({ cardData }) {
  const readingCheck =
    cardData.surface_form === cardData.reading || !cardData.reading;



  return (
    <div className="card">
      <p>{cardData.basic_form}</p>
      <p>{cardData.pos} </p>
      <p>{cardData.reading}</p>
      {cardData.meaning && <p>{cardData.meaning}</p>}
    </div>
  );
}

export default WordCard;
