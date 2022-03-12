import {IKuromojiArticle} from "../../store/kuromojiReducer/contracts/state";
import "./WordCard.scss";
import React from "react";
// import WordModalContext from "../../Context/WordModalContext/WordModalContext";

interface Props {
  cardData: IKuromojiArticle;
}

const WordCard: React.FC<Props> = ({cardData}) => {
  return (
    <div className="card">
      <p> {cardData.basic_form}</p>
      <p>{cardData.pos} </p>
      <p>{cardData.defaultReading}</p>
      {/* {cardData.meaning && <p>cardData.meaning</p>} */}
      <p
        style={{
          textAlign: "center",
        }}
      >
        {" "}
        {cardData.warodai[0]?.meanings[0]?.split(";")[0]}
      </p>
    </div>
  );
};

export default WordCard;
