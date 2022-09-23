import colors from '../colors.js';

customElements.define('spinner-border', class extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this.size = 2;
    this.label = 'Please Wait';
  }

  connectedCallback() {
    this.render();
  }

  set size(size) {
    this._size = size;
  }

  get size() {
    return this._size;
  }

  set label(label) {
    this._label = label;
  }

  get label() {
    return this._label;
  }

  render() {
    this._shadowRoot.innerHTML = `
    <style>
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .spinner {
      width: ${this.size}rem;
      height: ${this.size}rem;
      border: 4px solid;
      border-color: ${colors.primary} ${colors.primary} ${colors.primary} transparent;
      border-radius: 50%;
      animation: spin 500ms linear infinite;
      margin: 1rem auto;
    }

    .label {
      text-align: center;
      color: ${colors.gray}
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    </style>
    <div class="spinner"></div>
    <div class="label">${this.label}</div>
    `;
  }

  static get observedAttributes() {
    return ['size', 'label'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'size':
        this.size = newValue;
        break;
      case 'label':
        this.label = newValue;
        break;
    }
  }
});
