// const socket = io();
const loginForm = document.getElementById("welcome-form");
// ^^"username"??
const messagesSection = document.getElementById("message-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");
const userName = "";

const login = (e) => {
  e.preventDefault();
  if (userNameInput.value !== "") {
    userName = userNameInput.value;
    loginForm.classList.remove("show");
    messagesSection.classList.add("show");
  } else {
    alert("Error, enter your user name");
  }
  console.log(userName);
};

const sendMessage = (e) => {
  e.preventDefault();
  if (messageContentInput.value !== "") {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = "";
  } else {
    alert("Error, enter your message");
  }
};

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    ///???
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class="message__content">
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
    ///???
  }

addMessageForm.addEventListener("submit", (e) => sendMessage(e));
loginForm.addEventListener("submit", (e) => login(e));
