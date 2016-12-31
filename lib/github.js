const DEFAULT_REQUEST_OPTIONS = {
  cache: 'default',
  credentials: 'same-origin',
  method: 'GET',
  mode: 'cors',
};

const privateMethods = {
  request: Symbol('github.request'),
};

export default class GitHub {
  constructor({ basePath = '/', host = 'api.github.com', protocol = 'https:' } = {}) {
    this.basePath = basePath;
    this.host = host;
    this.protocol = protocol;
  }

  getUser({ userName }) {
    return new Promise((resolve, reject) =>  {
      if (!userName) {
        return reject(new TypeError('User name required.'));
      }
      this[privateMethods.request](`users/${userName}`)
        .then(resolve)
        .catch(reject);
    });
 }

  async [privateMethods.request](path, { method = 'GET', query = {} } = {}) {
    const queryString = new URLSearchParams();
    for (const [key, value] of Object.entries(query)) {
      queryString.set(key, value);
    }
    const uri = [
      `${this.protocol}//${this.host}${this.basePath}${path}`,
      queryString.toString(),
    ].filter(Boolean).join('?');
    const options = Object.assign({}, DEFAULT_REQUEST_OPTIONS, { method });
    const request = new Request(uri, options);
    const response = await fetch(request);
    if (![200, 201].includes(response.status)) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
}
