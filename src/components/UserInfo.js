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

  setUserInfo({ id, name, avatar, about }) {
    if (id) this._id = id;
    if (name) this._name = name;
    if (avatar) this._avatar = avatar;
    if (about) this._about = about;
  }

  setUserAvatar(avatar) {
    this._avatar = avatar;
  }
}

export default UserInfo;
