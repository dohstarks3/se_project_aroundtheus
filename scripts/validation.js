function showInputError(formEl, inputEl, config) {}

function checkInputValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}

function setEventListeners(formEl, config) {
  const { inputSelector } = config;
  const inputEls = [...formEl.querySelectorAll(config.inputSelector)];

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, config);
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
