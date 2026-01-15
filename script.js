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

    const data = {
    action: "create_avatar",
    name: name,
    archetype: archetype,
    style: style
    };

    tg.sendData(JSON.stringify(data));
    tg.close();
}