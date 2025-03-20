// index.js
import { Card, createCard } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { Popup, PopupWithForm, PopupWithImage } from "../components/Popup.js";
import FormValidator from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";

// Initial cards
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

// Select modal elements
const editProfileModal = document.querySelector("#profile-edit-modal");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#edit-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const imageModalPreview = document.querySelector("#image-preview");

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const titleInput = document.querySelector("#add-title-input");
const linkInput = document.querySelector("#url-link-input");

const userInfo = new UserInfo({
  nameElement: profileTitle,
  jobElement: profileDescription,
});

// Create a PopupWithImage instance
const imagePreviewPopup = new PopupWithImage(imageModalPreview);
imagePreviewPopup.setEventListeners();

// Create PopupWithForm instances
const editProfilePopup = new PopupWithForm(
  editProfileModal,
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(addCardModal, handleAddCardFormSubmit);
addCardPopup.setEventListeners();

// Handle card click
function handleCardClick(name, link) {
  imagePreviewPopup.open({ name, link });
}

// Handle card deletion
function handleDeleteClick(cardElement) {
  cardElement.remove();
}

// Handle profile edit form submission
function handleProfileEditSubmit(profileValues) {
  userInfo.setUserInfo({
    name: profileValues.profile__title,
    job: profileValues.profile__description,
  });
  editProfilePopup.close();
}

// Handle add-new-card form submission
function handleAddCardFormSubmit(inputValues) {
  const newCardData = {
    id: Date.now(),
    name: inputValues.Title,
    link: inputValues.url,
    liked: false,
  };

  const cardElement = createCard(
    newCardData,
    "#card-template",
    handleCardClick,
    handleDeleteClick
  );
  section.addItem(cardElement);

  addCardPopup.close();
  addCardForm.reset();
  addFormValidator.disableButton();
}

// Initialize Section and render initial cards
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const container = document.querySelector(".cards__list");
      container.prepend(
        createCard(item, "#card-template", handleCardClick, handleDeleteClick)
      );
    },
  },
  ".cards__list"
);
section.renderItems();

// Modals open
profileEditButton.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  profileTitleInput.value = userInfoData.name;
  profileDescriptionInput.value = userInfoData.job;
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

imageModalPreview.addEventListener("click", () => {
  // Example of manually opening image preview (if needed)
  imagePreviewPopup.open();
});

// Modals close
editProfileModal
  .querySelector(".modal__close-button")
  .addEventListener("click", () => {
    editProfilePopup.close();
  });

addCardModal
  .querySelector(".modal__close-button")
  .addEventListener("click", () => {
    addCardPopup.close();
  });

imageModalPreview
  .querySelector(".modal__close-button")
  .addEventListener("click", () => {
    imagePreviewPopup.close();
  });

// Form submissions
//editProfileForm.addEventListener("submit", handleProfileEditSubmit);
//addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// Form validation
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(settings, editProfileForm);
const addFormValidator = new FormValidator(settings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
