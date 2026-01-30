const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

function createAvatar() {
  const name = document.getElementById("name").value;
  const archetype = document.getElementById("archetype").value;
  const style = document.getElementById("style").value;

  if (!name) {
    tg.showAlert("Введите имя аватара");
    return;
  }

  // обновляем UI
  document.getElementById("avatarName").innerText = name;
  document.getElementById("avatarType").innerText = "Архетип: " + archetype;

  // переключаем экраны
  document.getElementById("onboarding").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  // отправляем данные в бота
  // tg.sendData(JSON.stringify({
  //   action: "create_avatar",
  //   name,
  //   archetype,
  //   style
  // }));
}

function startChat() {
  tg.sendData(JSON.stringify({ action: "start_chat" }));
}

function upgrade() {
  tg.sendData(JSON.stringify({ action: "upgrade_menu" }));
}

function profile() {
  tg.sendData(JSON.stringify({ action: "profile" }));
}

