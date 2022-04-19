import React from "react";
import commentFormProp from "../component-form/comment-form.prop";
import {connect} from "react-redux";
import {getComments} from "../store/comments-data/selectors";

const STAR_WIDTH = 20;

const Reviews = ({comments}) => {
  const testArray = comments;
  const sortedArray = testArray.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{sortedArray.length}</span></h2>
      <ul className="reviews__list">
        {sortedArray.map((comm) =>{
          const {comment, date, rating, id, user} = comm;
          const monthNames = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
          const convDate = new Date(date);
          let year = convDate.getFullYear();
          const {name, avatarUrl} = user;
          return (
            <li className="reviews__item" key={id}>
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img className="reviews__avatar user__avatar" src={`${avatarUrl}`} width="54" height="54" alt="Reviews avatar"/>
                </div>
                <span className="reviews__user-name">
                  {name}
                </span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{width: `${rating * STAR_WIDTH}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">
                  {comment}
                </p>
                <time className="reviews__time" dateTime="2019-04-24">{`${monthNames[convDate.getMonth()]} ${year}`}</time>
              </div>
            </li>
          );
        })}

      </ul>
    </>
  );
};

Reviews.protoType = {
  comments: commentFormProp,
};

const mapStateToProps = (state) => ({
  comments: getComments(state),
});


export {Reviews};
export default connect(mapStateToProps)(Reviews);
