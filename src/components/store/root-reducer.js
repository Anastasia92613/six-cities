import {combineReducers} from "redux";
import {offersData} from "./offers-data/offers-data";
import {autorization} from "./autorization/autorization";
import {commentsData} from "./comments-data/comments-data";
import {sortDropDown} from "./sort-drop-down/sort-drop-down";
import {userData} from "./user-data/user-data";
import {favoriteData} from "./favorite/favorite";
import {notification} from "./notifications/notification";


export const NameSpace = {
  OFFERS_DATA: `OFFERS_DATA`,
  AUTORIZATION: `AUTORIZATION`,
  COMMENTS_DATA: `COMMENTS_DATA`,
  SORT_DROP_DOWN: `SORT_DROP_DOWN`,
  USER_DATA: `USER_DATA`,
  FAVORITE: `FAVORITE`,
  NOTIFICATION: `NOTIFICATION`,
};

export default combineReducers({
  [NameSpace.OFFERS_DATA]: offersData,
  [NameSpace.AUTORIZATION]: autorization,
  [NameSpace.COMMENTS_DATA]: commentsData,
  [NameSpace.SORT_DROP_DOWN]: sortDropDown,
  [NameSpace.USER_DATA]: userData,
  [NameSpace.FAVORITE]: favoriteData,
  [NameSpace.NOTIFICATION]: notification,
});
