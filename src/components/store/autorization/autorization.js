import {ActionType} from "../action";

const initialState = {
  authorizationStatus: null,
};

const autorization = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    default:
      return state;
  }
};

export {autorization};
