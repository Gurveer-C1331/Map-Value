const electron = require("electron");
const remote = electron.remote;
const ipc = electron.ipcRenderer;

const set_btn = document.getElementById("button");
set_btn.addEventListener("click", function(event){
    ipc.send("value_entered", document.getElementById("input-field").value); //send message to main.js

    var window = remote.getCurrentWindow();
    window.close();
});