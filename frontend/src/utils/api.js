// Token: 1700817e-a1e9-4638-acf5-4cd690372eaf
// Group ID: group-9

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
    getUserInfo() {
        return fetch(this.baseUrl + "/users/me", {
            method: "GET",
            headers: this.headers
        }).then(this._checkResponse);

    }
    updateUserInfo({ name, about }) {
        return fetch(this.baseUrl + "/users/me", {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name,
                about
            })
        }).then(this._checkResponse);
    }
    updateUserAvatar(avatar) {
        return fetch(this.baseUrl + "/users/me/avatar", {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar
            })
        }).then(this._checkResponse);
    }

    getInitialCards() {
        return fetch(this.baseUrl + "/cards", {
            method: "GET",
            headers: this.headers
        }).then(this._checkResponse);
    }
    getAppInfo() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()]);
    }
    postCard(card) {
        return fetch(this.baseUrl + "/cards", {
            method: "POST",
            body: JSON.stringify({
                name: card.name,
                link: card.link
            }),
            headers: this.headers
        }).then(this._checkResponse);
    }
    deleteCard(cardId) {
        return fetch(this.baseUrl + "/cards/" + cardId, {
            method: "DELETE",
            headers: this.headers
        }).then(this._checkResponse);
    }
    addLike(cardId) {
        return fetch(this.baseUrl + "/cards/likes/" + cardId, {
            method: "PUT",
            headers: this.headers
        }).then(this._checkResponse);
    }
    removeLike(cardId) {
        return fetch(this.baseUrl + "/cards/likes/" + cardId, {
            method: "DELETE",
            headers: this.headers
        }).then(this._checkResponse);
    }

}


const api = new Api({
    baseUrl: "https://api.assel.students.nomoreparties.site",
    headers: {
        authorization: "1700817e-a1e9-4638-acf5-4cd690372eaf",
        "Content-Type": "application/json"
    }
});

export default api;
