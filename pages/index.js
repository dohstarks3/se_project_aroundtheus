// index.js
import { Card, createCard } from "../components/Card.js";
import { Section } from "../components/Section.js";

import FormValidator from "../components/FormValidator.js";

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
const modalImage = document.querySelector(".modal__image");
const modalCaption = document.querySelector(".modal__caption");
const titleInput = document.querySelector("#add-title-input").value;
const linkInput = document.querySelector("#url-link-input").value;

// Functions to handle opening and closing modals
function openPopup(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("click", handleCloseOverlayClick);
  document.addEventListener("keydown", handleEscape);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", handleCloseOverlayClick);
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closePopup(modal);
  }
}

function handleCloseOverlayClick(e) {
  if (e.target.classList.contains("modal_opened")) {
    closePopup(e.currentTarget);
  }
}

// Event handlers for card actions
function handleCardClick(name, link) {
  modalImage.src = link;
  modalImage.alt = name;
  modalCaption.textContent = name;
  openPopup(imageModalPreview);
}

function handleDeleteClick(cardElement) {
  cardElement.remove();
}

// Handle profile edit form submission
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(editProfileModal);
}

//When I declare the query selectors for this function outside the card name and link it causes the values of the inputs to be empty because they are not being updated when the event listener gets called. This causes the cards to not show any data so we are not getting an actual value per your comment. I can provide a visual if you want//

function handleAddCardFormSubmit(e) {
  e.preventDefault();

  const cardName = titleInput.value; // use them here
  const cardLink = linkInput.value;

  const newCardData = {
    id: Date.now(), // Unique ID
    name: cardName,
    link: cardLink,
    liked: false,
  };

  //Thanks for the update. When I open the website the submit button for the profile and cards and disabled when there is no information inserted. Both start off disabled. Is this not the case on your end?//

  const cardElement = createCard(
    newCardData,
    "#card-template",
    handleCardClick,
    handleDeleteClick
  );
  section.addItem(cardElement);
  closePopup(addCardModal);
  addCardForm.reset();
}

// Initialize Section and render initial cards
const section = new Section(".cards__list");
section.renderItems(
  initialCards,
  "#card-template",
  handleCardClick,
  handleDeleteClick
);

// Event listeners for opening modals
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(editProfileModal);
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

// Close buttons
editProfileModal
  .querySelector(".modal__close-button")
  .addEventListener("click", () => {
    closePopup(editProfileModal);
  });

addCardModal
  .querySelector(".modal__close-button")
  .addEventListener("click", () => {
    closePopup(addCardModal);
  });

imageModalPreview
  .querySelector(".modal__close-button")
  .addEventListener("click", () => {
    closePopup(imageModalPreview);
  });

// Form submissions
editProfileForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

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
