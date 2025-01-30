import './pages/index.css';
import { initialCards } from './scripts/cards';
import { openPopup, closePopup, setModalWindowEventListener } from './scripts/modal';
import { createCard, onDeleteCard, onLikeCard } from './scripts/card';



const cardList = document.querySelector('.places__list');

const popups = document.querySelectorAll(".popup");
const btnOpenPopupProfile = document.querySelector('.profile__edit-button');
const btnOpenPopupNewCard = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_edit');
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
const onOpenPreview = function (evt) {
    const popupFormImage = document.querySelector('.popup_type_image');
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');
    const image = evt.target;
    popupImage.src = image.src
    popupImage.alt = image.alt;
    popupCaption.textContent = image.alt;
    openPopup(popupFormImage);
}


// Создание карточек из массива и добавление их на стриницу
initialCards.forEach((item) => {
    const cardElement = createCard(item, { onDeleteCard, onLikeCard, onOpenPreview });
    cardList.append(cardElement);
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
    openPopup(popupProfile);
});

//ф-ция отправки формы РП
function handleFormSubmitProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupInputNameProfile.value;
    profileDescription.textContent = popupInputDscrptProfile.value;
    closePopup(popupProfile);
}

//ОС отправки формы РП
popupFormProfile.addEventListener('submit', handleFormSubmitProfile);


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
    const cardElement = createCard(card, { onDeleteCard, onLikeCard, onOpenPreview });
    cardList.prepend(cardElement);
    closePopup(popupNewCard);
    popupFormCard.reset();
}
//ОС отправки формы НК
popupFormCard.addEventListener('submit', formSubmitCard);

