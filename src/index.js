import './pages/index.css';
import { openPopup, closePopup, setModalWindowEventListener } from './scripts/modal';
import { createCard } from './scripts/card';
import { clearValidation, enableValidation, disabledButtonForUrl } from './scripts/validation';
import { getInitialCards, getUser, renameUser, addNewCard, addNewAvatar, trueOrFalseURL, deleteCard } from './scripts/api';

const cardList = document.querySelector('.places__list');

const popups = document.querySelectorAll(".popup");
const btnOpenPopupProfile = document.querySelector('.profile__edit-button');
const btnOpenPopupNewCard = document.querySelector('.profile__add-button');
const btnOpenPopupAvatar = document.querySelector('.profile__image');

const popupProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupAvatar = document.querySelector('.popup_type_avatar');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image')

const popupFormProfile = document.forms["edit-profile"];
const popupInputNameProfile = popupFormProfile.elements.name;
const popupInputDscrptProfile = popupFormProfile.elements.description;

const popupFormCard = document.forms["new-place"];
const popupInputNameCard = popupFormCard.elements["place-name"];
const popupInputLinkCard = popupFormCard.elements.link;

const popupFormImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const popupFormAvatar = document.forms["avatar"];
const popupInputLinkAvatar = popupFormAvatar.elements["link-input-avatar"];

let userId;
let currentDeleteInfo;

const validationSet = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const popupDelete = document.querySelector('.popup_type_delete');
const popupBtnDelete = popupDelete.querySelector('.popup__button-delete');

popupBtnDelete.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (currentDeleteInfo) {
        deleteCard(currentDeleteInfo.item)
            .then(() => {
                closePopup(popupDelete);
                currentDeleteInfo.cardItem.remove();
                currentDeleteInfo = null;
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }
})

// удаление карточки
const onDeleteCard = function (item, cardItem) {
    openPopup(popupDelete);
    currentDeleteInfo = { item, cardItem };

};

//ф-ция клик по изображению
const onOpenPreview = function (evt) {
    const image = evt.target;
    popupImage.src = image.src
    popupImage.alt = image.alt;
    popupCaption.textContent = image.alt;
    openPopup(popupFormImage);
};

//звгрузка аользователя и карточек
Promise.all([getUser(), getInitialCards()])
    .then(([user, cards]) => {
        profileTitle.textContent = user.name;
        profileDescription.textContent = user.about;
        profileImage.style.backgroundImage = `url(${user.avatar})`;
        userId = user._id;

        cards.forEach((item) => {
            const cardElement = createCard(item, userId, { onOpenPreview, onDeleteCard });
            cardList.append(cardElement);
        });
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

// Добавление плавности при открытии и закрытии попапа
popups.forEach((item) => {
    item.classList.add("popup_is-animated");
    setModalWindowEventListener(item);
});

//ОС при клике на кнопку РП
btnOpenPopupProfile.addEventListener('click', function () {
    popupInputNameProfile.value = profileTitle.textContent;
    popupInputDscrptProfile.value = profileDescription.textContent;
    clearValidation(popupFormProfile, validationSet);
    openPopup(popupProfile);
});

//ф-ция отправки формы РП
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    save(true, popupFormProfile);
    const user = {
        name: popupInputNameProfile.value,
        description: popupInputDscrptProfile.value
    };

    renameUser(user)
        .then((user) => {
            profileTitle.textContent = user.name;
            profileDescription.textContent = user.about;
            closePopup(popupProfile);
        })
        .catch((err) => {
            console.log(`Ошибка в обновлении профиля: ${err}`);
        })
        .finally(() => {
            save(false, popupFormProfile);
        });
}

function save(isLoading, popup) {
    if (isLoading) {
        popup.querySelector('.popup__button').textContent = "Сохранение...";
    } else {
        popup.querySelector('.popup__button').textContent = "Сохранить";
    }

}

//ОС отправки формы РП
popupFormProfile.addEventListener('submit', handleFormSubmitProfile);

// ОС при клике по кнопке НК
btnOpenPopupNewCard.addEventListener('click', function () {
    clearValidation(popupFormCard, validationSet);
    popupFormCard.reset();
    openPopup(popupNewCard);
});

//ф-ция отправки формы НК
function handleFormSubmitCard(evt) {
    evt.preventDefault();
    const card = {
        name: popupInputNameCard.value,
        link: popupInputLinkCard.value
    };

    trueOrFalseURL(card.link)
        .then((res) => {
            if (res) {
                save(true, popupFormCard);
                addNewCard(card)
                    .then((card) => {
                        const cardElement = createCard(card, userId, { onOpenPreview, onDeleteCard });
                        cardList.prepend(cardElement);
                        closePopup(popupNewCard);
                        clearValidation(popupFormCard, validationSet);
                    })
                    .catch((err) => {
                        console.log(`Ошибка добавления карточки: ${err}`);
                    })
                    .finally(() => {
                        save(false, popupFormCard);
                    });
            } else {
                popupFormCard.querySelector('.popup__link-error').textContent = 'Данная ссылка не является картинкой';
                disabledButtonForUrl(popupFormCard, validationSet);
            }
        })
}

//ОС отправки формы НК
popupFormCard.addEventListener('submit', handleFormSubmitCard);



//ОС при клике на аватвр
btnOpenPopupAvatar.addEventListener('click', function () {
    clearValidation(popupFormAvatar, validationSet);
    popupFormAvatar.reset();
    openPopup(popupAvatar);
});

//ф-ция отправки формы аватара
function handleFormSubmitAvatar(evt) {
    evt.preventDefault();

    const linkAvatar = popupInputLinkAvatar.value;

    trueOrFalseURL(linkAvatar)
        .then((res) => {
            if (res) {
                save(true, popupFormAvatar);
                addNewAvatar(linkAvatar)
                    .then((user) => {
                        profileImage.style.backgroundImage = `url(${user.avatar})`;
                        closePopup(popupAvatar);
                    })
                    .catch((err) => {
                        console.log(`Ошибка добавления аватара: ${err}`);
                    })
                    .finally(() => {
                        save(false, popupFormAvatar);
                    });
            } else {
                popupFormAvatar.querySelector('.popup__link-error').textContent = 'Данная ссылка не является картинкой';
                disabledButtonForUrl(popupFormAvatar, validationSet);
            }
        })
}

//ОС отправки формы аватара
popupFormAvatar.addEventListener('submit', handleFormSubmitAvatar);


enableValidation(validationSet);


