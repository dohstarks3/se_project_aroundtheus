const initialCards = [
  {
    // index = 0
    id: 1,
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    liked: false,
  },

  {
    // index = 1
    id: 2,
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    liked: false,
  },

  {
    // index = 2
    id: 3,
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    liked: false,
  },

  {
    // index = 3
    id: 4,
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    liked: false,
  },

  {
    id: 5,
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    liked: false,
  },

  {
    id: 6,
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    liked: false,
  },
];

const editProfileModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#edit-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardSaveButton = addCardModal.querySelector(".modal__save-button");
const imageModalPreview = document.querySelector("#image-preview");

const profileEditCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = editProfileModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

//Buttons & other DOM Nodes //

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const addCardCloseButton = addCardModal.querySelector(".modal__close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const imagePreviewCloseButton = imageModalPreview.querySelector(
  ".modal__close-button"
);

//Event Handlers//

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(editProfileModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();

  const cardName = document.querySelector("#add-title-input").value;
  const cardLink = document.querySelector("#url-link-input").value;
  console.log(cardName, cardLink);

  const newCard = {
    id: initialCards.length + 1,
    name: cardName,
    link: cardLink,
    liked: false,
  };

  const cardElement = getCardElement(newCard);
  cardListEl.prepend(cardElement);
  closePopup(addCardModal);
  addCardForm.reset();
}

function handleRemoveCardEl(e) {
  const cardElement = e.target.closest(".card");
  // get the name of the card
  const cardName = cardElement.querySelector(
    ".card__description-title"
  ).textContent;
  // find the card object with the corresponding name from the initialCards array, and remove it from the array
  const cardIndex = initialCards.findIndex((card) => card.name === cardName);
  // remove the element from the initialCards array
  // remove this card element from the DOM
  cardElement.remove();
  console.log(initialCards);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

//Event Listeners//

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openPopup(editProfileModal);
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup(editProfileModal);
});

addCardCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});

imagePreviewCloseButton.addEventListener("click", () => {
  closePopup(imageModalPreview);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//Card Functions//

function getCardElement(cardData) {
  //clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  console.log(cardElement);
  //access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__description-title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteCardButton = cardElement.querySelector(".card__delete-button");

  // Set the ID of the card element to the ID of the card object
  cardElement.id = cardData.id;
  //set the path to the image to the link field of the object
  cardImageEl.src = cardData.link;
  //set the image alt text to the name field of the object\\
  cardTitleEl.textContent = cardData.name;
  // Set the image alt text to the name field of the object
  cardImageEl.alt = cardData.name;
  // Set the liked field of the card element to the liked field of the card object
  cardElement.liked = cardData.liked;

  if (cardData.liked === true) {
    likeButton.classList.add("card__like-button_active");
  } else {
    likeButton.classList.remove("card__like-button_active");
  }

  likeButton.addEventListener("click", () => {
    cardData.liked = !cardData.liked;
    likeButton.classList.toggle("card__like-button_active");
    console.log(`${cardData.name} liked: ${cardData.liked}`);
  });

  cardImageEl.addEventListener("click", () => {
    // here we need to open the preview modal & pass inside the image card & name
    document.querySelector(".modal__image").src = cardData.link;
    document.querySelector(".modal__image").alt = cardData.name;
    openPopup(imageModalPreview);
    document.querySelector(".modal__caption").textContent = cardData.name;
  });

  deleteCardButton.addEventListener("click", handleRemoveCardEl);

  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);

  //set the card title to the name field of the object, too
  //return the ready HTML element with the filled-in data
  cardListEl.append(cardElement);
});

//Like Button Function//
