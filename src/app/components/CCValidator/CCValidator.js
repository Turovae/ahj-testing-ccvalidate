import './CCValidator.css';
import LogoCards from '../LogoCards/LogoCards';
import ValidateForm from '../ValidateForm/ValidateForm';

export default class CCValidator {
  constructor() {
    this.element = null;
    this.container = null;
    this.logoCard = new LogoCards();
    this.validateForm = new ValidateForm();
  }

  create() {
    this.element = document.createElement('div');
    this.element.classList.add('validator-container');

    this.appendComponents();
  }

  bindToDOM(container) {
    let appContainer;
    if (typeof container === 'string') {
      appContainer = document.querySelector(container);
    } else {
      appContainer = container;
    }
    if (!(appContainer instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this.container = appContainer;
    this.container.appendChild(this.element);
  }

  appendComponents() {
    this.logoCard.bindToDOM(this.element);
    this.validateForm.bindToDOM(this.element);
    this.validateForm.bindControlled(this.logoCard);
  }
}
