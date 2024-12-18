function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  // print out every input element's id
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  // print out every input element's id
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

export function checkInputValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}

export function toggleButtonState(
  inputEls,
  submitButton,
  { inactiveButtonClass }
) {
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

function setEventListeners(formEl, config) {
  console.log(1231231);
  const { inputSelector } = config;
  const inputEls = [...formEl.querySelectorAll(config.inputSelector)];
  const submitButton = formEl.querySelector(config.submitButtonSelector);
  toggleButtonState(inputEls, submitButton, config);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputEls, submitButton, config);
    });
  });
}

function enableValidation(config) {
  const formEls = [...document.querySelectorAll(config.formSelector)];
  formEls.forEach((formEls) => {
    formEls.addEventListener(`submit`, (e) => {
      e.preventDefault();
    });

    setEventListeners(formEls, config);
    //look for all inputs inside the form
    //loop through all the inputs to see if all are valid
    //if input is not valid
    //get validation message
    //add error class to input
    //display error message
    //disable button
    //if all inputs are valid
    //enable button
    //reset error message
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
