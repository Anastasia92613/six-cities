import React, {useCallback, useEffect, useState} from "react";
import {sendComment} from "../api/api-action";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";
import {checkAutorization} from "../store/autorization/selectors";
import {AutorizationStatus, reviuewRequestStatus} from "../const";
import {getErrorRequest, getReviuewRequestStatus} from "../store/comments-data/selectors";

const RATING_LIST = Array.from({length: 5}).fill(1);

const ComponentForm = ({authorizationStatus, onSubmit, loading, error}) => {
  // Проверка на авторизацию
  const isAuth = authorizationStatus === AutorizationStatus.AUTH ? true : false;

  // Получение id из url
  const {id} = useParams();
  const idOff = Number(id);

  // Логика работы формы
  const [selectedStart, setSelectedStar] = useState(null);
  const [commentText, setCommentText] = useState(``);

  const handleSelectedStarsChange = useCallback((evt) => {
    setSelectedStar(evt.target.value);
  }, []);
  const handleCommentTextChange = useCallback((evt) => {
    setCommentText(evt.target.value);
  }, []);

  const hadleSubmit = (evt) => {

    evt.preventDefault();

    onSubmit(idOff, {
      comment: commentText,
      rating: selectedStart,
    });
  };

  // Очистка формы
  useEffect(() => {
    if (loading === reviuewRequestStatus.FULFILLED && error === false) {
      setSelectedStar(null);
      setCommentText(``);
    }
  }, [loading]);

  return (
    (isAuth && <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={hadleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_LIST.map((item, index) => {
          const value = `${RATING_LIST.length - index}`;
          const id = `${value}-stars`;
          return (
            <React.Fragment key={`${index}`} >
              <input className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={id}
                checked={value === selectedStart}
                type="radio"
                onChange={handleSelectedStarsChange}/>
              <label htmlFor={id} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment >
          );
        })}
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={commentText}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleCommentTextChange}/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>)

  );
};

ComponentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string,
  loading: PropTypes.string,
  error: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authorizationStatus: checkAutorization(state),
  loading: getReviuewRequestStatus(state),
  error: getErrorRequest(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(idOff, commentData) {
    dispatch(sendComment(idOff, commentData));
  }
});

export {ComponentForm};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentForm);
