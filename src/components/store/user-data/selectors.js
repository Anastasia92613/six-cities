import {NameSpace} from "../root-reducer";

export const getUserData = (state) => state[NameSpace.USER_DATA].userInfo;
