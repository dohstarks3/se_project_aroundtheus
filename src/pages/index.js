// =======================
// Imports
// =======================
import { createCard } from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { settings } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import ConfirmPopup from "../components/ConfirmPopup.js";
import "./index.css";
import siteLogo from "../images/SiteLogo.svg";
import Api from "../components/API.js";

// =======================
// Global Query Selectors
// =======================
const editProfileModal = document.querySelector("#profile-edit-modal");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#edit-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const imageModalPreview = document.querySelector("#image-preview");
const profileImageForm = document.querySelector("#profile-image-form");
const profileEditImage = document.querySelector(".profile__image");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditImageButton = document.querySelector(
  ".profile__avatar-button"
);

const addCardButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileImage = document.querySelector(".profile__image");
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const titleInput = document.querySelector("#add-title-input");
const linkInput = document.querySelector("#url-link-input");
const confirmDeleteModal = document.querySelector("#confirm-delete-modal");

// =======================
// Objects Setup
// =======================

// Set the image sources dynamically
document.querySelector(".header__logo").src = siteLogo;

const profileImagePopup = new PopupWithForm(
  profileImageForm,
  handleProfileImageSubmit
);

profileImagePopup.setEventListeners();

let userInfo;

const imagePreviewPopup = new PopupWithImage(imageModalPreview);
imagePreviewPopup.setEventListeners();

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

const editFormValidator = new FormValidator(settings, editProfileForm);
const addFormValidator = new FormValidator(settings, addCardForm);
const avatarFormValidator = new FormValidator(settings, profileImageForm);

// =======================
// Functions / Callback Functions
// =======================

function handleLikeButton(id, isLiked) {
  return api.changeLike(id, isLiked);
}

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

  // set the loading state for the popup
  editProfilePopup.setLoading(true);

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

    // Reset the loading state for the popup
    editProfilePopup.setLoading(false);
  });

  editProfilePopup.close();
}

// Handle add-new-card form submission
function handleAddCardFormSubmit(inputValues) {
  const cardData = {
    name: inputValues.Title,
    link: inputValues.url,
  };

  // set the loading state for the popup
  addCardPopup.setLoading(true);

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
      handleDeleteClick,
      handleLikeButton
    );
    section.addItem(cardElement);

    addCardPopup.close();
    addCardForm.reset();
    addFormValidator.disableButton();

    // Reset the loading state for the popup
    addCardPopup.setLoading(false);
  });
}

function handleProfileImageSubmit(inputValues) {
  // Grab the link from the input field called "url-link-input"
  const imageLink = inputValues.url;
  console.log(imageLink);

  profileImagePopup.setLoading(true);

  api
    .changeAvatar(imageLink)
    .then((res) => {
      // Update the profile image in the DOM
      userInfo.setUserAvatar(res.avatar);
      document.querySelector(".profile__image").src =
        userInfo.getUserInfo().avatar;
      profileImagePopup.setLoading(false);
    })
    .catch((err) => {
      console.error("Error updating profile image:", err);
    });

  // Close the popup
  profileImagePopup.close();
}

// =======================
// API Calls & Data Initialization
// =======================

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
          createCard(
            item,
            "#card-template",
            handleCardClick,
            handleDeleteClick,
            handleLikeButton
          )
        );
      },
    },
    ".cards__list"
  );
  section.renderItems();

  // Store section instance for later use (e.g., adding new cards)
  window.section = section;
});

// =======================
// Event Listeners
// =======================

// event listener for the profile image hover and click
profileEditImage.addEventListener("mouseover", () => {
  profileEditImage.classList.add("profile__image_hover");
});

profileEditImageButton.addEventListener("mouseover", () => {
  profileEditImageButton.classList.add("profile__image_hover");
});

profileEditButton.addEventListener("click", () => {
  const userInfoData = userInfo.getUserInfo();
  profileTitleInput.value = userInfoData.name;
  profileDescriptionInput.value = userInfoData.about;
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

profileAvatarButton.addEventListener("click", () => {
  profileImagePopup.open();
});
