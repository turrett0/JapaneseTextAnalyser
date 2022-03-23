export interface IKuromojiArticle {
  basic_form: string;
  conjugated_form: string;
  conjugated_type: string;
  pos: string;
  pos_detail_1: string;
  pos_detail_2: string;
  pos_detail_3: string;
  pronunciation: string;
  reading: string;
  surface_form: string;
  word_id: number;
  word_position: number;
  word_type: string;
  engPos?: string;
  furigana?: any;
  defaultReading?: string;
  warodai: Array<IWarodaiArticle>;
  kanjiCount?: number;
}

export interface IWarodaiArticle {
  word: Array<string>;
  wordReadings: {
    kana: string;
    kiriji: string;
  };
  phrases: Array<string>;
  derivatives: Array<string>;
  meanings: Array<{
    meaning: string;
    phrases: Array<string>;
    clarifications: string;
  }>;
  id: number;
}

export interface IKuromojiExtendedArticle extends IKuromojiArticle {
  engPos: string;
  furigana: Array<{
    kanji: string;
    furigana: string;
  }>;
  kanjiCount?: number;
}

export enum PageMode {
  CARDS = "CARDS",
  FULLTEXT = "FULLTEXT",
}

export enum LoadingStates {
  LOADING = "LOADING",
  ADDING = "ADDING",
  ADDED = "ADDED",
  LOADED = "LOADED",
  ERORR = "ERROR",
  NEVER = "NEVER",
}

export interface IWarodaiResponse {
  word: Array<string>;
  wordReadings: {kana: string; kiriji: string};
  phrases: Array<string>;
  derivatives: Array<string>;
  meanings: Array<string>;
  id: number;
}

export type KuromojiStore = {
  kuromojiResponse: IKuromojiArticle[];
  loadingState: LoadingStates;
  currentText: string;
  currentWord: IKuromojiArticle["word_position"];
  pageMode: string;
};

// export enum KuromojiActions =
export enum KuromojiActionTypes {
  FETCH_KUROMOJI_RESPONSE = "FETCH_KUROMOJI_RESPONSE",
  SET_KUROMOJI_RESPONSE = "SET_KUROMOJI_RESPONSE",
  SET_CURRENT_TEXT = "SET_CURRENT_TEXT",
  SET_CURRENT_WORD = "SET_CURRENT_WORD",
  SET_PAGE_MODE = "SET_PAGE_MODE",
  SET_LOADING_STATE = "SET_LOADING_STATE",
}
