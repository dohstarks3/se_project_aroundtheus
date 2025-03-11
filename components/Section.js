import { Card, createCard } from "./Card.js";

export class Section {
  constructor({ items, renderer }, selector) {
    this._container = document.querySelector(selector);
    this._items = items;
    this._renderer = renderer;
  }

  // Render initial cards
  renderItems() {
    this._items.forEach(this._renderer);
  }

  // Add a new card to the list
  addItem(cardElement) {
    // think about adding an argument, which controls prepend OR append
    this._container.prepend(cardElement);
  }
}
