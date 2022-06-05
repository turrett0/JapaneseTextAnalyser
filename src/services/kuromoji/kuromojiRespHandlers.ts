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

export const setEngWordPos = (
  kuromojiArticles: IKuromojiArticle[]
): IKuromojiArticle[] => {
  return kuromojiArticles.map((kuromojiArticle) => {
    let wordPos;
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
  response: IKuromojiArticle[]
): IKuromojiArticle[] => {
  let combinedWords: IKuromojiArticle[] = [];
  let currentVerb: any = null;

  for (let index = 0; index <= response.length - 1; index++) {
    const word = response[index];
    let isCanAdd = true;
    if (
      (word.conjugated_form !== "基本形" &&
        word.pos === "動詞" &&
        word?.pos_detail_1 === "自立") ||
      word.pos === "形容詞" ||
      word.conjugated_form === "連用タ接続"
    ) {
      currentVerb = word;
      isCanAdd = false;
    }

    if (
      currentVerb &&
      (word.pos === "助詞" ||
        word.pos === "助動詞" ||
        word.pos_detail_2 === "助動詞語幹" ||
        word.pos_detail_1 === "非自立" ||
        word.pos_detail_1 === "接尾") &&
      word.pos_detail_1 !== "係助詞" &&
      word.pos_detail_1! !== "副詞化" &&
      word.pos_detail_1! !== "格助詞" &&
      word.pos_detail_1! !== "連体化" &&
      word.pos_detail_1! !== "終助詞" &&
      word.conjugated_form !== "連用タ接続" &&
      word.conjugated_form !== "体言接続" &&
      word.conjugated_type !== "特殊・デス" &&
      word.pos !== "名詞"
    ) {
      currentVerb.surface_form += word.surface_form;

      isCanAdd = false;
    }

    if (index === response.length - 1 && currentVerb) {
      combinedWords.push(currentVerb);
      currentVerb = null;
    }

    if (isCanAdd) {
      currentVerb && currentVerb.word_id && combinedWords.push(currentVerb);
      combinedWords.push(word);
      currentVerb = null;
    }
  }
  console.log(combinedWords);
  return combinedWords;
};
