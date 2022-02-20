import {createContext, useEffect, useState} from "react";
import {tokenize, getTokenizer} from "kuromojin";
import axios from "axios";
import wanakana, {toHiragana, isHiragana} from "wanakana";
const SearchContext = createContext();

export function SearchProvider({children}) {
  const [kuromojiResponse, setkuromojiResponse] = useState([]);
  const [filteredWords, setfilteredWords] = useState([]);
  const [test, setTest] = useState([]);
  const [loading, setLoading] = useState(false);
  const arr = [];

  // console.log(isHiragana("おかす"));

  useEffect(() => {
    // getDetailedInfo("da");
    setfilteredWords(kuromojiResponse);
  }, [kuromojiResponse]);

  const kuromojiDBrequest = (word) => {
    console.log(word.length);
    if (word.length === 0) {
      setkuromojiResponse([]);
      return;
    }
    getTokenizer();
    tokenize(word).then((tokens) => {
      kuromojiFilterHandler(tokens);
    });
  };

  const kuromojiFilterHandler = (resp) => {
    resp
      .filter((item) => {
        // getDetailedInfo(item);
        return (
          item.pos !== "記号" &&
          item.pos !== "助詞" &&
          item.pos !== "助動詞" &&
          item.pos_detail_1 !== "接尾" &&
          item.pos_detail_1 !== "非自立" &&
          item.basic_form !== "*"
        );
      })
      // .map((word) => {
      //   return word.pos === "動詞"
      //     ? {
      //         ...word,
      //         reading: setDefaultConjugation(word),
      //         meaning:
      //           getDetailedInfo(word) === false ? "" : getDetailedInfo(word),
      //       }
      //     : {
      //         ...word,
      //         meaning:
      //           getDetailedInfo(word) === false ? "" : getDetailedInfo(word),
      //       };
      // })
      .reduce((acc, current) => {
        const x = acc.find((item) => item.word_id === current.word_id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, [])
      .forEach((word) => {
        const searchQuery = console.log(word.surface_form);
        if (isHiragana(word.surface_form)) {
        }
        axios
          .get(
            `http://localhost:5000/warodai${
              isHiragana(word.surface_form)
                ? `?wordReadings.kana=${word.surface_form}`
                : `?word=${word?.basic_form}`
            }`
          )
          .then((data) => {
            if (data.data.length === 0) {
              setkuromojiResponse(() => {
                return [...kuromojiResponse, word];
              });
            }
            // if (data.data[0]) return;
            if (data.data[0]?.meanings[0]) {
              setkuromojiResponse(() => {
                return [
                  ...kuromojiResponse,
                  {
                    ...word,
                    meaning: data.data[0].meanings,
                  },
                ];
              });
            }
          });
      });
  };

  const getDetailedInfo = (word) => {
    // console.log("call");
    // // console.log(word?.basic_form);
    // return axios
    //   .get(`http://localhost:5000/warodai?word=${word?.basic_form}`)
    //   .then((resp) => {
    //     // console.log(resp);
    //     // resp.forEach((word2) => {
    //     //   setTest((prev) => {
    //     //     return kuromojiResponse.map((kWord) => {
    //     //       return {
    //     //         ...kWord,
    //     //         meaning: word2.data[0].meanings[0],
    //     //       };
    //     //     });
    //     //   });
    //     // console.log(word2);
    //     // resp.forEach((item) => {
    //     if (resp.data[0].meanings[0]) {
    //       setTest((prev) => [
    //         ...prev,
    //         {...word, meaning: resp.data[0].meanings[0]},
    //       ]);
    //     }
    //     // });
    //   });
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
      case conjugated_type.includes("サ変・スル"):
        return "する";
      case conjugated_type.includes("カ変・クル"):
        return "くる";
      default:
        return "";
    }
  };

  return (
    <SearchContext.Provider
      value={{
        kuromojiDBrequest,
        searchSelectHandler, //input (still not included in app)
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
//Не ищет 食べる
