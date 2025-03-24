export class UserInfo {
  constructor({ nameElement, jobElement }) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
  }

  getUserInfo() {
    const name = this._nameElement.textContent;
    const job = this._jobElement.textContent;

    return { name, job };
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}

export default UserInfo;
