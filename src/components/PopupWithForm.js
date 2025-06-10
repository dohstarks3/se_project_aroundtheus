import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, handleSubmit) {
    super(popup);
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {
    const inputs = this._popup.querySelectorAll(".modal__input");
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setLoading(isLoading) {
    const submitButton = this._popup.querySelector(".modal__button");
    submitButton.textContent = isLoading ? "Saving..." : "Save";
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (e) => {
      this._handleSubmit(this._getInputValues());
    });
  }
}

export default PopupWithForm;
