import { shufflePair } from './utils.js';

import './styles/app.css';

import './ui/components/spinner-border.js';
import './ui/components/x-button.js';

import './ui/pages/main-page.js';
import './ui/pages/game-page.js';
import './ui/pages/summary-page.js';

import events from './ui/events.js';

function main() {
  const container = document.querySelector('main');
  const mainPage = document.createElement('main-page');

  const startGame = e => {
    container.innerHTML = '<spinner-border label="Mengambil Soal" class="fullscreen"></spinner-border>';
    const gamePage = document.createElement('game-page');
    
    Promise.all([
      fetch('https://iwanharyatno.github.io/jp-rpl-resources/jp.json').then(response => response.json()),
      fetch('https://iwanharyatno.github.io/jp-rpl-resources/id.json').then(response => response.json())
    ]).then(termsAll => {
      container.innerHTML = '';
      const [jp, id] = shufflePair(...termsAll);
      gamePage.settings = {
        options: e.detail,
        questions: { jp, id }
      };

      container.appendChild(gamePage);
    }).catch(error => {
      container.innerHTML = `
        <div class="fullscreen fullscreen-center">
          <p>Gagal memuat soal</p>
          <x-button variant="primary">Coba Lagi</x-button>
        </div>`;
      container.querySelector('x-button').addEventListener('click', () => startGame(e));
    });
  };

  const showSummary = e => {
    container.innerHTML = '';
    const summaryPage = document.createElement('summary-page');
    summaryPage.summaries = e.detail;
    container.appendChild(summaryPage);
  }

  window.addEventListener(events.GAME_STARTED_EVENT, startGame);
  window.addEventListener(events.GAME_RESTART_EVENT, e => {
    container.innerHTML = '<h1>Kuis Kosakata Bahasa Jepang</h1>';
    container.appendChild(mainPage);
  });

  window.addEventListener(events.GAME_FINISHED_EVENT, showSummary);
  window.addEventListener(events.GAME_TERMINATED_EVENT, showSummary);
  
  container.appendChild(mainPage);
}

window.addEventListener('DOMContentLoaded', main);
