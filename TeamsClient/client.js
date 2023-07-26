import { CallClient } from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import * as signalR from "@microsoft/signalr";

let call;
let callAgent;
const meetingLinkInput = document.getElementById('teams-link-input');
const acsKeyInput = document.getElementById('acs-key-input');
const signalrServerInput = document.getElementById('signalr-server-input');
const initButton = document.getElementById('init-button');
const hangUpButton = document.getElementById('hang-up-button');
const teamsMeetingJoinButton = document.getElementById('join-meeting-button');
const callStateElement = document.getElementById('call-state');
const observeMemberStateButton = document.getElementById('observe-member-state-button');

let connection = new signalR.HubConnectionBuilder()
  .withUrl(signalrServerInput.value)
  .build();
connection.start();

async function init() {
    const callClient = new CallClient();
    const tokenCredential = new AzureCommunicationTokenCredential(acsKeyInput.value);
    callAgent = await callClient.createCallAgent(tokenCredential, { displayName: 'TwinkleTeams' });
    teamsMeetingJoinButton.disabled = false;
}

initButton.addEventListener("click", async () => {
    init();
});

hangUpButton.addEventListener("click", async () => {
    await call.hangUp();
    hangUpButton.disabled = true;
    teamsMeetingJoinButton.disabled = false;
    callStateElement.innerText = '-';
});

async function isSpeakingCallback(id, name, state) {
    const t = document.getElementById(id);
    const stateMessage = state ? 'speaking' : '-';
    if (t) {
        t.textContent = `${name}:[${id}] ${stateMessage}`;
    } else {
        var li = document.createElement("li");
        li.setAttribute("id", id);
        li.textContent = `${name}:[${id}] ${stateMessage}`;
        document.getElementById("members").appendChild(li);
    }

    connection
    .invoke("SendMessage", JSON.stringify({
        isSpeaking: state,
        name: name
    }))
    .catch(function (err) {
      console.log(err.toString());
      return true;
    });
}

teamsMeetingJoinButton.addEventListener("click", () => {
    call = callAgent.join({ meetingLink: meetingLinkInput.value }, {});
    call.on('stateChanged', () => {
        callStateElement.innerText = call.state;
        if (call.state === "Connected") {
            observeMemberStateButton.disabled = false;
        }
    });
    
    hangUpButton.disabled = false;
    teamsMeetingJoinButton.disabled = true;
});

observeMemberStateButton.addEventListener("click", () => {
    call.remoteParticipants.forEach(element => {
        if (element._eventEmitter._events.isSpeakingChanged) return;
        element.on('isSpeakingChanged', () => {
            isSpeakingCallback(`${element.identifier.microsoftTeamsUserId}`, `${element.displayName}`, element.isSpeaking)
        })
    });
});
