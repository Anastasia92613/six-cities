import React, {useState} from "react";
import {AutorizationStatus, STAR_WIDTH} from "../const";
import {Link, useHistory} from "react-router-dom";
import offerCartProp from "./offer-cart.prop";
import {changeActiveMouseOffer, changeSelect} from "../store/action";
import {connect} from "react-redux";
import {checkActiveMouseOffer, getOffersData, isSeleted} from "../store/offers-data/selectors";
import {setFavorite} from "../api/api-action";
import PropTypes from "prop-types";
import {checkAutorization} from "../store/autorization/selectors";

const OfferCart = ({cart = {}, onActiveOffer = ()=>{}, onInActiveOffer = ()=>{}, onOfferClick, onSelect, authorizationStatus}) => {

  const {isPremium, id, previewImage, price, rating, title, type, isFavorite} = cart;
  const [favorite, changeFavorite] = useState(isFavorite);

  const router = useHistory();
  const link = {
    pathname: `${router.location.pathname}/offer/${id}`,
  };
  const history = useHistory();

  const handleFavorite = () => {
    if (authorizationStatus === AutorizationStatus.AUTH) {
      onOfferClick(id, favorite);
      changeFavorite(!favorite);
      onSelect(favorite);
    } else {
      history.push(`/login`);
    }

  };

  return (
    <article className="cities__place-card place-card" id={id}
      onMouseEnter={()=> onActiveOffer(id)}
      onMouseLeave={()=> onInActiveOffer(``)}>
      {isPremium && (
        <div className="place-card__mark">
          <span>{isPremium ? `Premiun` : ``}</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={link}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${favorite ? `place-card__bookmark-button--active` : ``} button`} type="button"
            onClick={handleFavorite}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * STAR_WIDTH}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={link}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

const mapStateToProps = (state) => ({
  activeMouseOffer: checkActiveMouseOffer(state),
  offerCards: getOffersData(state),
  select: isSeleted(state),
  authorizationStatus: checkAutorization(state),
});

const mapDispatchToProps = (dispatch) => ({
  onActiveOffer(id) {
    dispatch(changeActiveMouseOffer(id));
  },
  onInActiveOffer() {
    dispatch(changeActiveMouseOffer(``));
  },
  onOfferClick(id, isFavorite) {
    dispatch(setFavorite(id, !isFavorite));
  },
  onSelect(select) {
    dispatch(changeSelect(!select));
  },
});


OfferCart.propTypes = {
  cart: offerCartProp,
  onOfferClick: PropTypes.func,
  onActiveOffer: PropTypes.func,
  onInActiveOffer: PropTypes.func,
};

export {OfferCart};
export default connect(mapStateToProps, mapDispatchToProps)(OfferCart);
