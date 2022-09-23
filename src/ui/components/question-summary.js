import colors from '../colors.js';

customElements.define('question-summary', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._summary = {};
  }

  connectedCallback() {
    this.render();
  }

  set summary(summary) {
    this._summary = summary;
    this.render();
  }

  render() {
    const borderColor = this._summary.isCorrect ? colors.successDark : colors.dangerDark;
    const backgroundColor = this._summary.isCorrect ? colors.success : colors.danger;
    this._shadowRoot.innerHTML = `
    <style>
      :host {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border: 1px solid ${borderColor};
        border-radius: 1rem;
        background-color: ${backgroundColor};
        font-size: 0.8rem;
        color: #ffffff;
      }

      .question-box {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        min-height: 4rem;
        border: 1px solid ${borderColor};
        border-radius: 1rem;
        margin-bottom: 1rem;
        font-weight: 300;
        font-size: 1.2rem;
      }

      .answer-box {
        padding: 2rem;
        text-align: center;
        border: 1px solid ${borderColor};
        border-radius: 1rem;
        margin-bottom: 0.5rem;
      }

      .answer-label {
        color: #000000;
        font-weight: 700;
        display: block;
        margin-bottom: 0.2rem;
      }
    </style>
    `;
    this._shadowRoot.innerHTML += `
    <div class="question-box">${this._summary.question}</div>
    <div class="answer-box">
      <span class="answer-label">Jawaban Benar:</span>
      ${this._summary.correctAnswer}
    </div>
    <div class="answer-box">
      <span class="answer-label">Jawaban Anda:</span>
      ${this._summary.userAnswer ?? '<em>Kosong</em>'}
    </div>
    `;
  }

  static get observedAttributes() {
    return ['summary'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'summary':
        this.summary = JSON.parse(newValue);
        break;
    }
  }
});
