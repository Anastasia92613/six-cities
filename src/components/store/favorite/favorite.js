import {ActionType} from "../action";

const initialState = {
  favorite: null,
  isLoadedFavorite: false,
  favoriteItem: null,
};

const favoriteData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FAVORITE:
      return {
        ...state,
        favorite: action.payload,
        isLoadedFavorite: true
      };
    case ActionType.CHANGE_FAVORITE:
      return {
        ...state,
        favoriteItem: action.payload,
      };
    default:
      return state;
  }
};

export {favoriteData};
