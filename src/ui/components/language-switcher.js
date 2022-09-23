import colors from '../colors.js';

customElements.define('language-switcher', class extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._sourceLang = 'JP';
    this._targetLang = 'ID';
  }

  connectedCallback() {
    this.render();
  }

  get sourceLang() {
    return this._sourceLang;
  }

  get targetLang() {
    return this._targetLang;
  }

  render() {
    this._shadowRoot.innerHTML = `
    <style>
      :host {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
      }

      #source-lang,
      #target-lang {
        width: 4rem;
        text-align: center;
        font-size: 2rem;
        color: ${colors.primary};
      }

      #toggler {
        width: 5rem;
        height: 5rem;
        font-size: 2rem;
        border: none;
        background: transparent;
        user-select: none;
      }
      #toggler:hover {
        background-color: ${colors.lightGray};
      }
      #toggler:focus {
        outline: 2px solid ${colors.mediumGray};
      }
    </style>
    `;
    this._shadowRoot.innerHTML += `
    <div id="source-lang">${this.sourceLang}</div>
    <button id="toggler">=&gt;</button>
    <div id="target-lang">${this.targetLang}</div>
    `;

    this._shadowRoot.querySelector('#toggler').addEventListener('click', () => this._switch());
  }

  _switch() {
    [this._sourceLang, this._targetLang] = [this._targetLang, this._sourceLang];
    this.render();
  }
});
