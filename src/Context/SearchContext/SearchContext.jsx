import { createContext, useEffect, useState } from "react";
import { tokenize, getTokenizer } from "kuromojin";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [kuromojiResponse, setkuromojiResponse] = useState([]);
  const [filteredWords, setfilteredWords] = useState([]);

  useEffect(() => {
    setfilteredWords(kuromojiResponse);
    console.log(kuromojiResponse.filter((item)=> typeof(item.reading)== 'function') )
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
        return word.reading.substring(0, word.reading.length - 1) + "グ";
        break;
      case conjugated_type.includes("五段・カ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ク";
        break;
      case conjugated_type.includes("五段・サ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ス";
        break;
      case conjugated_type.includes("五段・タ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ツ";
        break;
      case conjugated_type.includes("五段・ナ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ヌ";
        break;
      case conjugated_type.includes("五段・バ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ブ";
        break;
      case conjugated_type.includes("五段・マ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ム";
        break;
      case conjugated_type.includes("五段・ラ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ル";
        break;
      case conjugated_type.includes("五段・ワ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ウ";
        break;
      default:
        return () => console.log("nothing was found");
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
//カ変・クル
//サ変・−スル
