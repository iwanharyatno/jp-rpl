import '../components/language-switcher.js';
import '../components/input-label.js';
import '../components/x-button.js';

import colors from '../colors.js';
import events from '../events.js';

customElements.define('main-page', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });

    this._languageSwitcher = document.createElement('language-switcher');

    this._intervalInput = document.createElement('input-label');
    this._intervalInput.setAttribute('label-text', 'Interval (ms)');
    this._intervalInput.setAttribute('type', 'number');
    this._intervalInput.setAttribute('id', 'interval-input');
    this._intervalInput.setAttribute('value', '1000');

    this._startButton = document.createElement('x-button');
    this._startButton.setAttribute('variant', 'primary');
    this._startButton.innerText = 'Mulai';

    const style = document.createElement('style');
    style.innerText = `
    #interval-input {
      width: 20rem;
      margin: 2rem auto;
    }

    language-switcher {
      margin-top: 2rem;
    }

    x-button {
      width: 7rem;
      margin: 7rem auto;
    }
    `;

    this._startButton.addEventListener('click', () => {
      const sourceLang = this._languageSwitcher.sourceLang.toLowerCase();
      const targetLang = this._languageSwitcher.targetLang.toLowerCase();
      const interval = this._intervalInput.value;

      window.dispatchEvent(
        new CustomEvent(events.GAME_STARTED_EVENT, {
          detail: { sourceLang, targetLang, interval }
        })
      )
    });

    this._shadowRoot.appendChild(style);
    this._shadowRoot.appendChild(this._languageSwitcher);
    this._shadowRoot.appendChild(this._intervalInput);
    this._shadowRoot.appendChild(this._startButton);
  }
});
