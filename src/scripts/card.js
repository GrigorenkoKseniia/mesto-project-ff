const cardTemplate = document.querySelector('#card-template').content;


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
function createCard(item, {onDeleteCard, onLikeCard, onOpenPreview} = {}) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const btnLike = cardItem.querySelector('.card__like-button');
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardItem.querySelector('.card__title').textContent = item.name;

    cardItem.querySelector('.card__delete-button').addEventListener('click', () => onDeleteCard(cardItem));

    cardImage.addEventListener('click', onOpenPreview);

    btnLike.addEventListener('click', onLikeCard);

    return cardItem;
}

export { createCard, onDeleteCard, onLikeCard };