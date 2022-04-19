import React, {useEffect} from "react";
import Header from "../header/header";
import Reviews from "../reviews/reviews";
import {STAR_WIDTH} from "../const";
import ComponentForm from "../component-form/component-form";
import {useParams} from "react-router-dom";
import Map from "../map/map";
import commentFormProp from "../component-form/comment-form.prop";
import {connect} from "react-redux";
import {pointsMap} from "../../utils";
import {fetchComments, fetchOfferCard, nearbyOffers} from "../api/api-action";
import {OfferCart} from "../offer-cart/offer-cart";
import PropTypes from "prop-types";
import Spinner from "../spinner/spinner";
import {getNearbyOffers, getOfferData} from "../store/offers-data/selectors";
import {getComments} from "../store/comments-data/selectors";

const OfferPage = ({comments, offerCard, onLoadCard, nearbyOffers}) => {
  const {id} = useParams();
  let idOff = Number(id);

  useEffect(() => {
    if (idOff) {
      onLoadCard(idOff);
    }
  }, [idOff]);


  if (!offerCard || !nearbyOffers || !comments) {
    return (
      <Spinner />
    );
  }

  const markers = pointsMap(nearbyOffers);
  const {images, isPremium, title, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description} = offerCard;
  const {avatarUrl, name, isPro} = host;
  const premium = isPremium ? `Premium` : ``;
  const active = isFavorite ? `property__bookmark-button--active` : ``;
  const pro = isPro ? `Pro` : ``;


  return (
    <>
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((img) => (
                <div className="property__image-wrapper" key = {img}>
                  <img className="property__image" src={img} alt="Photo studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>{premium}</span>
                </div>
              )}

              <div className="property__name-wrapper" id={id}>
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={`property__bookmark-button button ${active}`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${rating * STAR_WIDTH}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => (
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${isPro ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={`${avatarUrl}`} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                  <span className="property__user-status">
                    {pro}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <Reviews comments={comments} id={id}/>
                <ComponentForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map markers={markers}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((cart) => <OfferCart key = {cart.id} cart={cart}/>)}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};


const mapStateToProps = (state) => ({
  offerCard: getOfferData(state),
  nearbyOffers: getNearbyOffers(state),
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadCard(idOff) {
    dispatch(fetchOfferCard(idOff));
    dispatch(nearbyOffers(idOff));
    dispatch(fetchComments(idOff));
  }
});


OfferPage.propTypes = {
  offerCard: PropTypes.object,
  nearbyOffers: PropTypes.array,
  comments: commentFormProp,
  onLoadCard: PropTypes.func.isRequired,
};


export {OfferPage};
export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
