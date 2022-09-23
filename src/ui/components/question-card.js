import { shuffle } from '../../utils.js';
import colors from '../colors.js';

customElements.define('question-card', class extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._qData = {};
    this._summary = {};
    this._answered = false;
  }

  connectedCallback() {
    this.render();
  }

  set qData(data) {
    this._qData = data;
    this._answered = false;
    this._summary = {};
    this.render();
  }

  get summary() {
    if (Object.keys(this._summary).length == 0) {
      const question = this._qData.question;
      const correctAnswer = this._qData.correctAnswer;
      return {
        question,
        correctAnswer,
        userAnswer: null,
        isCorrect: false
      }
    }

    return this._summary;
  }

  render() {
    this._shadowRoot.innerHTML = `
    <style>
      :host {
        display: flex;
        flex-direction: column;
      }
      .question-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid ${colors.mediumGray};
        border-radius: 1rem;
        padding: 2rem;
        min-height: 12rem;
        font-size: 1.5rem;
        text-align: center;
        font-weight: 300;
      }

      .answers-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 0.5rem;
        margin-top: 1rem;
      }

      .answer-box {
        background-color: ${colors.lightGray};
        padding: 1rem;
        text-align: center;
        border: 1px solid ${colors.mediumGray};
        user-select: none;
        border-radius: 1rem;
      }
      .answer-box:hover {
        opacity: 0.7;
      }

      .selected-correct {
        background-color: ${colors.success};
        color: #ffffff;
      }
      .selected-wrong {
        background-color: ${colors.danger};
        color: #ffffff;
      }
      .answer-box:focus {
        outline: 2px solid ${colors.gray};
      }
    </style>
    `;
    this._shadowRoot.innerHTML += `
    <div class="question-box">${this._qData.question}</div>
    <div class="answers-container">
    </div>
    `;

    shuffle(this._qData.answers).forEach(answer => {
      const answerBox = document.createElement('button');
      answerBox.setAttribute('class', 'answer-box');
      answerBox.innerText = answer;
      answerBox.addEventListener('click', () => {
        if (this._answered) return;
        this._shadowRoot.querySelectorAll('.answer-box').forEach(box => box.setAttribute('class', 'answer-box'));
        
        const question = this._qData.question;
        const correctAnswer = this._qData.correctAnswer;
        const isCorrect = correctAnswer === answer;

        if (isCorrect) {
          answerBox.setAttribute('class', 'answer-box selected-correct');
        } else {
          answerBox.setAttribute('class', 'answer-box selected-wrong');
        }

        this._summary = {
          question,
          correctAnswer,
          userAnswer: answer,
          isCorrect
        };

        this._answered = true;
      });

      this._shadowRoot.querySelector('.answers-container').appendChild(answerBox);
    });
  }

  static get observedAttributes() {
    return ['q-data'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch(name) {
      case 'q-data':
        this.qData = JSON.parse(newValue);
        break;
    }
    this.render();
  }
});
