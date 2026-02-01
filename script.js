let tapCount = 0;
const maxTaps = 3;

const setupScreen = document.getElementById('setup');
const mainScreen = document.getElementById('main');
const startBtn = document.getElementById('startBtn');
const tapBtn = document.getElementById('tapBtn');

const hello = document.getElementById('hello');
const tapsText = document.getElementById('taps');
const forecast = document.getElementById('forecast');

startBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value || 'Друг';

  hello.innerText = `Привет, ${name}`;
  setupScreen.classList.remove('active');
  mainScreen.classList.add('active');
});

tapBtn.addEventListener('click', () => {
  tapCount++;

  const left = maxTaps - tapCount;

  if (left > 0) {
    tapsText.innerText = `Осталось ${left} тап(а)`;
  } else {
    tapsText.innerText = 'День раскрыт ✨';
    forecast.style.display = 'block';
    tapBtn.disabled = true;
  }
});
Telegram.WebApp.sendData(JSON.stringify({
  name: name,
  birth_date: birth,
  zodiac: zodiac
}))