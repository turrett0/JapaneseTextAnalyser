import { createContext, useEffect, useState } from "react";
import { tokenize, getTokenizer } from "kuromojin";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [kuromojiResponse, setkuromojiResponse] = useState([]);
  const [filteredWords, setfilteredWords] = useState([]);

  useEffect(() => {
    setfilteredWords(
      kuromojiResponse.map((word) => {
        return word.pos === "動詞"
          ? { ...word, reading: setDefaultConjugation(word) }
          : word;
      })
    );
    // console.log(filteredWords.filter((item)=> typeof(item.reading)) == 'function')
  }, [kuromojiResponse]);

  const kuromojiDBrequest = (word) => {
    getTokenizer();
    tokenize(word).then((tokens) => {
      setkuromojiResponse(() =>
        tokens.filter((item) => {
          return (
            item.pos !== "記号" &&
            item.pos !== "助詞" &&
            item.pos !== "助動詞" &&
            item.pos_detail_1 !== "接尾" &&
            item.pos_detail_1 !== "非自立" &&
            item.basic_form !== "*"
          );
        })
      );
    });
  };

  const wordsFilterHandler = (kuromojiResponse) => {
    //Move all statements from kuromojiDBrequest's filter function
  };

  const searchSelectHandler = (statement) => {
    setfilteredWords(() =>
      filteredWords.filter((word, _, array) => {
        return statement == "default" ? array : word.pos == statement;
      })
    );
  };

  const setDefaultConjugation = (word) => {
    const { conjugated_type, pos } = word;

    switch (true) {
      case conjugated_type.includes("五段・ガ行"):
        return setFilteredWordsHandler("グ", word);
        break;
      case conjugated_type.includes("五段・カ行"):
        return setFilteredWordsHandler("ク", word);
        break;
      case conjugated_type.includes("五段・サ行"):
        return setFilteredWordsHandler("ス", word);
        break;
      case conjugated_type.includes("五段・タ行"):
        return setFilteredWordsHandler("ツ", word);
        break;
      case conjugated_type.includes("五段・ナ行"):
        return setFilteredWordsHandler("ヌ", word);
        break;
      case conjugated_type.includes("五段・バ行"):
        return setFilteredWordsHandler("ブ", word);
        break;
      case conjugated_type.includes("五段・マ行"):
        return setFilteredWordsHandler("ム", word);
        break;
      case conjugated_type.includes("五段・ラ行"):
        return setFilteredWordsHandler("ル", word);
        break;
      case conjugated_type.includes("五段・ワ行"):
        return setFilteredWordsHandler("ウ", word);
        break;
      default:
        return () => console.log("def");
    }
  };

  const setFilteredWordsHandler = (ending, word) =>
    word.reading.substring(0, word.reading.length - 1) + ending;

  return (
    <SearchContext.Provider
      value={{
        kuromojiDBrequest,
        wordsFilterHandler,
        searchSelectHandler,
        filteredWords,
        kuromojiResponse,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;

//変接続 не работают
// Пофиксить 一段動詞
