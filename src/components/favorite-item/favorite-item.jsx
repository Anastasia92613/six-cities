import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {STAR_WIDTH} from "../const";
import offerCartProp from "../offer-cart/offer-cart.prop";
import {connect} from "react-redux";
import {setFavorite} from "../api/api-action";
import PropTypes from "prop-types";
import {changeSelect} from "../store/action";
import {isSeleted} from "../store/offers-data/selectors";

const FavoriteItem = ({item, onOfferClick, select, onSelect}) => {
  const {id, rating, previewImage, price, title, type, isFavorite} = item;
  const [favorite, changeFavorite] = useState(isFavorite);
  const deleteStatus = 0;
  const router = useHistory();
  const link = {
    pathname: `${router.location.pathname}/offer/${id}`,
  };
  const handleFavorite = () => {
    onOfferClick(id, deleteStatus);
    changeFavorite(!favorite);
    onSelect(select);
  };

  return (
    <article className="favorites__card place-card" id={id}>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={link}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
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
            <span className="visually-hidden">In bookmarks</span>
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

FavoriteItem.propTtypes = {
  item: offerCartProp,
  onOfferClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  select: isSeleted(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOfferClick(id, deleteStatus) {
    dispatch(setFavorite(id, deleteStatus));
  },
  onSelect(select) {
    dispatch(changeSelect(!select));
  },
});


export {FavoriteItem};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteItem);
