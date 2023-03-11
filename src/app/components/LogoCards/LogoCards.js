import './LogoCards.css';
import Card from '../Card/Card';

export default class LogoCards {
  constructor() {
    this.element = null;
    this.container = null;
    this.cardTypes = ['Visa', 'MasterCard', 'WesternUnion', 'Mir'];
    this.cards = [];

    this.create();
  }

  create() {
    this.element = document.createElement('ul');
    this.element.classList.add('cards');

    this.appendCards(this.cardTypes);
  }

  bindToDOM(container) {
    this.container = container;
    this.container.appendChild(this.element);
  }

  appendCards(cardTypes) {
    // console.log(cardTypes);
    cardTypes.forEach((type) => {
      const card = new Card(type);
      this.cards.push(card);
      card.bindToDom(this.element);
    });
  }

  disableCardsExcept(type) {
    if (type) {
      this.cards.forEach((card) => {
        if (card.has(type)) {
          card.enable();
        } else {
          card.disable();
        }
      });
    } else {
      this.enableCards();
    }
  }

  enableCards() {
    this.cards.forEach((card) => {
      card.enable();
    });
  }
}
