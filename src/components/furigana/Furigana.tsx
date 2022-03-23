import React from "react";
import "./Furigana.scss";
import {IKuromojiArticle} from "../../store/kuromojiReducer/contracts/state";

type Props = {
  currentWord: IKuromojiArticle;
  letter: string;
};

const Furigana: React.FC<Props> = ({currentWord, letter}) => {
  const getKanjiFurigana = (letter: string): string => {
    return currentWord.furigana.find(
      (item: IKuromojiArticle["furigana"]) => item.kanji === letter
    )?.furigana;
  };

  return (
    <span className={`furigana-wrapper show`}>
      <span className="furigana">
        {currentWord.furigana &&
          currentWord.furigana?.length > 0 &&
          getKanjiFurigana(letter)}
      </span>
    </span>
  );
};

export default Furigana;
