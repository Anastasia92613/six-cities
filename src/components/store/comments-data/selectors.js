import {NameSpace} from "../root-reducer";

export const getComments = (state) => state[NameSpace.COMMENTS_DATA].comments;
export const getReviuewRequestStatus = (state) => state[NameSpace.COMMENTS_DATA].loading;
export const getErrorRequest = (state) => state[NameSpace.COMMENTS_DATA].error;
