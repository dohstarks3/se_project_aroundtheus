import { toggleButtonState } from "./validation.js";

class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    let foundInvalid = false;

    inputEls.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        foundInvalid = true;
      }
    });

    if (foundInvalid) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(inactiveButtonClass);
      submitButton.disabled = false;
    }
  }

  //These may not work due to inputEls and submitButton not being in the object//

  _setEventListeners(inputEls, submitButton, config) {
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    toggleButtonState(inputEls, submitButton, config);

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this.form, inputEl, config);
        toggleButtonState(inputEls, submitButton, config);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener(`submit`, (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }

  showInputError(inputEls, errorMessageEl) {
    // const errorMessageEl = this.form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  hasInvalidInput() {}
}

export default FormValidator;
