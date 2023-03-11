import './ValidateForm.css';
import { isValidCardNumber, getPaySystem } from '../../utils/utilites';

export default class ValidateForm {
  constructor() {
    this.element = null;
    this.container = null;
    this.inputEl = null;
    this.btnEl = null;
    this.msgEl = null;
    this.validate = this.validate.bind(this);
    this.typeField = this.typeField.bind(this);
    this.controlledEl = null;

    this.create();
  }

  create() {
    this.element = document.createElement('form');
    this.element.classList.add('validate-form');

    this.inputEl = document.createElement('input');
    this.inputEl.classList.add('validate-input');
    this.inputEl.type = 'text';
    // this.inputEl.inputMode = 'numeric';
    // this.inputEl.pattern = '\\d*';
    this.inputEl.placeholder = 'Credit card number';
    this.inputEl.name = 'ccnumber';
    this.element.appendChild(this.inputEl);

    this.btnEl = document.createElement('button');
    this.btnEl.classList.add('validate-btn');
    this.btnEl.textContent = 'Click to validate';
    this.element.appendChild(this.btnEl);

    this.element.addEventListener('submit', this.validate);
    this.inputEl.addEventListener('input', this.typeField);
  }

  bindToDOM(container) {
    this.container = container;
    this.container.appendChild(this.element);
  }

  bindControlled(element) {
    this.controlledEl = element;
  }

  showMsg(text) {
    if (!this.msgEl) {
      this.createMsgEl();
    }

    this.msgEl.textContent = text;
    this.msgEl.classList.remove('validate-tooltip-invalid');
    this.element.appendChild(this.msgEl);
  }

  createMsgEl() {
    this.msgEl = document.createElement('div');
    this.msgEl.classList.add('validate-tooltip');
  }

  validate(event) {
    event.preventDefault();

    if (this.inputEl.value.replace(/\D/g, '') === '') {
      this.showMsg('Please insert a credit card number');
      return;
    }

    if (isValidCardNumber(this.inputEl.value)) {
      this.showMsg('Valid card number');
    } else {
      this.showMsg('Invalid card number!');
      this.msgEl.classList.add('validate-tooltip-invalid');
    }
  }

  typeField() {
    if (this.msgEl) {
      this.msgEl.remove();
    }

    if (this.inputEl.value.length < 4) {
      this.controlledEl.disableCardsExcept(getPaySystem(this.inputEl.value));
    }
  }
}
