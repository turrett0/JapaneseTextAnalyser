import { createContext, useEffect, useState } from "react";
import { tokenize, getTokenizer } from "kuromojin";
import { isHiragana, toHiragana } from "wanakana";
import { isKatakana } from "wanakana";
// import warodai from "../../warodai.json";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [kuromojiResponse, setkuromojiResponse] = useState([]);
  const [filteredWords, setfilteredWords] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setfilteredWords(kuromojiResponse);
  }, [kuromojiResponse]);

  const kuromojiDBrequest = (word) => {
    setkuromojiResponse([]);
    getTokenizer();
    tokenize(word).then((tokens) => {
      kuromojiFilterHandler(tokens);
    });
  };

  const kuromojiFilterHandler = (resp) => {
    const filtered = resp.filter((item) => {
      return (
        item.pos !== "記号" &&
        item.pos !== "助詞" &&
        item.pos !== "助動詞" &&
        item.pos_detail_1 !== "接尾" &&
        item.pos_detail_1 !== "非自立" &&
        item.basic_form !== "*"
      );
    });

    filtered.forEach((word) => {
      const currentReqWord =
        (isHiragana(word.surface_form) && word.surface_form) ||
        (isKatakana(word.surface_form) && toHiragana(word.surface_form));

      // const getWordFromWarodai = () => {
      //   if (currentReqWord) {
      //     return warodai.warodai.find(
      //       (warodaiWord) => warodaiWord.wordReadings.kana === currentReqWord
      //     );
      //   } else {
      //     return warodai.warodai.find((warodaiWord) =>
      //       warodaiWord.word.includes(word.basic_form)
      //     );
      //   }
      // };

      // setkuromojiResponse((prev) => {
      //   return [
      //     ...prev,
      //     {
      //       ...word,
      //       word_forms: getWordFromWarodai()?.word || [word.basic_form],
      //       meaning: getWordFromWarodai()?.meanings || "",
      //       derivatives: getWordFromWarodai()?.derivatives || "",
      //       phrases: getWordFromWarodai()?.phrases || "",
      //       reading:
      //         setDefaultConjugation(
      //           toHiragana(word.reading),
      //           word.conjugated_type
      //         ) || toHiragana(word.reading),
      //     },
      //   ];
      // });
    });
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

  const setDefaultConjugation = (word, conjugated_type) => {
    switch (true) {
      case conjugated_type.includes("五段・ガ行"):
        return conjugated_type.substring(0, word.length - 1) + "グ";
      case conjugated_type.includes("五段・カ行"):
        return word.substring(0, word.length - 1) + "ぐ";
      case conjugated_type.includes("五段・サ行"):
        return word.substring(0, word.length - 1) + "す";
      case conjugated_type.includes("五段・タ行"):
        return word.substring(0, word.length - 1) + "つ";
      case conjugated_type.includes("五段・ナ行"):
        return word.substring(0, word.length - 1) + "ぬ";
      case conjugated_type.includes("五段・バ行"):
        return word.substring(0, word.length - 1) + "ぶ";
      case conjugated_type.includes("五段・マ行"):
        return word.substring(0, word.length - 1) + "む";
      case conjugated_type.includes("五段・ラ行"):
        return word.substring(0, word.length - 1) + "る";
      case conjugated_type.includes("五段・ワ行"):
        return word.substring(0, word.length - 1) + "う";
      case conjugated_type.includes("サ変・スル"):
        return "する";
      case conjugated_type.includes("カ変・クル"):
        return "くる";
      //形容詞
      case conjugated_type.includes("形容詞・イ段"):
        return word.substring(0, word.length - 1) + "い";
      default:
        return null;
    }
  };

  return (
    <SearchContext.Provider
      value={{
        kuromojiDBrequest,
        searchSelectHandler, //input (still not included in app)
        setkuromojiResponse,
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
