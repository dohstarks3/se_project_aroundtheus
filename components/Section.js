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

//This section file was looked at by other Tripleten tutors who didnt have a problem with it.
//While I understand why you wanted me to change the name from "CardList" I am having a hard time understanding why I cannot have this file in my project at all//
//Please provide me with a hint on where the code in this file is supposed to go instead of just telling me to delete the file
