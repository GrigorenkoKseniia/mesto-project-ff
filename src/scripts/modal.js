
//ф-ция открытия МО
function openPopup(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closePopupEsc);
    popup.addEventListener("mousedown", closePopupMouse);

}

//ф-ция закрытия МО
function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closePopupEsc);
    popup.removeEventListener("mousedown", closePopupMouse);
}

//ф-ция закрытия МО по кнопке esc
function closePopupEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpen = document.querySelector(".popup_is-opened");
        closePopup(popupOpen);
    }
}

//ф-ция закрытия МО кликом на оверлей
function closePopupMouse(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target); 
    }
}

const setModalWindowEventListener = (popup) => {
    popup.querySelector('.popup__close').addEventListener('click', () => closePopup(popup));
}

export { openPopup, closePopup, setModalWindowEventListener };