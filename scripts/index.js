const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#profile-edit-modal");

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#edit-card-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close-button");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardSaveButton = addCardModal.querySelector(".modal__save-button");

const profileEditCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = editProfileModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//Profile Functions//

// function closePopup() {
//   editProfileModal.classList.remove("modal_opened");
// }

//Event Handlers//

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

//Event Listeners//
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  editProfileModal.classList.add("modal_opened");
});

addCardButton.addEventListener("click", () => {
  // document.querySelector("#profile-title-input").value =
  //   document.querySelector(".title").textContent;
  // document.querySelector("#profile-description-input").value =
  //   document.querySelector(".description").textContent;
  addCardModal.classList.add("modal_opened");
});

profileEditCloseButton.addEventListener("click", () => {
  editProfileModal.classList.remove("modal_opened");
});

addCardCloseButton.addEventListener("click", () => {
  addCardModal.classList.remove("modal_opened");
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

if (addCardModal.classList.contains("modal_opened")) {
  addCardForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cardName = document.querySelector("#card-title-input").value;
    const cardLink = document.querySelector("#card-link-input").value;

    const cardData = {
      name: cardName,
      link: cardLink,
    };

    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
    addCardModal.classList.remove("modal_opened");
  });
}

//Card Functions//

function getCardElement(cardData) {
  //clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  console.log(cardElement);
  //access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__description-title");

  //set the path to the image to the link field of the object
  cardImageEl.src = cardData.link;
  //set the image alt text to the name field of the object\\
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);

  //set the card title to the name field of the object, too
  //return the ready HTML element with the filled-in data
  cardListEl.append(cardElement);
});
