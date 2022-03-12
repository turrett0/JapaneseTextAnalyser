import React from "react";
import Form from "./Form/Form";
import WordCards from "../../components/WordCards/WordCards";

const WordExport = () => {
  return (
    <div className="main">
      <div className="main-inner">
        <Form />
        <WordCards />
      </div>
    </div>
  );
};

export default WordExport;
