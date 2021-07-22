import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={currentUser.avatar} alt="portrait of user" className="profile__avatar" />
                    <div className="profile__avatar-edit-container">
                        <button aria-label="Edit" type="button" className="profile__avatar-edit" onClick={props.onEditAvatar}></button>
                    </div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button aria-label="Edit" type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button aria-label="Add" type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="cards">
                {props.cards.map((card) => {
                    return (<Card key={card._id}
                        card={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.handleCardLike}
                        onCardDelete={props.handleCardDelete}
                    />
                    )
                })}
            </section>
        </main>
    );
}

export default Main;