import {IKuromojiArticle} from "../../store/kuromojiReducer/contracts/state";
import {isKanji, toHiragana} from "wanakana";

export const kuromojiFilterHandler = (
  resp: IKuromojiArticle[]
): IKuromojiArticle[] => {
  return (
    resp
      //Filter  unnecessary articles　and gets unuque words
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

    let setFurigana: Array<any> = [];
    let kanjies = kuromojiArticle.surface_form
      .split("")
      .filter((item: string) => isKanji(item));
    toHiragana(kuromojiArticle.reading)
      .split("")
      .forEach((letter, i, arr) => {
        if (kuromojiArticle.surface_form.includes(letter)) {
          setFurigana.push("|");
        } else {
          // console.log(letter);

          setFurigana.push(letter);
        }
      });
    setFurigana = setFurigana
      .join("")
      .split("|")
      .filter((item) => item)
      .map((item, i) => {
        return {
          kanji: kanjies[i],
          furigana: item,
        };
      });

    return {
      ...kuromojiArticle,
      engPos: wordPos,
      furigana: setFurigana,
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
  return kuromojiResponse.reduce(
    (prevValue: Array<IKuromojiArticle>, curr, i, arr) => {
      let tmp = "";
      console.log(arr[i + 1]?.surface_form);

      if (
        (curr.surface_form !== curr.basic_form && curr.pos === "動詞") ||
        curr.pos === "形容詞"
      ) {
        if (
          arr[i + 1]?.surface_form === "さ" ||
          arr[i + 1]?.surface_form === "させ" ||
          arr[i + 1]?.surface_form === "た" ||
          arr[i + 1]?.surface_form === "だ" ||
          arr[i + 1]?.surface_form === "て" ||
          arr[i + 1]?.surface_form === "で" ||
          arr[i + 1]?.surface_form === "ない" ||
          arr[i + 1]?.surface_form === "なく" ||
          arr[i + 1]?.surface_form === "なかっ" ||
          arr[i + 1]?.basic_form === "ます" ||
          arr[i + 1]?.surface_form === "られ" ||
          arr[i + 1]?.surface_form === "られる" ||
          arr[i + 1]?.surface_form === "れ" ||
          arr[i + 1]?.surface_form === "れる" ||
          arr[i + 1]?.surface_form === "よう" ||
          arr[i + 1]?.surface_form === "ん" ||
          arr[i + 1]?.surface_form === "ず" ||
          arr[i + 1]?.surface_form === "せ" ||
          arr[i + 1]?.surface_form === "ば"
        ) {
          console.log(arr[i + 1].surface_form);
          tmp += arr[i + 1]?.surface_form;
        }
        if (
          arr[i + 2]?.basic_form === "なく" ||
          arr[i + 2]?.surface_form === "た" ||
          arr[i + 2]?.surface_form === "ん" ||
          arr[i + 2]?.surface_form === "た" ||
          arr[i + 2]?.surface_form === "ない" ||
          arr[i + 2]?.surface_form === "なかっ" ||
          arr[i + 2]?.surface_form === "ませ" ||
          arr[i + 2]?.surface_form === "られ" ||
          arr[i + 2]?.surface_form === "が" ||
          arr[i + 2]?.surface_form === "て"
        ) {
          console.log(arr[i + 2].surface_form);
          tmp += arr[i + 2]?.surface_form;
        }
        if (
          arr[i + 3]?.surface_form === "なく" ||
          arr[i + 3]?.surface_form === "た" ||
          arr[i + 3]?.surface_form === "ます" ||
          arr[i + 3]?.surface_form === "ませ" ||
          arr[i + 3]?.surface_form === "ん" ||
          arr[i + 3]?.surface_form === "ない" ||
          arr[i + 3]?.basic_form === "いる"
        ) {
          tmp += arr[i + 3]?.surface_form;
        }
        if (
          (arr[i + 4]?.surface_form === "ませ" &&
            arr[i + 4]?.surface_form === "ん") ||
          arr[i + 4]?.surface_form === "でし"
        ) {
          tmp += arr[i + 4]?.surface_form;
        }
        if (
          arr[i + 5]?.surface_form === "でし" ||
          arr[i + 5]?.surface_form === "た"
        ) {
          tmp += arr[i + 5]?.surface_form;
        }
        if (arr[i + 6]?.surface_form === "た") {
          tmp += arr[i + 6]?.surface_form;
        }
      }
      if (curr.pos === "名詞" && curr.pos_detail_1 === "接尾") {
        return prevValue;
      }

      if (
        (tmp.includes("てい") &&
          curr?.basic_form === "いる" &&
          curr.pos_detail_1 === "非自立" &&
          curr.pos !== "名詞") ||
        (arr[i - 1]?.basic_form === "いる" && curr.surface_form === "ます") ||
        (curr.surface_form === "せ" && curr.pos_detail_1 === "接尾")
      ) {
        return prevValue;
      }

      if (
        curr.surface_form !== "て" &&
        curr.conjugated_type !== "特殊・マス" &&
        curr.conjugated_type !== "特殊・ナイ" &&
        curr.conjugated_form !== "連用ニ接続" &&
        // curr.pos_detail_1 !== "接尾" &&
        curr.basic_form !== "られる" &&
        curr.basic_form !== "れる" &&
        curr.surface_form !== "せた" &&
        curr.surface_form !== "せて" &&
        curr.conjugated_type !== "不変化型" &&
        curr.surface_form !== "ない" &&
        arr[i - 1]?.surface_form !== "がない" &&
        curr.pos_detail_1 !== "非自立"
      ) {
        console.log(tmp);
        return prevValue.concat([
          {
            ...curr,
            surface_form: curr.surface_form + tmp,
          },
        ]);
      }
      return prevValue;
    },
    []
  );
};
