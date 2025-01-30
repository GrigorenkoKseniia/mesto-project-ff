import './pages/index.css';
import { initialCards } from './scripts/cards';
import { openPopup, closePopup } from './scripts/modal';
import { createCard, deleteCard, doLike } from './scripts/card';



const cardList = document.querySelector('.places__list');

const popups = Array.from(document.querySelectorAll(".popup"));
const btnOpenPopupProfile = document.querySelector('.profile__edit-button');
const btnOpenPopupNewCard = document.querySelector('.profile__add-button');
const popupProfil = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupFormProfile = document.forms["edit-profile"];
const popupInputNameProfile = popupFormProfile.elements.name;
const popupInputDscrptProfile = popupFormProfile.elements.description;

const popupFormCard = document.forms["new-place"];
const popupInputNameCard = popupFormCard.elements["place-name"];
const popupInputLinkCard = popupFormCard.elements.link;

//ф-ция клик по изображению
const openPopupImage = function (evt) {
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    const image = evt.target;
    popupImage.src = image.src
    popupImage.alt = image.alt;
    popupCaption.textContent = image.alt;
    openPopup(document.querySelector('.popup_type_image'));
}


// Создание карточек из массива и добавление их на стриницу
initialCards.forEach((item) => {
    const cardElement = createCard(item, deleteCard, doLike, openPopupImage);
    cardList.append(cardElement);
});

// Добавление плавности при открытии и закрытии попапа
popups.forEach((item) => {
    item.classList.add("popup_is-animated");
});


//ОС при клике на кнопку РП
btnOpenPopupProfile.addEventListener('click', function () {
    popupInputNameProfile.value = profileTitle.textContent;
    popupInputDscrptProfile.value = profileDescription.textContent;
    openPopup(popupProfil);
});

//ф-ция отправки формы РП
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupInputNameProfile.value;
    profileDescription.textContent = popupInputDscrptProfile.value;
    closePopup(popupProfil);
}

//ОС отправки формы РП
popupFormProfile.addEventListener('submit', handleFormSubmit);


// ОС при клике по кнопке НК
btnOpenPopupNewCard.addEventListener('click', function () {
    openPopup(popupNewCard);
});

//ф-ция отправки формы НК
function formSubmitCard(evt) {
    evt.preventDefault();
    const card = {
        name: popupInputNameCard.value,
        link: popupInputLinkCard.value
    };
    const cardElement = createCard(card, deleteCard, doLike, openPopupImage);
    cardList.prepend(cardElement);
    closePopup(popupNewCard);
    popupFormCard.reset();
}
//ОС отправки формы НК
popupFormCard.addEventListener('submit', formSubmitCard);

