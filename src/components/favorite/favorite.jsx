import React from "react";
import PropTypes from "prop-types";
import FavoriteItem from "../favorite-item/favorite-item";

const Favorite = ({cart}) => {
  const {city, id, list} = cart;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item" >
          <a className="locations__item-link" href="#" key={id}>
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {list.map((item) => <FavoriteItem key = {item.id} item={item}/>)}
      </div>
    </li>
  );
};


Favorite.propTypes = {
  cart: PropTypes.shape(
      {
        city: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        list: PropTypes.array.isRequired,
      }.isRequired,
  ),
};


export default Favorite;
