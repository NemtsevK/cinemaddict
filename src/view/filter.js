import AbstractView from '../framework/view/abstract-view.js';
import { createFilterTemplate } from './view-template/filter-template.js';

export default class Filter extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  #handleChangeFilter = null;

  constructor({filters, currentFilterType, onChangeFilter}) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleChangeFilter = onChangeFilter;

    this.element.addEventListener('click', this.#changeFilterHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }

  #changeFilterHandler = (event) => {
    if (event.target.tagName === 'A' || event.target.tagName === 'SPAN'){
      event.preventDefault();
      this.#handleChangeFilter(event.target.dataset.filterType);
    }
  };
}
