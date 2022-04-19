import {NameSpace} from "../root-reducer";

export const loadFavorite = (state) => state[NameSpace.FAVORITE].favorite;
export const isLoadFavorite = (state) => state[NameSpace.FAVORITE].isLoadedFavorite;
export const modificationFavorite = (state) => state[NameSpace.FAVORITE].favoriteItem;
