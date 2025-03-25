// function handleCloseOverlayClick(e) {
//   if (e.target.classList.contains("modal_opened")) {
//     e.currentTarget.classList.remove("modal_opened");
//   }
// }

export class Popup {
  constructor(popup) {
    this._popup = popup;
    this._handleEscapeKey = this._handleEscapeKey.bind(this);
    this._handleCloseOverlayClick = this._handleCloseOverlayClick.bind(this);
  }

  open() {
    this._popup.classList.add("modal_opened");
    this._popup.addEventListener("click", this._handleCloseOverlayClick);
    document.addEventListener("keydown", this._handleEscapeKey);
  }

  close() {
    this._popup.classList.remove("modal_opened");
    this._popup.removeEventListener("click", this._handleCloseOverlayClick);
    document.removeEventListener("keydown", this._handleEscapeKey);
  }

  _handleEscapeKey(e) {
    if (e.key == "Escape") {
      this.close();
    }
  }
  _handleCloseOverlayClick(e) {
    if (e.target.classList.contains("modal_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".modal__close-button");
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}

export default Popup;
