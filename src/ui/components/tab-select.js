import colors from '../colors.js';
import events from '../events.js';

customElements.define('tab-select', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
  }

  connectedCallback() {
    this.render();
  }

  set tabs(tabs) {
    this._tabs = tabs;
    this.render();
  }

  get tabs() {
    return this._tabs;
  }

  render() {
    this._shadowRoot.innerHTML = `
    <style>
    :host {
      display: flex;
      flex-wrap: wrap;
    }

    .tab {
      border: none;
      padding: 0.5rem 1rem;
      margin-right: 0.25rem;
      background-color: #ffffff;
      font-size: 1rem;
    }
    .tab:hover {
      background-color: ${colors.lightGray};
    }
    .tab:focus {
      outline: 2px solid ${colors.gray};
    }

    .active {
      background-color: ${colors.primary};
      color: #ffffff;
    }
    .active:hover {
      background-color: ${colors.primaryDark};
    }
    </style>
    `;
    this._tabs.forEach(tab => {
      const tabButton = document.createElement('button');
      tabButton.setAttribute('class', `tab ${tab.active ? 'active' : ''}`);
      tabButton.innerText = tab.text;
      tabButton.addEventListener('click', e => {
        this.dispatchEvent(new CustomEvent(events.TABSELECT_CHANGED_EVENT, {
          detail: tab
        }));
        this._shadowRoot.querySelectorAll('.tab').forEach(btn => btn.setAttribute('class', 'tab'));
        tabButton.setAttribute('class', 'tab active');
      });
      this._shadowRoot.appendChild(tabButton);
    });
  }

  static get observedAttributes() {
    return ['tabs'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'tabs':
        this.tabs = tabs;
        break;
    }
  }
});
