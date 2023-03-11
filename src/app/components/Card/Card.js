import './Card.css';

export default class Card {
  constructor(type) {
    this.type = type;

    this.element = null;
    this.container = null;
    this.card = null;

    this.create();
  }

  create() {
    this.element = document.createElement('li');

    this.card = document.createElement('span');
    this.card.classList.add('card');
    this.card.classList.add(this.type.toLowerCase());
    this.card.textContent = this.type;
    this.element.appendChild(this.card);
  }

  bindToDom(container) {
    this.container = container;
    this.container.appendChild(this.element);
  }

  has(type) {
    return type.toLowerCase() === this.type.toLowerCase();
  }

  disable() {
    this.card.classList.add('card-disabled');
  }

  enable() {
    this.card.classList.remove('card-disabled');
  }
}
