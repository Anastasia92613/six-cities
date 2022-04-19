import {ActionType} from "../action";

const initialState = {
  items: [],
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.APPEND_NOTIFICATION:
      return {
        ...state,
        items: [
          ...state.items,
          action.payload,
        ],
      };
    case ActionType.REMOVE_NOTIFICATION:
      return {
        ...state,
        items: state.items.filter((it) => it.id !== action.meta),
      };
    default:
      return state;
  }
};

export {notification};
