import {ActionType} from "../action";

const initialState = {
  userInfo: null,
};

const userData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export {userData};
