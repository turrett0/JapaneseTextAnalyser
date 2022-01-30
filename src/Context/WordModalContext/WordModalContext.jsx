import { createContext, useState } from "react";

import React from "react";

const WordModalContext = createContext();

export function WordModalProvider({ children }) {
  const [currentWord, setCurrentWord] = useState({});

  return (
    <WordModalContext.Provider
      value={{
        currentWord,
        setCurrentWord,
      }}
    >
      {children}
    </WordModalContext.Provider>
  );
}

export default WordModalContext;
