import Popup from "./Popup";

export class ConfirmPopup extends Popup {
  constructor(selector, handleConfirmAction, id, cardElement) {
    console.log("in the ConfirmPopup constructor");
    super(selector);
    this._handleConfirmAction = handleConfirmAction;
    this._cardId = id;
    this._cardElement = cardElement;
  }

  setEventListeners() {
    console.log("setting ConfirmPopup event listeners");
    super.setEventListeners();
    this._popup.addEventListener("click", (e) => {
      console.log("set button click event listener");
      this._handleConfirmAction(this._cardId, this._cardElement);
      this.close();
    });
  }
}

export default ConfirmPopup;
