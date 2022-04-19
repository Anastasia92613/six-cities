import React, {useEffect, useMemo} from "react";
import OfferCart from "../offer-cart/offer-cart";
import Header from "../header/header";
import Map from "../map/map";
import offerCardsProp from "../offer-cart/offer-cards.prop";
import CityItem from "../city-item/city-item";
import PropTypes from "prop-types";
import {useHistory, useParams} from "react-router-dom";
import Sorting from "../sorting/sorting";
import {changeSortDropDown} from "../store/action";
import {connect} from "react-redux";
import {useQuery} from "../../hooks";
import {fetchOffersCards} from "../api/api-action";
import {pointsMap} from "../../utils";
import Spinner from "../spinner/spinner";
import {checkLoad, getOffersData, isSeleted} from "../store/offers-data/selectors";
import {sortingDropDown} from "../store/sort-drop-down/selectors";
import {loadFavorite, modificationFavorite} from "../store/favorite/selectors";
import {citys as arrCity} from "../const";
import NotFoundPage from "../not-found-page/not-found-page";
import {getReviuewRequestStatus} from "../store/comments-data/selectors";

const MainPage = ({offerCards, citys, options, dropDown, onDropDown, onLoadData, isDataLoaded, favoriteItem}) => {
  const {activeCity} = useParams();
  const history = useHistory();
  const filteredOfferCards = offerCards.filter((offer) => offer.city.name === activeCity);
  const points = pointsMap(offerCards);
  const filteredPoints = points.filter((point) => point.city === activeCity);
  const query = useQuery();
  const option = query.get(`option`) || `Popular`;

  useEffect(()=> {
    if (!activeCity) {
      history.push(`/Paris`);
    }
  }, [location.pathname]);

  let arraySort;

  switch (option) {
    case `Popular`:
      arraySort = filteredOfferCards;
      break;
    case `Price: low to high`:
      arraySort = filteredOfferCards.sort((a, b) => a.price - b.price);
      break;
    case `Price: high to low`:
      arraySort = filteredOfferCards.sort((a, b) => b.price - a.price);
      break;
    case `Top rated first`:
      arraySort = filteredOfferCards.sort((a, b) => b.rating - a.rating);
      break;
    default:
      arraySort = filteredOfferCards;
      break;
  }

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadData();
    }
  }, [isDataLoaded]);


  useMemo(() => {
    if (favoriteItem) {
      const {id} = favoriteItem;
      offerCards.map((offer) => {
        if (offer.id === id) {
          offer.isFavorite = favoriteItem.isFavorite;
        }
      });
    }
  }, [favoriteItem]);

  const isCityExist = useMemo(() => {
    return arrCity.includes(activeCity);
  }, [activeCity, arrCity]);

  if (!isDataLoaded) {
    return (
      < Spinner />
    );
  }


  return (
    isCityExist ? (
      <div className="page page--gray page--main">
        <Header />
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <ul className="locations__list tabs__list">
                {citys.map((city) => <CityItem key={city} city={city} />)}
              </ul>
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${filteredOfferCards.length} places to stay in ${activeCity}`}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex="0" onClick={() => onDropDown(dropDown)}>
                    {option}
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className={`places__options places__options--custom ${dropDown ? `places__options--opened` : ``}`}>
                    {options.map((option) => <Sorting key={option} option={option}/>)}
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  {arraySort.map((cart) => <OfferCart key = {cart.id} cart={cart}/>)}
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map markers={filteredPoints}/>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    ) : (
      <NotFoundPage />
    )

  );
};

const mapStateToProps = (state) => ({
  offerCards: getOffersData(state),
  dropDown: sortingDropDown(state),
  isDataLoaded: checkLoad(state),
  select: isSeleted(state),
  favorite: loadFavorite(state),
  favoriteItem: modificationFavorite(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchOffersCards());
  },
  onDropDown(dropDown) {
    dispatch(changeSortDropDown(!dropDown));
  },
});


MainPage.propTypes = {
  offerCards: offerCardsProp,
  citys: PropTypes.array.isRequired,
  favoriteOffers: PropTypes.array,
  options: PropTypes.array.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
  onDropDown: PropTypes.func.isRequired,
  dropDown: PropTypes.bool.isRequired,
  setFavoriteOffers: PropTypes.object,
  favoriteItem: PropTypes.object,
};

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);


