import {NameSpace} from "../root-reducer";

export const checkAutorization = (state) => state[NameSpace.AUTORIZATION].authorizationStatus;
