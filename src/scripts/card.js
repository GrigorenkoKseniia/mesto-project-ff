import { openPopup } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;


// удаление карточки
const deleteCard = function (evt) {
    const eventTarget = evt.target;
    eventTarget.parentElement.remove();
};


// функция Like
const doLike = function (evt) {
    const likeTarget = evt.target;
    if (!likeTarget.classList.contains("card__like-button_is-active")) {
        likeTarget.classList.add("card__like-button_is-active");
    } else {
        likeTarget.classList.remove("card__like-button_is-active");
    }
}

// Создание карточки
function createCard(item, deleteCard, doLike, openPopupImage) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const btnLike = cardItem.querySelector('.card__like-button');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardItem.querySelector('.card__title').textContent = item.name;

    cardItem.querySelector('.card__delete-button').addEventListener('click', deleteCard);

    cardImage.addEventListener('click', openPopupImage);

    btnLike.addEventListener('click', doLike);

    return cardItem;
}

export { createCard, deleteCard, doLike };