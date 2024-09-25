function setEventListeners(formEls, config) {
  const { inputSelector } = config;
  const inputEls = [...formEls.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEls) => {
    inputEls.addEventListener("input", (e) => {
      const errorEl = document.querySelector(
        `#${config.profileEditModalErrorId}`
      );
      if (inputEls.validity.valid) {
        // add the modal__error_visible class to the error message
        errorEl.classList.remove(config.errorClass);
      } else {
        errorEl.classList.add(config.errorClass);
      }
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
  profileEditModalErrorId: "profile-edit-modal-title-error",
};

enableValidation(config);
