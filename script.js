let tapCount = 0;
const maxTaps = 3;

// --- Telegram WebApp init ---
if (window.Telegram && Telegram.WebApp) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
}

// --- Elements ---
const setupScreen = document.getElementById("setup");
const mainScreen = document.getElementById("main");

const startBtn = document.getElementById("startBtn");
const tapBtn = document.getElementById("tapBtn");
const saveBtn = document.getElementById("saveBtn");

const hello = document.getElementById("hello");
const tapsText = document.getElementById("taps");
const forecast = document.getElementById("forecast");

// --- Start ---
startBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const birth = document.getElementById("birth").value;
  const zodiac = document.getElementById("zodiac").value;

  if (!name || !birth || !zodiac) {
    alert("Заполни все поля");
    return;
  }

  hello.innerText = `Привет, ${name}`;

  setupScreen.classList.remove("active");
  mainScreen.classList.add("active");
});

// --- Tap logic ---
tapBtn.addEventListener("click", () => {
  tapCount++;

  const left = maxTaps - tapCount;

  if (left > 0) {
    tapsText.innerText = `Осталось ${left} тап(а)`;
  } else {
    tapsText.innerText = "День раскрыт ✨";
    forecast.style.display = "block";
    tapBtn.disabled = true;
  }
});

// --- Send data & close ---
saveBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const birth = document.getElementById("birth").value;
  const zodiac = document.getElementById("zodiac").value;

  if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.sendData(JSON.stringify({
      name: name,
      birth_date: birth,
      zodiac: zodiac
    }));
  }
});
