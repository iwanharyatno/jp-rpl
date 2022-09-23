import colors from '../colors.js';

customElements.define('input-label', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._labelText = 'Label';
    this._type = 'text';
    this._value = 0;
  }

  connectedCallback() {
    this.render();
  }

  set labelText(text) {
    this._labelText = text;
    this.render();
  }

  set value(val) {
    this._value = val;
  }

  get value() {
    return this._shadowRoot.querySelector('#input').value;
  }

  render() {
    this._shadowRoot.innerHTML = `
    <style>
      :host {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      #input {
        border: 1px solid ${colors.gray};
        border-radius: 0.2rem;
        height: 1.5rem;
      }
      #input:focus {
        outline: 2px solid ${colors.primary};
      }
    </style>
    `;
    this._shadowRoot.innerHTML += `
    <label for="input">${this._labelText}</label>
    <input type="${this._type}" id="input" value="${this._value}">
    `;
  }

  static get observedAttributes() {
    return ['label-text', 'type', 'value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'label-text':
        this._labelText = newValue;
        break;
      case 'type':
        this._type = newValue;
        break;
      case 'value':
        this._value = newValue;
        break;
    }

    this.render();
  }
});
