import {IRootState} from "../..";
import {
  combineVerbHandler,
  kuromojiFilterHandler,
  setDefaultConjugation,
  setEngWordPos,
} from "../../../services/kuromoji/kuromojiRespHandlers";
import {KuromojiStore} from "./state";

export const selectKuromojiFilteredResponse = (
  state: IRootState
): KuromojiStore["kuromojiResponse"] =>
  kuromojiFilterHandler(
    setDefaultConjugation(state.kuromojiReducer.kuromojiResponse)
  );

export const selectKuromojidResponseWithEngPos = (
  state: IRootState
): KuromojiStore["kuromojiResponse"] =>
  setEngWordPos(
    setDefaultConjugation(
      combineVerbHandler(state.kuromojiReducer.kuromojiResponse)
    )

    // combineVerbHandler(state.kuromojiReducer.kuromojiResponse)
  );

export const selectRawKuromojiResponse = (
  state: IRootState
): KuromojiStore["kuromojiResponse"] => state.kuromojiReducer.kuromojiResponse;

export const selectKuromojiResponseWithCombineVerbs = (
  state: IRootState
): KuromojiStore["kuromojiResponse"] =>
  setDefaultConjugation(
    combineVerbHandler(state.kuromojiReducer.kuromojiResponse)
  );

export const selectKuromojiLoading = (
  state: IRootState
): KuromojiStore["loadingState"] => state.kuromojiReducer.loadingState;

export const selectCurrentText = (
  state: IRootState
): KuromojiStore["currentText"] => state.kuromojiReducer.currentText;

export const selectCurrentWord = (
  state: IRootState
): KuromojiStore["currentWord"] => state.kuromojiReducer.currentWord;

export const selectPageMode = (state: IRootState): KuromojiStore["pageMode"] =>
  state.kuromojiReducer.pageMode;
