function handleCloseOverlayClick(e) {
  if (e.target.classList.contains("modal_opened")) {
    e.currentTarget.classList.remove("modal_opened");
  }
}

export class Popup {
  constructor(selector) {
    this._selector = selector;
    this._handleEscapeKey = this._handleEscapeKey.bind(this);
  }

  open() {
    this._selector.classList.add("modal_opened");
    this._selector.addEventListener("click", handleCloseOverlayClick);
    document.addEventListener("keydown", this._handleEscapeKey);
  }

  close() {
    this._selector.classList.remove("modal_opened");
    this._selector.removeEventListener("click", handleCloseOverlayClick);
    document.removeEventListener("keydown", this._handleEscapeKey);
  }

  _handleEscapeKey(e) {
    if (e.key == "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._selector.querySelector(".modal__close-button");
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}

export default Popup;
