import { shufflePair } from './utils.js';

import './styles/app.css';
import './ui/pages/main-page.js';
import './ui/pages/game-page.js';
import './ui/pages/summary-page.js';

import events from './ui/events.js';

import jpTerms from './terms/jp.json';
import idTerms from './terms/id.json';

function main() {
  const container = document.querySelector('main');
  const mainPage = document.createElement('main-page');

  window.addEventListener(events.GAME_STARTED_EVENT, e => {
    container.innerHTML = '';
    const gamePage = document.createElement('game-page');
    const [jp, id] = shufflePair(jpTerms, idTerms);
    gamePage.settings = {
      options: e.detail,
      questions: { jp, id }
    };
    container.appendChild(gamePage);
  });
  window.addEventListener(events.GAME_RESTART_EVENT, e => {
    container.innerHTML = '<h1>Quiz Materi Bahasa Jepang</h1>';
    container.appendChild(mainPage);
  });

  const showSummary = summaries => {
    container.innerHTML = '';
    const summaryPage = document.createElement('summary-page');
    summaryPage.summaries = summaries;
    container.appendChild(summaryPage);
  }

  window.addEventListener(events.GAME_FINISHED_EVENT, e => showSummary(e.detail));
  window.addEventListener(events.GAME_TERMINATED_EVENT, e => showSummary(e.detail));
  
  container.appendChild(mainPage);
}

window.addEventListener('DOMContentLoaded', main);
