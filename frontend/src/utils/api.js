
class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  getUserInfo(token) {
    return fetch(this.baseUrl + "/users/me", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }).then(this._checkResponse);

  }
  updateUserInfo(token, { name, about }) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about
      })
    }).then(this._checkResponse);
  }
  updateUserAvatar(token, avatar) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar
      })
    }).then(this._checkResponse);
  }

  getInitialCards(token) {
    return fetch(this.baseUrl + "/cards", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }).then(this._checkResponse);
  }
  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
  postCard(token, card) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      body: JSON.stringify({
        name: card.name,
        link: card.link
      }),
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }).then(this._checkResponse);
  }
  deleteCard(token, cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }).then(this._checkResponse);
  }
  addLike(token, cardId) {
    return fetch(this.baseUrl + "/cards/likes/" + cardId, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }).then(this._checkResponse);
  }
  removeLike(token, cardId) {
    return fetch(this.baseUrl + "/cards/likes/" + cardId, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }).then(this._checkResponse);
  }

}


const api = new Api({
  baseUrl: "https://api.assel.students.nomoreparties.site",
  headers: {
    "Content-Type": "application/json",
  }
});

export default api;
