import {ActionType} from "../action";
import {reviuewRequestStatus} from "../../const";

const initialState = {
  comments: null,
  comment: null,
  loading: reviuewRequestStatus.IDLE,
  error: false,
};

const commentsData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case ActionType.SEND_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };
    case ActionType.CHECK_REVIEW_REQUEST_STATUS:
      return {
        ...state,
        loading: action.payload,
      };
    case ActionType.CHECK_ERROR_REQUEST:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export {commentsData};
