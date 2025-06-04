// index.js
import { Card, createCard } from "../components/Card.js";
import { Section } from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { settings } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import ConfirmPopup from "../components/ConfirmPopup.js";

import "./index.css";

import siteLogo from "../images/SiteLogo.svg";
import Api from "../components/API.js";

// Set the image sources dynamically
document.querySelector(".header__logo").src = siteLogo;

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
const titleInput = document.querySelector("#add-title-input");
const linkInput = document.querySelector("#url-link-input");

const confirmDeleteModal = document.querySelector("#confirm-delete-modal");

let userInfo;

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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6fccc61c-6377-4705-9a17-e90101d72c87",
    "Content-Type": "application/json",
  },
});

// Fetch the user info from the server
api.getUserInfo().then((res) => {
  const userData = {
    _id: res._id,
    name: res.name,
    avatar: res.avatar,
    about: res.about,
  };

  // Set user info in the UserInfo instance
  userInfo = new UserInfo(userData);
  document.querySelector(".profile__image").src = userInfo.getUserInfo().avatar;
  document.querySelector(".profile__title").textContent =
    userInfo.getUserInfo().name;
  document.querySelector(".profile__description").textContent =
    userInfo.getUserInfo().about;
});

// Fetch initial cards from the server and initialize Section after fetching
api.getInitialCards().then((res) => {
  const initialCards = res.map((item) => {
    return {
      id: item._id,
      owner: item.owner,
      name: item.name,
      link: item.link,
      isLiked: item.isLiked,
      createdAt: item.createdAt,
    };
  });

  // Initialize Section and render initial cards after fetching
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

  // Store section instance for later use (e.g., adding new cards)
  window.section = section;
});

// display the cards that we got from the server on the page/dom

// Handle card click
function handleCardClick(name, link) {
  imagePreviewPopup.open({ name, link });
}

function handleConfirmAction(id, cardElement) {
  api.deleteCard(id).then((res) => {
    if (res) {
      cardElement.remove();
    }
  });
}

// Handle card delete button click
function handleDeleteClick(cardElement, id) {
  console.log("in the handleDeleteClick function");
  const deleteConfirmPopup = new ConfirmPopup(
    confirmDeleteModal,
    handleConfirmAction,
    id,
    cardElement
  );
  deleteConfirmPopup.setEventListeners();
  deleteConfirmPopup.open();
}

// Handle profile edit form submission
function handleProfileEditSubmit(profileValues) {
  const userData = {
    name: profileValues.profile__title,
    about: profileValues.profile__description,
  };

  api.patchUserInfo(userData).then((res) => {
    userInfo = new UserInfo({
      _id: res._id,
      name: res.name,
      avatar: res.avatar,
      about: res.about,
    });

    document.querySelector(".profile__title").textContent =
      userInfo.getUserInfo().name;
    document.querySelector(".profile__description").textContent =
      userInfo.getUserInfo().about;
    // document.querySelector(".profile__image").src = userInfo.getUserInfo().avatar;
  });

  editProfilePopup.close();
}

// Handle add-new-card form submission
function handleAddCardFormSubmit(inputValues) {
  const cardData = {
    name: inputValues.Title,
    link: inputValues.url,
  };
  api.addCard(cardData).then((res) => {
    const newCardData = {
      id: res._id,
      name: res.name,
      link: res.link,
      isLiked: res.isLiked,
      createdAt: res.createdAt,
      owner: res.owner,
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
  });
}
// Section is now initialized after fetching cards from the server above

// Modals open
profileEditButton.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  profileTitleInput.value = userInfoData.name;
  profileDescriptionInput.value = userInfoData.about;
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

const editFormValidator = new FormValidator(settings, editProfileForm);
const addFormValidator = new FormValidator(settings, addCardForm);
