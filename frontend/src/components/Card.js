import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? "" : 'card__delete-button_disabled'}`
  );
  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button ${isLiked ? "card__like-button_active" : 'card__like-button_disabled'}`
  );
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <div className="card">
      <button aria-label="delete" type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img src={props.card.link} alt={props.card.name} className="card__image" onClick={handleClick} />
      <h2 className="card__text">{props.card.name}</h2>
      <div className="card__like">
        <button aria-label="Like" type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
        <div className="card__like-overlay"></div>
        <p className="card__like-count">{props.card.likes.length}</p>
      </div>
    </div>
  );
}

export default Card;
