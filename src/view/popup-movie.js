import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createPopupTemplate } from './view-template/popup/popup-template.js';

export default class PopupMovie extends AbstractStatefulView {
  #handleClosePopup = null;
  #handleClickAlreadyWatched = null;
  #handleClickFavorite = null;
  #handleClickWatchlist = null;
  #handleClickDeleteComment = null;
  #handleKeyDownAddComment = null;

  constructor({ movie, comments, onClickClosePopup, onAlreadyWatched, onFavoriteClick, onWatchlistClick, onClickDeleteComment, onKeyDownAddComment }) {
    super();
    this._setState(PopupMovie.parseMovieToState(movie, comments));

    this.#handleClosePopup = onClickClosePopup;
    this.#handleClickAlreadyWatched = onAlreadyWatched;
    this.#handleClickFavorite = onFavoriteClick;
    this.#handleClickWatchlist = onWatchlistClick;
    this.#handleClickDeleteComment = onClickDeleteComment;
    this.#handleKeyDownAddComment = onKeyDownAddComment;

    this._restoreHandlers();
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closePopupHandler);
    this.element.querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#clickAlreadyWatchedHandler);
    this.element.querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#clickFavoriteHandler);
    this.element.querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#clickWatchlistHandler);
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('change', this.#changeEmojiHandler);
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#inputTextCommentHandler);
    this.element.querySelector('.film-details__comments-list')
      .addEventListener('click', this.#clickDeleteCommentHandler);
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('keydown', this.#addCommentKeyDownHandler);
  }

  #addCommentKeyDownHandler = (event) => {
    if (event.code === 'Enter' && (event.ctrlKey || event.metaKey)) {
      if (this._state.userTextComment !== '' && this._state.userEmoji !== '') {
        event.preventDefault();
        this.#handleKeyDownAddComment(PopupMovie.parseStateToNewComment(this._state));
      }
    }
  };

  #clickDeleteCommentHandler = (event) => {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }

    const movie = PopupMovie.parseStateToMovie(this._state);
    const commentId = movie.comments.find((comment) => comment === event.target.dataset.commentIdValue);
    const commentDelete = {
      movie,
      comment: commentId
    };

    this.#handleClickDeleteComment(commentDelete);
  };

  #closePopupHandler = (event) => {
    event.preventDefault();
    this.#handleClosePopup();
  };

  #clickAlreadyWatchedHandler = (event) => {
    event.preventDefault();
    this.#handleClickAlreadyWatched();
  };

  #clickFavoriteHandler = (event) => {
    event.preventDefault();
    this.#handleClickFavorite();
  };

  #clickWatchlistHandler = (event) => {
    event.preventDefault();
    this.#handleClickWatchlist();
  };

  #changeEmojiHandler = (event) => {
    event.preventDefault();
    this.updateElement({
      userEmoji: event.target.value
    });
    this.element.querySelector('.film-details__comment-input')
      .focus();
  };

  #inputTextCommentHandler = (event) => {
    event.preventDefault();
    this._setState({
      userTextComment: event.target.value
    });
  };

  get template() {
    return createPopupTemplate({ movie: this._state });
  }


  static parseMovieToState(movie, comments) {
    return {
      ...movie,
      userEmoji: '',
      userTextComment: '',
      comments: [...comments],
      isDisable: false,
      isDeleting: false,
    };
  }

  static parseStateToMovie(state) {
    const movie = { ...state };

    movie.comments = movie.comments.map((comment) => comment.id);

    delete movie.userEmoji;
    delete movie.userTextComment;

    return movie;
  }

  static parseStateToNewComment(state) {
    const comment = {
      id: state.id,
      comment: {
        comment: state.userTextComment,
        emotion: state.userEmoji,
      }
    };

    return comment;
  }
}
