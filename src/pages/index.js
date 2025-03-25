// index.js
import { Card, createCard } from "../components/Card.js";
import { Section } from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { settings } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import initialCards from "../utils/constants.js";

import "./index.css";

import siteLogo from "../images/SiteLogo.svg";
import profileImage from "../images/jacques-cousteau.png";

// Set the image sources dynamically
document.querySelector(".header__logo").src = siteLogo;
document.querySelector(".profile__image").src = profileImage;

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
      section.addItem(
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

// Form submissions
//editProfileForm.addEventListener("submit", handleProfileEditSubmit);
//addCardForm.addEventListener("submit", handleAddCardFormSubmit);

const editFormValidator = new FormValidator(settings, editProfileForm);
const addFormValidator = new FormValidator(settings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
