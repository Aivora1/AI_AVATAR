let tapCount = 0;
const maxTaps = 3;


if (window.Telegram && Telegram.WebApp) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
}


const setupScreen = document.getElementById("setup");
const mainScreen = document.getElementById("main");

const startBtn = document.getElementById("startBtn");
const tapBtn = document.getElementById("tapBtn");
const saveBtn = document.getElementById("saveBtn");

const hello = document.getElementById("hello");
const tapsText = document.getElementById("taps");
const forecast = document.getElementById("forecast");


function resetDay() {
  tapCount = 0;
  forecast.style.display = "none";
  tapBtn.disabled = false;
  tapsText.innerText = "Нажми 3 раза";
}

const isRegistered = localStorage.getItem("registered") === "true";

if (isRegistered) {
  const name = localStorage.getItem("name") || "Друг";
  hello.innerText = `Привет, ${name}`;

  setupScreen.classList.remove("active");
  mainScreen.classList.add("active");

  resetDay();
} else {
  setupScreen.classList.add("active");
  mainScreen.classList.remove("active");
}


startBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const birth = document.getElementById("birth").value;
  const zodiac = document.getElementById("zodiac").value;

  if (!name || !birth || !zodiac) {
    alert("Заполни все поля");
    return;
  }

 
  localStorage.setItem("registered", "true");
  localStorage.setItem("name", name);
  localStorage.setItem("birth", birth);
  localStorage.setItem("zodiac", zodiac);

  hello.innerText = `Привет, ${name}`;

  resetDay();

  setupScreen.classList.remove("active");
  mainScreen.classList.add("active");
});


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


saveBtn.addEventListener("click", () => {
  const name = localStorage.getItem("name");
  const birth = localStorage.getItem("birth");
  const zodiac = localStorage.getItem("zodiac");

  if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.sendData(JSON.stringify({
      name: name,
      birth_date: birth,
      zodiac: zodiac
    }));
  }
});
