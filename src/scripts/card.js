
import { deleteCard, putLike, removeLike } from "./api";
import { openPopup, closePopup } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;

let currentDeleteInfo = null;

const popupDelete = document.querySelector('.popup_type_delete');
const popupBtnDelete = popupDelete.querySelector('.popup__button-delete');

popupBtnDelete.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (currentDeleteInfo) {
        deleteCard(currentDeleteInfo.item)
            .then(() => {
                closePopup(popupDelete);
                onDeleteCard(currentDeleteInfo.cardItem);
                currentDeleteInfo = null;
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }
})

// удаление карточки
const onDeleteCard = function (cardElement) {
    cardElement.remove();
};


// функция Like
const onLikeCard = function (evt) {
    const likeTarget = evt.target;
    likeTarget.classList.toggle("card__like-button_is-active");
}

// Создание карточки
function createCard(item, userId, { onOpenPreview } = {}) {

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
        btnDelete.addEventListener('click', () => {
            openPopup(popupDelete);
            currentDeleteInfo = { item, cardItem }
        });
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