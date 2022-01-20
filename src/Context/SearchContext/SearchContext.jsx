import { createContext, useEffect, useState } from "react";
import { tokenize, getTokenizer } from "kuromojin";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [kuromojiResponse, setkuromojiResponse] = useState([]);
  const [filteredWords, setfilteredWords] = useState([]);

  useEffect(() => {
    setfilteredWords(kuromojiResponse);
  }, [kuromojiResponse]);

  const kuromojiDBrequest = (word) => {
    getTokenizer();
    tokenize(word).then((tokens) => {
      kuromojiFilterHandler(tokens);
    });
  };

  const kuromojiFilterHandler = (kuromojiResponse) => {
    setkuromojiResponse(() =>
      kuromojiResponse
        .filter((item) => {
          return (
            item.pos !== "記号" &&
            item.pos !== "助詞" &&
            item.pos !== "助動詞" &&
            item.pos_detail_1 !== "接尾" &&
            item.pos_detail_1 !== "非自立" &&
            item.conjugated_type !== "一段" && //remove after fix!!!
            item.basic_form !== "*"
          );
        })
        .map((word) => {
          return word.pos === "動詞"
            ? { ...word, reading: setDefaultConjugation(word) }
            : word;
        })
    );
  };

  //Work with Selector

  const searchSelectHandler = (statement) => {
    setfilteredWords(() =>
      kuromojiResponse.filter((word, _, array) => {
        return statement == "default" ? array : word.pos == statement;
      })
    );
  };

  //Works with wrong conjugation at reading column

  const setDefaultConjugation = (word) => {
    const { conjugated_type, pos } = word;

    switch (true) {
      case conjugated_type.includes("サ変・スル"):
        return "";
        break;
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
