const horses = [
  'Secretariat',
  'Eclipse',
  'West Australian',
  'Flying Fox',
  'Seabiscuit',
];

const refs = {
  startBtn: document.querySelector('.js-start-race'),
  winnerField: document.querySelector('.js-winner'),
  progressField: document.querySelector('.js-progress'),
  tableBody: document.querySelector('.js-results-table > tbody'),
};

let raceCounter = 0;

refs.startBtn.addEventListener('click', () => {
  const promises = horses.map(run);

  raceCounter++;

  updateWinnerField('');
  updateProgressFeild('Заезд начался, ставки не принимаются!');
  determineWinner(promises);
  waitForAll(promises);
});

function updateResultsTable({ horse, time, raceCounter }) {
  const tr = `<tr><td>${raceCounter}</td><td>${horse}</td><td>${time}</td></tr>`;
  refs.tableBody.insertAdjacentHTML('beforeend', tr);
}

function determineWinner(horsesP) {
  Promise.race(horsesP).then(({ horse, time }) => {
    updateWinnerField(`Победил ${horse}, финишировав за ${time} времени`);
    updateResultsTable({ horse, time, raceCounter });
  });
}

function waitForAll(horsesP) {
  Promise.all(horsesP).then(() => {
    updateProgressFeild(`Заезд окончен, принимаются ставки`);
  });
}

function updateWinnerField(message) {
  refs.winnerField.textContent = message;
}

function updateProgressFeild(message) {
  refs.progressField.textContent = message;
}

function run(horse) {
  return new Promise((resolve, reject) => {
    const time = getRandomTime(2000, 3500);

    setTimeout(() => {
      resolve({ horse, time });
    }, time);
  });
}

function getRandomTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
