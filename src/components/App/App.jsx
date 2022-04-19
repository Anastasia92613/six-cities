import React, {useEffect} from "react";
import MainPage from "../main-page/main-page";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Login from "../login/login";
import {AutorizationStatus, citys, options} from "../const";
import OfferPage from "../offer-page/offer-page";
import Favorites from "../favorites/favorites";
import PrivateRoute from "../private-route/private-route";
import PropTypes from "prop-types";
import {fetchUserInfo} from "../api/api-action";
import {connect} from "react-redux";
import {checkAutorization} from "../store/autorization/selectors";
import NotFoundPage from "../not-found-page/not-found-page";


const App = ({authorizationStatus, onloadUserInfo}) => {
  useEffect(() => {
    if (authorizationStatus === AutorizationStatus.AUTH) {
      onloadUserInfo();
    }
  }, [authorizationStatus]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login/>
        </Route>
        <PrivateRoute
          exact
          path="/favorites"
          render={() => <Favorites/>}>
        </PrivateRoute>
        <Route exact path="/:activeCity/offer/:id">
          <OfferPage />
        </Route>
        <Route exact path="/:activeCity">
          <MainPage citys={citys} options={options}/>
        </Route>
        <Route exact path="/">
          <MainPage citys={citys} options={options}/>
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  onloadUserInfo: PropTypes.func,
};

const mapStateToProps = (state) => ({
  authorizationStatus: checkAutorization(state),
});

const mapDispatchToProps = (dispatch) => ({
  onloadUserInfo() {
    dispatch(fetchUserInfo());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
