import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AutorizationStatus} from "../const";
import PropTypes from "prop-types";
import {checkAutorization} from "../store/autorization/selectors";

const PrivateRoute = ({render, path, exact, authorizationStatus}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => {
        return (
          authorizationStatus === AutorizationStatus.AUTH
            ? render(routeProps)
            : <Redirect to={`/login`}/>
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  authorizationStatus: checkAutorization(state),
});


export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
