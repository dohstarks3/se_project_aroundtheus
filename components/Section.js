import { Card, createCard } from "./Card.js";

export class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  // Render initial cards
  renderItems(items, cardSelector, handleCardClick, handleDeleteClick) {
    items.forEach((item) => {
      const cardElement = createCard(
        item,
        cardSelector,
        handleCardClick,
        handleDeleteClick
      );
      this._container.append(cardElement);
    });
  }

  // Add a new card to the list
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
