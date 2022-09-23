import { selectItems } from '../../utils.js';

import '../components/x-button.js';
import '../components/time-bar.js';
import '../components/question-card.js';

import colors from '../colors.js';
import events from '../events.js';

customElements.define('game-page', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });

    const style = document.createElement('style');
    style.innerText = `
    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid ${colors.mediumGray};
      margin-bottom: 1rem;
    }
    .q-counts {
      font-size: 1.5rem;
      color: ${colors.gray};
    }
    question-card {
      margin: 1rem 0;
    }
    `;

    this._questionIndex = 0;
    this._running = true;
    this._summaries = [];
    
    this._shadowRoot.appendChild(style);
  }

  get settings() {
    return this._settings;
  }

  set settings(settings) {
    this._settings = settings;
    this.setup();
  }

  setup() {
    const header = document.createElement('div');
    header.setAttribute('class', 'game-header');

    this._questionCountsField = document.createElement('div');
    this._questionCountsField.setAttribute('class', 'q-counts');

    this._endButton = document.createElement('x-button');
    this._endButton.innerText = 'Berhenti';
    this._endButton.setAttribute('variant', 'danger');
    this._endButton.addEventListener('click', () => {
      window.dispatchEvent(
        new CustomEvent(events.GAME_TERMINATED_EVENT, {
          detail: this._summaries
        })
      );
      this._running = false;
    });

    this._questionCountsField.innerText = '1/' + this._settings.questions.jp.length;

    header.append(this._questionCountsField, this._endButton);
    this._shadowRoot.appendChild(header);

    this._timeBar = document.createElement('time-bar');
    this._timeBar.setAttribute('timeout', this._settings.options.interval);
    this._timeBar.addEventListener(events.TIMEOUT_EVENT, () => {
      this._summaries.push(this._questionCard.summary);
      if (!this._running) return;
      if (this._questionIndex === this._settings.questions.jp.length - 126) {
        window.dispatchEvent(
          new CustomEvent(events.GAME_FINISHED_EVENT, {
            detail: this._summaries
          })
        );
        return;
      };
      this._timeBar.setAttribute('timeout', this._settings.options.interval);
      this._next();
    });

    this._shadowRoot.appendChild(this._timeBar);

    this._questionCard = document.createElement('question-card');
    this._next();
    this._shadowRoot.appendChild(this._questionCard);
  }

  static get observedAttributes() {
    return ['settings', 'questions'];
  }

  _next() {
    const sourceLang = this._settings.options.sourceLang;
    const targetLang = this._settings.options.targetLang;

    const sourceLangTerms = this._settings.questions[sourceLang];
    const targetLangTerms = this._settings.questions[targetLang];

    const answers = [
      targetLangTerms[this._questionIndex],
      ...selectItems(targetLangTerms, { excludeIndex: this._questionIndex })
    ];

    this._questionCard.setAttribute('q-data', JSON.stringify({
      question: sourceLangTerms[this._questionIndex],
      answers,
      correctAnswer: answers[0]
    }));

    this._questionCountsField.innerText = (this._questionIndex + 1) + '/' + sourceLangTerms.length;
    this._questionIndex += 1;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'settings':
        this._settings = newValue;
        this.setup();
        break;
      case 'questions':
        this._questions = JSON.parse(newValue);
        this.setup();
        break;
    }
  }
});
