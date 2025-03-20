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

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageElement = this._selector.querySelector(".modal__image");
    this._captionElement = this._selector.querySelector(".modal__caption");
  }

  open(data) {
    if (!data || !data.link || !data.name) {
      return;
    }
    super.open();
    // Set the image's src and alt
    this._imageElement.src = data.link;
    this._imageElement.alt = data.name;
    // Set the caption's textContent
    this._captionElement.textContent = data.name;
  }
}

export class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
  }

  _getInputValues() {
    const inputs = this._selector.querySelectorAll(".modal__input");
    const values = {};
    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._selector.addEventListener("submit", (e) => {
      this._handleSubmit(this._getInputValues());
    });
  }
}

export default Popup;
