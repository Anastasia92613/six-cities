import PropTypes from "prop-types";


const propCart = (component) => {
  return (
    component.propTypes = {
      cart: PropTypes.shape(
          {
            id: PropTypes.number.isRequired,
            isPremium: PropTypes.bool.isRequired,
            isFavorite: PropTypes.bool.isRequired,
            previewImage: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
          }.isRequired,
      ),
    }
  );
};

const propCard = (component) => {
  return (
    component.propTypes = {
      card: PropTypes.shape(
          {
            bedrooms: PropTypes.number.isRequired,
            city: PropTypes.object.isRequired,
            description: PropTypes.string.isRequired,
            goods: PropTypes.array.isRequired,
            host: PropTypes.object.isRequired,
            id: PropTypes.number.isRequired,
            images: PropTypes.array.isRequired,
            isFavorite: PropTypes.bool.isRequired,
            isPremium: PropTypes.bool.isRequired,
            location: PropTypes.object.isRequired,
            maxAdults: PropTypes.number.isRequired,
            previewImage: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            rating: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
          }.isRequired,
      ),
    }
  );
};


export {propCart, propCard};
