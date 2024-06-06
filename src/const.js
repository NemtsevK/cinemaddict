const FORMAT_DATE = {
  yearRelease: 'YYYY',
  durationMovies:'H[h] m[m]',
  releaseDatePopup: 'DD MMMM YYYY',
  commentDate: 'YYYY/MM/DD HH:mm'
};

const FILTER_TYPE = {
  ALL: 'All',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites'
};

const SORT_TYPE = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

const EMOJI = ['smile','sleeping','puke','angry'];

const UpdateType = {
  PATH: 'path',
  MINOR: 'minor',
  MAJOR: 'major',
  INIT: 'INIT'
};

const UserAction = {
  UPDATE: 'update',
  DELETE_COMMENT: 'delete comment',
  ADD_COMMENT: 'add comment'
};

export { FORMAT_DATE, FILTER_TYPE, SORT_TYPE, EMOJI, UserAction, UpdateType};
