import "./WordCard.scss";
import data from "../../warodaiDB.js";

function WordCard({ cardData }) {
  const readingCheck =
    cardData.surface_form === cardData.reading || !cardData.reading;

  const getDetailedInfo = (cardData) => {
    try {
      const d = data.filter(
        (dataItem) => dataItem[0] == cardData.basic_form
      )[0][2];
      return `${d[0] ? d[0] : ""}  ${d[1] ? " / " + d[1] : ""}`;
    } catch (err) {
      return false;
    }
  };

  return (
    <div className="card">
      <p>{cardData.basic_form}</p>
      <p>{cardData.pos} </p>
      <p>{cardData.reading}</p>
      {getDetailedInfo(cardData) && <p>{getDetailedInfo(cardData)}</p>}
    </div>
  );
}

export default WordCard;
