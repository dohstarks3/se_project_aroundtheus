import { Card } from "./Card.js";

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
