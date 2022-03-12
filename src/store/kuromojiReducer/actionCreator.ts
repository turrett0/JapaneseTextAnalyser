import {
  IKuromojiArticle,
  KuromojiActionTypes,
  KuromojiStore,
  PageMode,
} from "./contracts/state";

export interface IFetchKuromojiAction {
  type: KuromojiActionTypes.FETCH_KUROMOJI_RESPONSE;
  payload: string;
}

export interface ISetKuromojiAction {
  type: KuromojiActionTypes.SET_KUROMOJI_RESPONSE;
  payload: KuromojiStore["kuromojiResponse"];
}

export interface ISetCurrentText {
  type: KuromojiActionTypes.SET_CURRENT_TEXT;
  payload: string;
}

export interface ISetCurrentWord {
  type: KuromojiActionTypes.SET_CURRENT_WORD;
  payload: number;
}

export interface ISetPageMode {
  type: KuromojiActionTypes.SET_PAGE_MODE;
  payload: string;
}

//Actions
export const KuromojiActionsObject = {
  FetchKuromojiAction: (payload: string): IFetchKuromojiAction => ({
    type: KuromojiActionTypes.FETCH_KUROMOJI_RESPONSE,
    payload,
  }),

  SetKuromojiResponseAction: (
    payload: IKuromojiArticle[]
  ): ISetKuromojiAction => ({
    type: KuromojiActionTypes.SET_KUROMOJI_RESPONSE,
    payload,
  }),

  SetCurrentText: (payload: string): ISetCurrentText => ({
    type: KuromojiActionTypes.SET_CURRENT_TEXT,
    payload,
  }),
  SetCurrentWord: (payload: number): ISetCurrentWord => ({
    type: KuromojiActionTypes.SET_CURRENT_WORD,
    payload,
  }),
  SetPageMode: (payload: PageMode): ISetPageMode => ({
    type: KuromojiActionTypes.SET_PAGE_MODE,
    payload,
  }),
};

export type KuromojiActions =
  | ISetKuromojiAction
  | IFetchKuromojiAction
  | ISetCurrentText
  | ISetCurrentWord
  | ISetPageMode;
