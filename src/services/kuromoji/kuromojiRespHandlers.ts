import {IKuromojiArticle} from "../../store/kuromojiReducer/contracts/state";
import {isKanji, toHiragana} from "wanakana";

export const kuromojiFilterHandler = (
  resp: IKuromojiArticle[]
): IKuromojiArticle[] => {
  return (
    resp
      //Filter  unnecessary articles　and get unuque words
      .reduce((acc: Array<IKuromojiArticle>, current) => {
        const x = acc.find(
          (item: IKuromojiArticle) => item.word_id === current.word_id
        );
        if (
          !x &&
          current.pos !== "記号" &&
          current.pos !== "助詞" &&
          current.pos !== "助動詞" &&
          current.pos_detail_1 !== "接尾" &&
          current.pos_detail_1 !== "非自立" &&
          current.basic_form !== "*"
        ) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, [])
  );
};

export const setDefaultConjugation = (resp: IKuromojiArticle[]) => {
  return resp.map((kuromojiArticle: IKuromojiArticle) => {
    return {
      ...kuromojiArticle,
      defaultReading: kuromojiConjugationHandler(
        toHiragana(kuromojiArticle.reading),
        kuromojiArticle.conjugated_type,
        kuromojiArticle
      ),
    };
  });
};

export const kuromojiConjugationHandler = (
  word: IKuromojiArticle["reading"],
  conjugated_type: IKuromojiArticle["conjugated_type"],
  article: IKuromojiArticle
): string => {
  switch (true) {
    //動詞　- verb
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

    case conjugated_type.includes("一段") &&
      article.conjugated_form !== "基本形":
      return word + "る";

    case conjugated_type.includes("サ変・スル"):
      return "する";
    case conjugated_type.includes("カ変・クル"):
      return "くる";
    //形容詞 - adverb
    case conjugated_type.includes("形容詞・イ段"):
      return word.substring(0, word.length - 1) + "い";
    default:
      return word;
  }
};

export const setEngWordPos = (
  kuromojiArticles: IKuromojiArticle[]
): IKuromojiArticle[] => {
  let wordPos;
  return kuromojiArticles.map((kuromojiArticle) => {
    switch (kuromojiArticle.pos) {
      case "動詞":
        wordPos = "verb";
        break;
      case "名詞":
        wordPos = "noun";
        break;
      case "形容詞":
        wordPos = "adjective";
        break;
      case "副詞":
        wordPos = "adverb";
        break;
      case "接続詞":
        wordPos = "conjuction";
        break;
      case "助詞":
        wordPos = "particle";
        break;
      case "連体詞":
        wordPos = "prenominal";
        break;
      case "助動詞":
        wordPos = "aux";
        break;
      case "特殊・デス":
        wordPos = "desu";
        break;
      case "感動詞":
        wordPos = " exclamation";
        break;
      default:
        wordPos = "";
        break;
    }

    return {
      ...kuromojiArticle,
      engPos: wordPos,
      furigana: toHiragana(kuromojiArticle.reading)
        .split("")
        .filter((x) => kuromojiArticle.surface_form.split("").indexOf(x) === -1)
        .join(""),
      kanjiCount: kuromojiArticle.surface_form.split("").reduce((acc, curr) => {
        if (isKanji(curr)) {
          acc += 1;
        }
        return acc;
      }, 0),
    };
  });
};

export const combineVerbHandler = (
  kuromojiResponse: IKuromojiArticle[]
): IKuromojiArticle[] => {
  return kuromojiResponse
    .map((currentArticle: IKuromojiArticle, i, arr) => {
      let tmp = "";
      const secondArticle = arr[i + 1]?.surface_form;
      const thirdArticle = arr[i + 2]?.surface_form;
      if (currentArticle.pos === "動詞") {
        if (
          secondArticle === "れ" ||
          secondArticle === "れる" ||
          secondArticle === "られる"
        ) {
          tmp += secondArticle;
        }
        if (secondArticle === "られ") {
          tmp += secondArticle;
        }

        if (thirdArticle === "て" || secondArticle === "て") {
          tmp += "て";
        }

        if (
          secondArticle === "ます" ||
          secondArticle === "まし" ||
          secondArticle === "ない" ||
          secondArticle === "なかっ" ||
          secondArticle === "ませ"
        ) {
          tmp = secondArticle;
        }
        if (secondArticle === "た" || thirdArticle === "た") {
          tmp += "た";
        }
        if (secondArticle === "だ") {
          tmp += "だ";
        }
        if (
          thirdArticle === "ます" ||
          thirdArticle === "まし" ||
          thirdArticle === "ない" ||
          thirdArticle === "ませ"
        ) {
          tmp += arr[i + 2].surface_form;
        }
        if (thirdArticle === "ん") {
          tmp += arr[i + 2].surface_form;
        }
        if (
          arr[i + 3]?.surface_form === "た" ||
          arr[i + 3]?.surface_form === "ん"
        ) {
          if (secondArticle !== "て") {
            tmp += arr[i + 3].surface_form;
          }
        }
        if (secondArticle === "せ") {
          tmp = "せ" + arr[i + 2].surface_form;
        }

        if (secondArticle === "で" || thirdArticle === "で") {
          tmp += "で";
        }
        if (secondArticle === "ず") {
          tmp += "ず";
        }

        return {
          ...currentArticle,
          surface_form: currentArticle.surface_form + tmp,
          combined: true,
        };
      } else if (
        currentArticle.pos === "助動詞" &&
        currentArticle.conjugated_type === "特殊・ダ" &&
        currentArticle.surface_form.includes("だ")
      ) {
        return {
          ...currentArticle,
          surface_form: currentArticle.surface_form + secondArticle,
        };
      } else if (currentArticle.surface_form === "でし") {
        return {
          ...currentArticle,
          surface_form: "でした",
        };
      } else if (
        (currentArticle.pos === "形容詞" && secondArticle === "た") ||
        arr[i + 1]?.basic_form === "ない" ||
        secondArticle === "て"
      ) {
        if (thirdArticle === "た") {
          tmp = "た";
        }
        return {
          ...currentArticle,
          surface_form: currentArticle.surface_form + secondArticle + tmp,
        };
      }
      // else if (
      //   currentArticle.pos === "名詞" &&
      //   arr[i + 1].basic_form === "する"
      // ) {
      //   return {
      //     ...currentArticle,
      //     surface_form: currentArticle.surface_form + arr[i + 1].surface_form,
      //   };
      // }
      return currentArticle;
    })
    .filter(
      (item: IKuromojiArticle, i, arr) =>
        item.surface_form !== "て" &&
        item.conjugated_type !== "特殊・マス" &&
        item.conjugated_type !== "特殊・タ" &&
        item.conjugated_type !== "特殊・ナイ" &&
        item.conjugated_form !== "連用ニ接続" &&
        item.pos_detail_1 !== "接続助詞" &&
        item.basic_form !== "ん" &&
        item.pos_detail_1 !== "終助詞" &&
        item.basic_form !== "られる" &&
        item.basic_form !== "れる" &&
        item.surface_form !== "せた" &&
        item.surface_form !== "せて" &&
        item.conjugated_type !== "不変化型" &&
        item.surface_form !== "ない" &&
        arr[i - 1]?.surface_form !== "がない"
    );
};
