export class UserInfo {
  constructor({ id, name, avatar, about }) {
    this._id = id;
    this._name = name;
    this._avatar = avatar;
    this._about = about;
  }

  getUserInfo() {
    return {
      id: this._id,
      name: this._name,
      avatar: this._avatar,
      about: this._about,
    };
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._about.textContent = job;
  }

  setUserAvatar(avatar) {
    this._avatar = avatar;
  }
}

export default UserInfo;
