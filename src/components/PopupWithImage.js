import Popup from "./Popup.js";

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

export default PopupWithImage;
