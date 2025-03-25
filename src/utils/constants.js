const initialCards = [
  {
    id: 1,
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    liked: false,
  },
  {
    id: 2,
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    liked: false,
  },
  {
    id: 3,
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    liked: false,
  },
  {
    id: 4,
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    liked: false,
  },
  {
    id: 5,
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    liked: false,
  },
  {
    id: 6,
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
    liked: false,
  },
];

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export default initialCards;
