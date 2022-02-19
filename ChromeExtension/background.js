importScripts("signalr.min.js");

var connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5132/statusHub")
  .build();
connection.start();

chrome.runtime.onMessage.addListener((message) => {
  connection
    .invoke("SendMessage", JSON.stringify(message))
    .catch(function (err) {
      console.log(err.toString());
      return true;
    });
  return true;
});
