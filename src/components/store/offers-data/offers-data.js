import {ActionType} from "../action";

const initialState = {
  offerCards: [],
  offerCard: null,
  isDataLoaded: false,
  nearbyOffers: null,
  activeMouseOffer: null,
  select: false,
};

const offersData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVE_MOUSE_OFFER:
      return {
        ...state,
        activeMouseOffer: action.payload
      };
    case ActionType.LOAD_OFFER_CARDS:
      return {
        ...state,
        offerCards: action.payload,
        isDataLoaded: true,
      };
    case ActionType.LOAD_OFFER_CARD:
      return {
        ...state,
        offerCard: action.payload,
      };
    case ActionType.LOAD_NEARBY_OFFERS:
      return {
        ...state,
        nearbyOffers: action.payload,
      };
    case ActionType.IS_SELECT:
      return {
        ...state,
        select: action.payload,
      };
    default:
      return state;
  }
};

export {offersData};
