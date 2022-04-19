import PropTypes from "prop-types";

export default PropTypes.arrayOf(
    PropTypes.shape(
        {
          comment: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
          rating: PropTypes.number.isRequired,
          user: PropTypes.object.isRequired,
        }
    ),
);
