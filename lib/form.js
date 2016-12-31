import GitHub from './github.js';

export default class Form {
  constructor(form) {
    if (!(form instanceof HTMLFormElement)) {
      throw new TypeError('Form element is required.')
    }
    this.github = new GitHub();
    form.addEventListener('submit', this);
  }

  handleEvent(event) {
    const { type } = event;
    switch (type) {
      case 'submit':
        return this.handleSubmit(event);
      default:
        throw new TypeError('Unknown event type.')
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const textField = document.getElementById('text-field-of-github-user-name');
    const userName = textField.value;
    this.github.getUser({ userName })
      .then(this.setUserInfo)
      .catch(this.reset);
    return false;
  }

  reset() {
    document.getElementById('github-user').setAttribute('aria-hidden', 'true');
    document.getElementById('github-user-name').value = '';
    document.getElementById('github-user-email').value = '';
    document.getElementById('github-user-location').value = '';
  }

  setUserInfo(user) {
    document.getElementById('github-user').setAttribute('aria-hidden', 'false');
    document.getElementById('github-user-name').value = user.name;
    document.getElementById('github-user-email').value = user.email;
    document.getElementById('github-user-location').value = user.location;
  }
}
