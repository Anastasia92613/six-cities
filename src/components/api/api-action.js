import {
  appendNotification, changeErrorRequest,
  changeFavorite, changeReviuewRequestStatus,
  loadComments, loadingFavorite,
  loadNearbyOffers,
  loadOfferCard,
  loadOfferCards,
  loadUserInfo,
  requiredAutorization,
  sendCommentAction,
} from "../store/action";

import {adapterCard, adapterData, adapterUserInfo, adapterComments} from "../../utils";
import {AutorizationStatus, reviuewRequestStatus} from "../const";


// Получение всех предложений по аренде
export const fetchOffersCards = () => (dispatch, _getState, api) => (
  api.get(`/hotels`)
    .then(({data}) => dispatch(loadOfferCards(adapterData(data))))
    .catch((error) => {
      dispatch(appendNotification({
        message: error.message,
      }));
    })
);

// Запрос на получение списка избарнных предложений
export const fetchFavorite = () => (dispatch, _getState, api) => (
  api.get(`/favorite`)
    .then(({data}) => dispatch(loadingFavorite(adapterData(data))))
    .catch((error) => {
      dispatch(appendNotification({
        message: error.message,
      }));
    })
);

// Получение одного предложения по аренде по id
export const fetchOfferCard = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}`)
    .then(({data}) => dispatch(loadOfferCard(adapterCard(data))))
);

// Получение предложений по аренде, находящихся рядом
export const nearbyOffers = (id) => (dispatch, _getState, api) => (
  api.get(`/hotels/${id}/nearby`)
    .then(({data}) => dispatch(loadNearbyOffers(adapterData(data))))
);


// Получение данных пользователя
export const fetchUserInfo = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({data})=> dispatch(loadUserInfo(adapterUserInfo(data))))
);

// Проверка статуса авторизации
export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(()=> dispatch(requiredAutorization(AutorizationStatus.AUTH)))
    .catch((error) => {
      dispatch(appendNotification({
        message: error.message,
      }));
    })
);

// Запрос на авторизацию
export const login = ({email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(() => dispatch(requiredAutorization(AutorizationStatus.AUTH)))
    .catch((error) => {
      dispatch(appendNotification({
        message: error.message,
      }));
    })
);

// Запрос на завершение сеанса
export const logout = () => (dispatch, _getState, api) => (
  api.get(`/logout`)
    .then(() => dispatch(requiredAutorization(AutorizationStatus.NO_AUTH)))
    .catch((error) => {
      dispatch(appendNotification({
        message: error.message,
      }));
    })
);

// Запрос на получение комментариев
export const fetchComments = (id) => (dispatch, _getState, api) => (
  api.get(`/comments/${id}`)
    .then(({data}) => dispatch(loadComments(adapterComments(data))))
);

// Запрос на добавление комментария
export const sendComment = (id, {comment: comment, rating}) => (dispatch, _getState, api) => {
  dispatch(changeReviuewRequestStatus(reviuewRequestStatus.PENDING));
  return api.post(`/comments/${id}`, {comment, rating})
      .then(({data}) => {
        dispatch(sendCommentAction(data));
        dispatch(changeReviuewRequestStatus(reviuewRequestStatus.FULFILLED));
      })
      .catch((error) => {
        dispatch(changeReviuewRequestStatus(reviuewRequestStatus.FULFILLED));
        dispatch(changeErrorRequest(true));
        dispatch(appendNotification({
          message: error.message,
        }));
      }

      );

};

// Запрос на изменение статуса избранного предложения
export const setFavorite = (id, status) => (dispatch, _getState, api) => (
  api.post(`/favorite/${id}/${Number(status)}`)
    .then(({data}) => dispatch(changeFavorite(adapterCard(data))))
);
