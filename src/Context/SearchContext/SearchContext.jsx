import { createContext, useState } from "react";
import { tokenize, getTokenizer } from "kuromojin";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [kuromojiResponse, setkuromojiResponse] = useState([]);
  const [filteredWords, setfilteredWords] = useState([]);

  const kuromojiDBrequest = (word) => {
    getTokenizer();
    tokenize(word).then((tokens) => {
     
      setkuromojiResponse(() =>
        tokens.filter((item) => {
          console.log(item.pos)
          return item.pos !== "記号" && item.pos !== '助詞' && item.pos !== '助動詞' && item.basic_form !== '*'
        })
      );
    });
  };

  const wordsFilterHandler = (kuromojiResponse)=>{

  }

  return (
    <SearchContext.Provider
      value={{
        kuromojiDBrequest,
        wordsFilterHandler,
        kuromojiResponse,
        filteredWords
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export default SearchContext;
