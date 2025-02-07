import { putLike, removeLike } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

// Создание карточки
function createCard(item, userId, { onOpenPreview, onDeleteCard } = {}) {

    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const btnLike = cardItem.querySelector('.card__like-button');
    const btnDelete = cardItem.querySelector('.card__delete-button');
    const cardNumberLike = cardItem.querySelector('.card__number-like');

    if (item.likes.some(like => like._id === userId)) {
        btnLike.classList.add("card__like-button_is-active");
    }
    cardNumberLike.textContent = item.likes.length;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardItem.querySelector('.card__title').textContent = item.name;

    if (item.owner._id !== userId) {
        btnDelete.remove();
    } else {
        btnDelete.addEventListener('click', () => onDeleteCard(item, cardItem));
    }

    cardImage.addEventListener('click', onOpenPreview);

    btnLike.addEventListener('click', function () {
        if (btnLike.classList.contains("card__like-button_is-active")) {
            removeLike(item)
                .then((item) => {
                    btnLike.classList.remove("card__like-button_is-active");
                    cardNumberLike.textContent = item.likes.length;
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        } else {
            putLike(item)
                .then((item) => {
                    btnLike.classList.add("card__like-button_is-active");
                    cardNumberLike.textContent = item.likes.length;
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }

    });

    return cardItem;
}


export { createCard };