import React, {useEffect} from "react";
import {connect, useStore} from "react-redux";
import PropTypes from "prop-types";
import {checkAutorization} from "../store/autorization/selectors";
import {checkAuth} from "../api/api-action";

const CheckAutch = ({authorizationStatus, children}) => {
  const store = useStore();

  useEffect(() => {
    store.dispatch(checkAuth());
  }, []);

  return authorizationStatus ? children : null;
};

const mapStateToProps = (state) => ({
  authorizationStatus: checkAutorization(state),
});

CheckAutch.propTypes = {
  authorizationStatus: PropTypes.string,
};

export {CheckAutch};
export default connect(mapStateToProps, null)(CheckAutch);
