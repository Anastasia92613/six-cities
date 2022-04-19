import PropTypes from "prop-types";

export default PropTypes.arrayOf(
    PropTypes.shape(
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
        }
    )
);
