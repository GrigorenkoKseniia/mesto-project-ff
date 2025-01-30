
//ф-ция открытия МО
function openPopup(popup) {
    popup.classList.add("popup_is-opened");
    popup.querySelector('.popup__close').addEventListener('click', function () {
        closePopup(popup);
    });
    document.addEventListener("keydown", escClosePopup)
    popup.addEventListener("click", mouseClosePopup);

}

//ф-ция закрытия МО
function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", escClosePopup);
    popup.removeEventListener("click", mouseClosePopup);
}

//ф-ция закрытия МО по кнопке esc
function escClosePopup(evt) {
    if (evt.key === "Escape") {
        const popupOpen = document.querySelector(".popup_is-opened");
        closePopup(popupOpen);
    }
}

//ф-ция закрытия МО кликом на оверлей
function mouseClosePopup(evt) {
    if (evt.target === evt.currentTarget) {
        const popupOpen = document.querySelector(".popup_is-opened");
        closePopup(popupOpen);
    }
}


export { openPopup, closePopup };