import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import Header from "./Header";
import Login from './Login';
import Register from './Register';
import * as auth from '../utils/auth';
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from './ConfirmPopup';
import InfoTooltip from './InfoTooltip';
import success from '../images/success.svg';
import failed from '../images/union.svg';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [isAddPlaceModalOpen, setAddPlaceModalOpen] = useState(false);
  const [isEditAvatarModalOpen, setEditAvatarModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [confirmDeletePopup, setConfirmDeletePopup] = useState({ isOpen: false, id: '' });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [registerStatus, setRegisterStatus] = useState({ registered: false, showModal: false });
  const [token, setToken] = useState(() => localStorage.getItem('jwt'));

  useEffect(() => {
    function handleTokenCheck() {
      if (token) {
        auth.checkToken(token).then(() => {
          setLoggedIn(true);
        }).then(() => {
          history.push('/');
        });
      }
    }
    handleTokenCheck();
  }, [history, token]);

  useEffect(() => {
    api.getUserInfo(token).then((res) => {
      setCurrentUser(res.user);
    }).catch((err) => {
      console.log(err);
    });
  }, [token]);

  useEffect(() => {
    api.getInitialCards(token).then((res) => {
      setCards(res);
    }).catch((err) => {
      console.log(err);
    });
  }, [token]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (isLiked) {
      api.removeLike(token, card._id).then((newCard) => {
        setCards(cards.map((c) => {
          return c._id === newCard._id ? newCard : c
        }))
      }).catch((err) => {
        console.log(err);
      });
    } else {
      api.addLike(token, card._id).then((newCard) => {
        setCards(cards.map((c) => {
          return c._id === newCard._id ? newCard : c
        }))
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  function handleEditAvatarClick() {
    setEditAvatarModalOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfileModalOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceModalOpen(true);
  }

  function handleCloseAllModals() {
    setEditAvatarModalOpen(false);
    setEditProfileModalOpen(false);
    setAddPlaceModalOpen(false);
    setConfirmDeletePopup({ isOpen: false, id: null })
    setSelectedCard({});
  }

  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
  }

  function handleUpdateUser({ name, about }) {
    api.updateUserInfo(token, { name, about }).then((res) => {
      setCurrentUser(res.user);
      handleCloseAllModals();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateUserAvatar(avatar) {
    api.updateUserAvatar(token, avatar).then((res) => {
      setCurrentUser(res.user);
      handleCloseAllModals();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    setConfirmDeletePopup({ isOpen: true, id: card._id });
  }

  function handleCardDeleteConfirm() {
    if (confirmDeletePopup.isOpen && confirmDeletePopup.id) {
      api.deleteCard(token, confirmDeletePopup.id).then(() => {
        setCards(cards.filter((c) => {
          return c._id !== confirmDeletePopup.id;
        }));
        handleCloseAllModals();
      }).catch((err) => {
        console.log(err);
      });
    } else {
      return
    }
  }

  function handleAddPlace(card) {
    api.postCard(token, card).then((newCard) => {
      setCards([newCard, ...cards]);
      handleCloseAllModals();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleSignOut() {
    setToken('');
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleAuthorize(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          handleLogin();
          setToken(data.token);
          history.push('/');
        }
      })
      .catch(err => console.log(err));
  }

  function handleRegister(email, password) {
    auth.register(email, password).then((res) => {
      if (res) {
        setRegisterStatus({ registered: true, showModal: true });
      } else {
        setRegisterStatus({ showModal: true });
      }
    });
  }

  function handleInfoTooltipClose() {
    if (registerStatus.showModal && registerStatus.registered) {
      setRegisterStatus({ showModal: false });
      history.push('/signin');
    } else {
      setRegisterStatus({ showModal: false });
    }
  }

  let InfoTooltipMessage;
  let InfoTooltipImgSrc;
  if (registerStatus.showModal && registerStatus.registered) {
    InfoTooltipMessage = 'Success! You have now been registered.'
    InfoTooltipImgSrc = success;
  } else if (registerStatus.showModal) {
    InfoTooltipMessage = 'Oops, something went wrong! Please try again.'
    InfoTooltipImgSrc = failed;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header handleSignOut={handleSignOut} />
        <Switch>
          <Route path="/signup">
            <Register handleRegister={handleRegister} />
            {registerStatus.showModal && <InfoTooltip onClose={handleInfoTooltipClose} message={InfoTooltipMessage} imgSrc={InfoTooltipImgSrc} />}
          </Route>
          <Route path="/signin">
            <Login handleAuthorize={handleAuthorize} />
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete} component={Main} />

        </Switch>

        <Footer />

        <EditProfilePopup isOpen={isEditProfileModalOpen} onClose={handleCloseAllModals} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarModalOpen} onClose={handleCloseAllModals} onUpdateUserAvatar={handleUpdateUserAvatar} />
        <AddPlacePopup isOpen={isAddPlaceModalOpen} onClose={handleCloseAllModals} onAddPlace={handleAddPlace} />
        <ImagePopup card={selectedCard} onClose={handleCloseAllModals} />
        <ConfirmPopup isOpen={confirmDeletePopup.isOpen} onClose={handleCloseAllModals} handleCardDeleteConfirm={handleCardDeleteConfirm} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
