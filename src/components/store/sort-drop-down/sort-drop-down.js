import {ActionType} from "../action";

const initialState = {
  dropDown: false,
};

const sortDropDown = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ACTIVE_SORT_DROP_DOWN:
      return {
        ...state,
        dropDown: action.payload
      };
    default:
      return state;
  }
};

export {sortDropDown};
