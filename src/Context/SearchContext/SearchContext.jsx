import {createContext, useEffect, useState} from "react";
import {tokenize, getTokenizer} from "kuromojin";
import data from "../../warodaiDB.js";

const SearchContext = createContext();

export function SearchProvider({children}) {
  const [kuromojiResponse, setkuromojiResponse] = useState([]);
  const [filteredWords, setfilteredWords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setfilteredWords(kuromojiResponse);
  }, [kuromojiResponse]);

  const kuromojiDBrequest = (word) => {
    getTokenizer();
    tokenize(word).then((tokens) => {
      kuromojiFilterHandler(tokens);
    });
  };

  let arr = [
    {
      word_id: 2591070,
      word_type: "KNOWN",
      word_position: 1,
      surface_form: "日本語",
      pos: "名詞",
      pos_detail_1: "一般",
      pos_detail_2: "*",
      pos_detail_3: "*",
      conjugated_type: "*",
      conjugated_form: "*",
      basic_form: "日本語",
      reading: "ニホンゴ",
      pronunciation: "ニホンゴ",
      meaning: "японский язык  ",
    },
    {
      word_id: 2591070,
      word_type: "KNOWN",
      word_position: 4,
      surface_form: "日本語",
      pos: "名詞",
      pos_detail_1: "一般",
      pos_detail_2: "*",
      pos_detail_3: "*",
      conjugated_type: "*",
      conjugated_form: "*",
      basic_form: "日本語",
      reading: "ニホンゴ",
      pronunciation: "ニホンゴ",
      meaning: "японский язык  ",
    },
    {
      word_id: 2591070,
      word_type: "KNOWN",
      word_position: 7,
      surface_form: "日本語",
      pos: "名詞",
      pos_detail_1: "一般",
      pos_detail_2: "*",
      pos_detail_3: "*",
      conjugated_type: "*",
      conjugated_form: "*",
      basic_form: "日本語",
      reading: "ニホンゴ",
      pronunciation: "ニホンゴ",
      meaning: "японский язык  ",
    },
    {
      word_id: 2591070,
      word_type: "KNOWN",
      word_position: 10,
      surface_form: "日本語",
      pos: "名詞",
      pos_detail_1: "一般",
      pos_detail_2: "*",
      pos_detail_3: "*",
      conjugated_type: "*",
      conjugated_form: "*",
      basic_form: "日本語",
      reading: "ニホンゴ",
      pronunciation: "ニホンゴ",
      meaning: "японский язык  ",
    },
  ];

  // console.log(filteredArr);

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
            ? {
                ...word,
                reading: setDefaultConjugation(word),
                meaning:
                  getDetailedInfo(word) === false ? "" : getDetailedInfo(word),
              }
            : {
                ...word,
                meaning:
                  getDetailedInfo(word) === false ? "" : getDetailedInfo(word),
              };
        })
        .reduce((acc, current) => {
          console.log(current.word_id);
          const x = acc.find((item) => item.word_id === current.word_id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, [])
    );
  };

  const getDetailedInfo = (word) => {
    try {
      const d = data.filter(
        (dataItem) => dataItem[0] === word.basic_form
      )[0][2];
      return `${d[0] ? d[0] : ""}  ${d[1] ? " / " + d[1] : ""}`;
    } catch (err) {
      return false;
    }
  };

  //Work with Selector

  const searchSelectHandler = (statement) => {
    setfilteredWords(() =>
      kuromojiResponse.filter((word, _, array) => {
        return statement === "default" ? array : word.pos === statement;
      })
    );
  };

  //Works with wrong conjugation at reading column

  const setDefaultConjugation = (word) => {
    const {conjugated_type} = word;

    switch (true) {
      case conjugated_type.includes("サ変・スル"):
        return "";
      case conjugated_type.includes("五段・ガ行"):
        return word.reading.substring(0, word.reading.length - 1) + "グ";
      case conjugated_type.includes("五段・カ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ク";
      case conjugated_type.includes("五段・サ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ス";
      case conjugated_type.includes("五段・タ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ツ";
      case conjugated_type.includes("五段・ナ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ヌ";
      case conjugated_type.includes("五段・バ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ブ";
      case conjugated_type.includes("五段・マ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ム";
      case conjugated_type.includes("五段・ラ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ル";
      case conjugated_type.includes("五段・ワ行"):
        return word.reading.substring(0, word.reading.length - 1) + "ウ";
      default:
        return () => console.log("nothing was found");
    }
  };

  return (
    <SearchContext.Provider
      value={{
        kuromojiDBrequest,
        searchSelectHandler,
        setfilteredWords,
        filteredWords,
        kuromojiResponse,
        loading,
        setLoading,
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
