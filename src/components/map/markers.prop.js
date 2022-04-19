import PropTypes from "prop-types";

export default PropTypes.arrayOf(
    PropTypes.shape(
        {
          id: PropTypes.number.isRequired,
          city: PropTypes.string.isRequired,
          location: PropTypes.shape(
              {
                latitude: PropTypes.number.isRequired,
                longitude: PropTypes.number.isRequired,
                zoom: PropTypes.number.isRequired,
              }
          ),
          points: PropTypes.array.isRequired,
        }
    )
).isRequired;
