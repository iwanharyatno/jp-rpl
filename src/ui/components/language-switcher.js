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
    <button id="toggler">
      <svg xmlns="http://www.w3.org/2000/svg" width="40%" height="40%" fill="currentColor" class="bi bi-arrow-left-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
      </svg>
    </button>
    <div id="target-lang">${this.targetLang}</div>
    `;

    this._shadowRoot.querySelector('#toggler').addEventListener('click', () => this._switch());
  }

  _switch() {
    [this._sourceLang, this._targetLang] = [this._targetLang, this._sourceLang];
    this.render();
  }
});
