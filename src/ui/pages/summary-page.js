import '../components/question-summary.js';
import '../components/x-button.js';

import colors from '../colors.js';
import events from '../events.js';

customElements.define('summary-page', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._summaries = [];
  }

  connectedCallback() {
    this.render();
  }

  set summaries(summaries) {
    this._summaries = summaries;
    this.render();
  } 

  get summaries() {
    return this._summaries;
  }

  render() {
    this._shadowRoot.innerHTML = `
    <style>
      :host {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1rem;
      }

      .summary-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        border-bottom: 1px solid ${colors.mediumGray};
        margin-bottom: 1rem;
        grid-column: 1/3;
      }
      
      h1 {
        font-size: 1.5rem;
        font-weight: 300;
      }

      question-summary {
        grid-column: 1/3;
      }

      @media screen and (min-width: 768px) {
        question-summary {
          grid-column: auto;
        }
      }
    </style>
    <div class="summary-header">
      <h1>Ringkasan</h1>
      <x-button variant="primary" id="restart-button">Kembali</x-button>
    </div>
    `;

    this.summaries.forEach(summary => {
      const questionSummary = document.createElement('question-summary');
      questionSummary.summary = summary;
      this._shadowRoot.appendChild(questionSummary);
    });

    this._shadowRoot.querySelector('x-button').addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent(events.GAME_RESTART_EVENT));
    });
  }

  static get observedAttributes() {
    return ['summaries'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'summaries':
        this.summaries = JSON.parse(newValue);
        break;
    }
  }
});
