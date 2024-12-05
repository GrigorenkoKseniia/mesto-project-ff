
const cardTemplate = document.querySelector('#card-template').content;

const cardList = document.querySelector('.places__list');

const deleteCard = function (evt) {
    const eventTarget = evt.target;
    eventTarget.parentElement.remove();
};

function createCard(item, deleteCard) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    cardImage.src = item.link;
    cardImage.alt = item.name; 
    cardItem.querySelector('.card__title').textContent = item.name;

    cardItem.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    return cardItem;
}

initialCards.forEach((item) => {
    const cardElement = createCard(item, deleteCard);
    cardList.append(cardElement);
});

