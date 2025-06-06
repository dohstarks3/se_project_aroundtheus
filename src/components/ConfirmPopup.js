import Popup from "./Popup";

export class ConfirmPopup extends Popup {
  constructor(selector, handleConfirmAction, id, cardElement) {
    super(selector);
    this._handleConfirmAction = handleConfirmAction;
    this._cardId = id;
    this._cardElement = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();
    const button = this._popup.querySelector(".modal__button_confirm");
    button.addEventListener("click", (e) => {
      this._handleConfirmAction(this._cardId, this._cardElement);
      this.close();
    });
  }
}

export default ConfirmPopup;
