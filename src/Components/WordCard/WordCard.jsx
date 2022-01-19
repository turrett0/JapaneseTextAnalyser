import "./WordCard.scss";

function WordCard({ cardData }) {
  const readingCheck =
    cardData.surface_form === cardData.reading || !cardData.reading;
  return (
    <div className="word__card">
      <div>Original word: {cardData.basic_form}</div>
      <div>type: {cardData.pos} </div>
      {!readingCheck && <div>reading: {cardData.reading}</div>}
    </div>
  );
}

export default WordCard;
