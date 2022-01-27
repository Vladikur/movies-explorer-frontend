class Api {
  constructor(config) {
    this.url = config.url;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getMovies() {
    return fetch(`${this.url}`, {
      method: 'GET',
    })
    .then(res => this._getResponseData(res))
  }

}


const apiMovies = new Api({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
})

export default apiMovies