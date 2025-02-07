//ф-ция добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const popupError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    popupError.textContent = errorMessage;
    popupError.classList.add(settings.errorClass);
};

//ф-ция удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, settings) => {
    const popupError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    popupError.textContent = '';
    popupError.classList.add(settings.errorClass);
};

//ф-ция к. проверяет валидность поля 
const isValid = (formElement, inputElement, settings) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.error);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = false;
    }

};

//ф-ция к. добавляет к полям формы обработчики
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttomElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttomElement, settings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, settings);
            toggleButtonState(inputList, buttomElement, settings);
        })
    })

};

//ф-ция к. находит все формы 
const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    })
};

const disabledButtonForUrl = (formElement, settings) => {
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
};

const clearValidation = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, settings);
    });
};

export { enableValidation, clearValidation, disabledButtonForUrl };