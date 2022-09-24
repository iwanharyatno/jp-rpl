import '../components/question-summary.js';
import '../components/x-button.js';
import '../components/tab-select.js';

import colors from '../colors.js';
import events from '../events.js';

customElements.define('summary-page', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._summaries = [];

    const style = document.createElement('style');
    style.innerText = `
      .summary-container {
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
      }

      tab-select {
        margin-bottom: 1rem;
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
    `;
    this._shadowRoot.appendChild(style);

    const summaryHeader = document.createElement('div');
    summaryHeader.classList.add('summary-header');
    summaryHeader.innerHTML = '<h1>Ringkasan</h1>';

    const restartButton = document.createElement('x-button');
    restartButton.setAttribute('variant', 'primary');
    restartButton.innerText = 'Kembali';
    restartButton.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent(events.GAME_RESTART_EVENT));
    });

    this._filterTabs = document.createElement('tab-select');
    this._filterTabs.addEventListener(events.TABSELECT_CHANGED_EVENT, (e) => {
      switch(e.detail.id) {
        case 1:
          this._displayedSummaries = this._allAnswers;
          break;
        case 2:
          this._displayedSummaries = this._correctAnswers;
          break;
        case 3:
          this._displayedSummaries = this._wrongAnswers;
          break;
      }
      this.render();
    });

    this._summaryContainer = document.createElement('div');
    this._summaryContainer.classList.add('summary-container');

    summaryHeader.appendChild(restartButton);
    this._shadowRoot.appendChild(summaryHeader);
    this._shadowRoot.appendChild(this._filterTabs);
    this._shadowRoot.appendChild(this._summaryContainer);
  }

  connectedCallback() {
    this.render();

    this._filterTabs.tabs = [
      {
        id: 1,
        text: `Semua (${this._allAnswers.length})`,
        active: true
      },
      {
        id: 2,
        text: `Benar (${this._correctAnswers.length})`
      },
      {
        id: 3,
        text: `Salah (${this._wrongAnswers.length})`
      },
    ];
  }

  set summaries(summaries) {
    this._allAnswers = summaries;
    this._correctAnswers = summaries.filter(summary => summary.isCorrect);
    this._wrongAnswers = summaries.filter(summary => !summary.isCorrect);
    this._displayedSummaries = summaries;

    this.render();
  }

  render() {
    this._summaryContainer.innerHTML = '';

    this._displayedSummaries.forEach(summary => {
      const questionSummary = document.createElement('question-summary');
      questionSummary.summary = summary;
      this._summaryContainer.appendChild(questionSummary);
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
