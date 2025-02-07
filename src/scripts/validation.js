const validationSet = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//ф-ция добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
    const popupError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSet.inputErrorClass);
    popupError.textContent = errorMessage;
    popupError.classList.add(validationSet.errorClass);
};

//ф-ция удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
    const popupError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSet.inputErrorClass);
    popupError.textContent = '';
    popupError.classList.add(validationSet.errorClass);
};

//ф-ция к. проверяет валидность поля 
const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.error);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationSet.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validationSet.inactiveButtonClass);
        buttonElement.disabled = false;
    }

};

//ф-ция к. добавляет к полям формы обработчики
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSet.inputSelector));
    const buttomElement = formElement.querySelector(validationSet.submitButtonSelector);
    toggleButtonState(inputList, buttomElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttomElement);
        })
    })

};

//ф-ция к. находит все формы 
const enableValidation = (validationSet) => {
    const formList = Array.from(document.querySelectorAll(validationSet.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    })
};

const disabledButtonForUrl = (formElement, validationSet) => {
    const buttonElement = formElement.querySelector(validationSet.submitButtonSelector);
    buttonElement.classList.add(validationSet.inactiveButtonClass);
    buttonElement.disabled = true;
};

const clearValidation = (formElement, validationSet) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSet.inputSelector));
    const buttonElement = formElement.querySelector(validationSet.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });
};

export { enableValidation, clearValidation, validationSet, disabledButtonForUrl };