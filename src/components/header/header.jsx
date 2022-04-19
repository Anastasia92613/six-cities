import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {logout} from "../api/api-action";
import {AutorizationStatus} from "../const";
import cookie from "cookie_js";
import {checkAutorization} from "../store/autorization/selectors";
import {getUserData} from "../store/user-data/selectors";


const Header = ({authorizationStatus, onLogout, userInfo}) => {

  const onSetLogout = () => {
    onLogout();
    cookie.set(`checkAuth`, `false`);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link to={`/favorites`} className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {authorizationStatus === AutorizationStatus.AUTH ? (userInfo && <span className="header__user-name user__name">{userInfo.email}</span>) : <span className="header__login">Sign in</span>}
                </Link>
              </li>
              <li className="header__nav-item"
                onClick= {() => onSetLogout()}>
                <Link to={`/`} className="header__nav-link header__nav-link--profile">
                  {authorizationStatus === AutorizationStatus.AUTH ? <span className="header__login">Выход</span> : ``}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
};

const mapStateToProps = (state) => ({
  authorizationStatus: checkAutorization(state),
  userInfo: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    dispatch(logout());
  }
});

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
