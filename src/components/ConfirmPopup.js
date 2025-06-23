import Popup from "./Popup";

export class ConfirmPopup extends Popup {
  constructor(selector, handleConfirmAction) {
    super(selector);
    this._handleConfirmAction = handleConfirmAction;
  }

  open(cardElement, cardId) {
    super.open();
    this._cardElement = cardElement;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    const button = this._popup.querySelector(".modal__button_confirm");
    button.addEventListener("click", (e) => {
      this._handleConfirmAction(this._cardElement, this._cardId)
        .then((res) => {
          if (res) {
            this._cardElement.remove();
            this.close();
          }
        })
        .catch((err) => {
          console.error("Error during confirm action:", err);
          this.close();
        });
    });
  }
}

export default ConfirmPopup;
