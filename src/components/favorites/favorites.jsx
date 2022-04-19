import React, {useEffect, useMemo} from "react";
import Header from "../header/header";
import {connect} from "react-redux";
import offerCardsProp from "../offer-cart/offer-cards.prop";
import {isLoadFavorite, loadFavorite} from "../store/favorite/selectors";
import Favorite from "../favorite/favorite";
import Spinner from "../spinner/spinner";
import {fetchFavorite} from "../api/api-action";
import PropTypes from "prop-types";
import {isSeleted} from "../store/offers-data/selectors";

const Favorites = ({favorite, isLoadedFavorite, onLoadFavorite, select}) => {

  useEffect(() => {
    if (!isLoadedFavorite) {
      onLoadFavorite();
    }
  }, [isLoadedFavorite]);

  useMemo(() => {
    onLoadFavorite();
  }, [select]);

  if (!isLoadedFavorite) {
    return (
      <Spinner />
    );
  }

  const filteredOffers = favorite.reduce((offer, newOffer) => {

    const filteredOffer = offer.find((el) => el.city === newOffer.city.name);
    if (filteredOffer) {
      filteredOffer.list.push(newOffer);
    } else {
      offer.push({id: offer.length + 1, city: newOffer.city.name, list: [newOffer]});
    }
    return offer;
  }, []);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {filteredOffers.map((cart) => <Favorite key={cart.id} cart={cart}/>)}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  favorite: loadFavorite(state),
  isLoadedFavorite: isLoadFavorite(state),
  select: isSeleted(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadFavorite() {
    dispatch(fetchFavorite());
  }
});


Favorites.propTypes = {
  favorite: offerCardsProp,
  isLoadedFavorite: PropTypes.bool.isRequired,
  onLoadFavorite: PropTypes.func.isRequired,
};

export {Favorites};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
