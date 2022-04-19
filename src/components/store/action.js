export const ActionType = {
  ACTIVE_SORT_DROP_DOWN: `main/activeSortDropDown`,
  CHANGE_ACTIVE_MOUSE_OFFER: `main/changeActiveMouseOffer`,
  REQUIRED_AUTORIZATION: `user/requiredAutorization`,
  LOAD_OFFER_CARDS: `main/loadOfferCards`,
  LOAD_OFFER_CARD: `main/loadOfferCard`,
  LOAD_NEARBY_OFFERS: `offerPage/loadNearbyOffers`,
  LOAD_USER_INFO: `main/loadUserInfo`,
  LOAD_COMMENTS: `offerPage/loadComments`,
  SEND_COMMENT: `offerPage/sendComment`,
  LOAD_FAVORITE: `favorite/loadFavorite`,
  IS_SELECT: `main/isSelect`,
  CHANGE_FAVORITE: `main/changeFavorite`,
  APPEND_NOTIFICATION: `notification/APPEND_NOTIFICATION`,
  REMOVE_NOTIFICATION: `notification/REMOVE_NOTIFICATION`,
  CHECK_REVIEW_REQUEST_STATUS: `commentsForm/loading`,
  CHECK_ERROR_REQUEST: `commentForm/error`,
};

export const changeSortDropDown = (payload) => ({
  type: ActionType.ACTIVE_SORT_DROP_DOWN,
  payload,
});

export const changeActiveMouseOffer = (payload) => ({
  type: ActionType.CHANGE_ACTIVE_MOUSE_OFFER,
  payload,
});

export const requiredAutorization = (payload) => ({
  type: ActionType.REQUIRED_AUTORIZATION,
  payload,
});

export const loadOfferCards = (payload) => ({
  type: ActionType.LOAD_OFFER_CARDS,
  payload,
});

export const loadOfferCard = (payload) => ({
  type: ActionType.LOAD_OFFER_CARD,
  payload,
});

export const loadNearbyOffers = (payload) => ({
  type: ActionType.LOAD_NEARBY_OFFERS,
  payload,
});

export const loadUserInfo = (payload) => ({
  type: ActionType.LOAD_USER_INFO,
  payload,
});

export const loadComments = (payload) => ({
  type: ActionType.LOAD_COMMENTS,
  payload,
});

export const sendCommentAction = (payload) => ({
  type: ActionType.SEND_COMMENT,
  payload,
});

export const loadingFavorite = (payload) => ({
  type: ActionType.LOAD_FAVORITE,
  payload,
});

export const changeSelect = (payload) => ({
  type: ActionType.IS_SELECT,
  payload,
});

export const changeFavorite = (payload) => ({
  type: ActionType.CHANGE_FAVORITE,
  payload,
});

export const appendNotification = (notification) => {
  return {
    type: ActionType.APPEND_NOTIFICATION,
    payload: notification,
  };
};

export const removeNotification = (id) => {
  return {
    type: ActionType.REMOVE_NOTIFICATION,
    meta: id,
  };
};

export const changeReviuewRequestStatus = (payload) => ({
  type: ActionType.CHECK_REVIEW_REQUEST_STATUS,
  payload,
});

export const changeErrorRequest = (payload) => ({
  type: ActionType.CHECK_ERROR_REQUEST,
  payload,
});
