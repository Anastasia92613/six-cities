import {NameSpace} from "../root-reducer";

export const getNotifications = (state) => state[NameSpace.NOTIFICATION].items;
