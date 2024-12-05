
const cardTemplate = document.querySelector('#card-template').content;

const cardList = document.querySelector('.places__list');

const deleteCard = function (evt) {
    const eventTarget = evt.target;
    eventTarget.parentElement.remove();
};

function card(item, deleteCard) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    cardItem.querySelector('.card__image').src = item.link;
    cardItem.querySelector('.card__image').alt = item.name;
    cardItem.querySelector('.card__title').textContent = item.name;

    cardItem.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    return cardItem;
}

initialCards.forEach((item) => {
    const cardElement = card(item, deleteCard);
    cardList.append(cardElement);
});

