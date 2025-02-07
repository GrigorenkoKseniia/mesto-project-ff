const config = {
    baseUrl: 'https://mesto.nomoreparties.co./v1/wff-cohort-31',
    headers: {
        authorization: '35da684b-9c50-421b-9cf8-281c9be273db',
        'Content-Type': 'application/json'
    }
};

function thenResJson(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

function getUser() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then((res) => thenResJson(res))
}

function getInitialCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then((res) => thenResJson(res))
}


function renameUser(user) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: user.name,
            about: user.description
        })
    })
        .then((res) => thenResJson(res))
}

function addNewCard(card) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: card.name,
            link: card.link
        })
    })
        .then((res) => thenResJson(res))

}

function deleteCard(card) {
    return fetch(`${config.baseUrl}/cards/${card._id}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then((res) => thenResJson(res))

}

function putLike(card) {
    return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then((res) => thenResJson(res))
}

function removeLike(card) {
    return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then((res) => thenResJson(res))
}

function trueOrFalseURL(url) {
    return fetch(url, {
        method: 'HEAD'
    })
        .then((res) => {
            const contentType = res.headers.get('Content-Type');
            const regex = /^image\//;
            if (regex.test(contentType)) {
                return true;
            }
            return false;
        })
        .catch(() => {
            console.log('Произошла ошибка');
        })
}


function addNewAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
    })
        .then((res) => thenResJson(res))
}


export { getInitialCards, getUser, renameUser, addNewCard, deleteCard, putLike, removeLike, addNewAvatar, trueOrFalseURL };