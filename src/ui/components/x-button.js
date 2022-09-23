import colors from '../colors.js';

customElements.define('x-button', class extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });

    this._button = document.createElement('button');
    
    const style = document.createElement('style');
    const slot = document.createElement('slot');
    style.innerText = `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    button {
      border: none;
      color: black;
      padding: 0.5rem 1rem;
      background-color: transparent;
      font-size: 1rem;
    }

    button:hover {
      background-color: ${colors.lightGray};
    }

    button:active {
      background-color: ${colors.mediumGray};
    }

    .primary {
      background-color: ${colors.primary};
      color: #ffffff;
      box-shadow: -3px 3px 6px ${colors.mediumGray};
    }
    .primary:hover {
      background-color: ${colors.primaryDark};
    }

    .danger {
      background-color: ${colors.danger};
      box-shadow: -3px 3px 6px ${colors.mediumGray};
      color: #ffffff;
    }
    .danger:hover {
      background-color: ${colors.dangerDark};
    }
    `;

    this._button.appendChild(slot);
    this._shadowRoot.appendChild(this._button);
    this._shadowRoot.appendChild(style);
  }

  static get observedAttributes() {
    return ['variant'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'variant':
        this._button.setAttribute('class', newValue);
        break;
    }
  }
});
