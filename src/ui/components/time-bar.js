import events from '../events.js';
import colors from '../colors.js';

customElements.define('time-bar', class extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._timeout = 0;

    this._timeoutFunction = null;
  }

  get timeout() {
    return this._timeout;
  }

  set timeout(millis) {
    this._timeout = millis;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._shadowRoot.innerHTML = `
    <style>
    :host {
      display: block;
      background-color: ${colors.mediumGray};
    }

    .time-bar {
      width: 100%;
      height: 4px;
      background-color: ${colors.primary};
      animation: decrease ${this.timeout}ms linear;
      animation-fill-mode: forwards;
    }

    @keyframes decrease {
      from { width: 100% }
      to { width: 0% }
    }
    </style>
    `;
    this._shadowRoot.innerHTML += `<div class="time-bar"></div>`;

    if (this._timeoutFunction) return;
    this._timeoutFunction = setTimeout(() => {
      this._timeoutFunction = null;
      this.dispatchEvent(new Event(events.TIMEOUT_EVENT));
    }, this.timeout);
  }

  static get observedAttributes() {
    return ['timeout'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'timeout':
        this._timeout = newValue;
        break;
    }
    this.render();
  }
});
