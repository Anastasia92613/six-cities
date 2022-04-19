import {NameSpace} from "../root-reducer";

export const getOffersData = (state) => state[NameSpace.OFFERS_DATA].offerCards;
export const checkLoad = (state) => state[NameSpace.OFFERS_DATA].isDataLoaded;
export const checkActiveMouseOffer = (state) => state[NameSpace.OFFERS_DATA].activeMouseOffer;
export const getOfferData = (state) => state[NameSpace.OFFERS_DATA].offerCard;
export const getNearbyOffers = (state) => state[NameSpace.OFFERS_DATA].nearbyOffers;
export const isSeleted = (state) => state[NameSpace.OFFERS_DATA].select;

