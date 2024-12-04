// Card.js
export class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteClick) {
    this._id = data.id;
    this._name = data.name;
    this._link = data.link;
    this._liked = data.liked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  // Method to get the card template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // Method to generate the card element
  generateCard() {
    this._element = this._getTemplate();

    // Select elements needed within the card
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__description-title");

    // Set up the card's content
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // Set the initial liked state
    if (this._liked) {
      this._likeButton.classList.add("card__like-button_active");
    }

    // Add event listeners
    this._setEventListeners();

    return this._element;
  }

  // Toggle the like button state
  _handleLikeButton() {
    this._likeButton.classList.toggle("card__like-button_active");
    this._liked = !this._liked;
  }

  // Add all event listeners
  _setEventListeners() {
    // Like button
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    // Delete button
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._element);
    });

    // Image click
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export class CardList {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  // Render initial cards
  renderItems(items, cardSelector, handleCardClick, handleDeleteClick) {
    items.forEach((item) => {
      const card = new Card(
        item,
        cardSelector,
        handleCardClick,
        handleDeleteClick
      );
      const cardElement = card.generateCard();
      this._container.append(cardElement);
    });
  }

  // Add a new card to the list
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
