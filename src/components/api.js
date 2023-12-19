export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: '29e47ff3-c405-4d45-9bbb-503bd9191003',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const deleteCardFromServer = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-2/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '29e47ff3-c405-4d45-9bbb-503bd9191003'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Ошибка: ${response.status}`);
    });
};


export function postLike(cardId) {
  const apiUrl = `${config.baseUrl}/cards/likes/${cardId}`;
  return fetch(apiUrl, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(error => {
      console.error('Ошибка постановки лайка:', error);
    });
}

export function deleteLike(cardId) {
  const apiUrl = `${config.baseUrl}/cards/likes/${cardId}`;
  return fetch(apiUrl, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(error => {
      console.error('Ошибка снятия лайка:', error);
    });
}

export const updateAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',

    headers: config.headers,

    body: JSON.stringify({ avatar: avatarLink })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}