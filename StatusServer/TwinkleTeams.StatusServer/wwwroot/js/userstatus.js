"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/statusHub").build();
connection.on("ReceiveMessage", function (message) {
    document.getElementById("messagesList").appendChild(li);
    console.log(message);
});

connection.start();
