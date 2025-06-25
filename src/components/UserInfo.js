export class UserInfo {
  constructor(profileTitle, profileDescription, profileImage) {
    this._profileTitle = profileTitle;
    this._profileDescription = profileDescription;
    this._profileImage = profileImage;

    this._id = "";
    this._name = "";
    this._avatar = "";
    this._about = "";
  }

  getUserInfo() {
    return {
      id: this._id,
      name: this._name,
      avatar: this._avatar,
      about: this._about,
    };
  }

  setUserInfo({ id, name, avatar, about }) {
    this._id = id || this._id;
    this._name = name || this._name;
    this._avatar = avatar || this._avatar;
    this._about = about || this._about;

    this._profileTitle.textContent = this._name;
    this._profileDescription.textContent = this._about;
    this._profileImage.src = this._avatar || "";
  }

  setUserAvatar(avatar) {
    this._avatar = avatar;
    this._profileImage.src = avatar || "";
  }
}

export default UserInfo;
