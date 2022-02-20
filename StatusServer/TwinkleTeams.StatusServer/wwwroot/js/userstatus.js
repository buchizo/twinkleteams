"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/statusHub").build();

connection.on("ReceiveMessage", function (message) {
    const status = JSON.parse(message);
    const avaters = document.getElementsByClassName("avatar");
    for (const avater of avaters) {
        if (avater.dataset.name !== status.name) continue;
        if (!status.isMuted && status.isSpeaking) {
            avater.classList.add("speaking");
        } else {
            avater.classList.remove("speaking");
        }
    }
});

connection.start();
