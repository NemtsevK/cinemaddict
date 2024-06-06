import Presenter from '../src/presenter/presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MoviesModel from './model/movies-model.js';
import FilterModel from './model/filters-model.js';
import MoviesApiService from './model/movies-api-service.js';
import CommentsApiService from './model/comments-api-service.js';

const END_POINT = 'https://22.objects.htmlacademy.pro/cinemaddict';
const END_POINT_COMMENTS = 'https://22.objects.htmlacademy.pro/cinemaddict/comments';
const AUTHORIZATION = 'Basic klir0230dvmfjgj';

const containerInfoUser = document.querySelector('.header');
const contentContainer = document.querySelector('.main');
const containerNumberOfFilms = document.querySelector('.footer__statistics');
const body = document.querySelector('body');

const moviesModel = new MoviesModel ({
  moviesApiService: new MoviesApiService(END_POINT, AUTHORIZATION),
  commentsApiService: new CommentsApiService(END_POINT_COMMENTS, AUTHORIZATION)
});
moviesModel.init();

const filtersModel = new FilterModel ();

const filterPresenter = new FilterPresenter ({
  filtersModel,
  moviesModel,
  container: contentContainer
});

const presenter = new Presenter ({containerInfoUser, contentContainer,
  containerNumberOfFilms, moviesModel, filtersModel, body});

presenter.init();
filterPresenter.init();

