export const BASE_URL = 'https://api.assel.students.nomoreparties.site';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Content-Security-Policy': default-src 'self'; script-src 'self' https://register.nomoreparties.co;,
    },
    body: JSON.stringify({
      email,
      password
    })
  }).then((response) => {
    return response.json();
  }).then((res) => {
    return res;
  }).catch((err) => console.log(err));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  }).then((response => response.json()))
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    }).catch(err => console.log(err))
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then(data => data).catch(err => console.log(err))
}
