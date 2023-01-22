//!variables
var logInEmail = document.getElementById("logInEmail");
var logInPass = document.getElementById("logInPass");
var logInButton = document.getElementById("logInButton");
var checkInput = document.getElementById("checkInput");
var emailAlert = document.getElementById("emailAlert");
var passAlert = document.getElementById("passAlert");
var dataArr = [];
var currentIndex = 0;
//!events

if (JSON.parse(localStorage.getItem("parsonalData") != null)) {
  dataArr = JSON.parse(localStorage.getItem("parsonalData"));
}
logInButton.addEventListener("click", chickValidData);
logInEmail.addEventListener("keyup", validationEmail);
logInPass.addEventListener("keyup", validationPass);

//!function

function chickValidData() {
  var cond = false;
  for (var i = 0; i < dataArr.length; i++) {
    if (
      logInEmail.value == dataArr[i].email &&
      logInPass.value == dataArr[i].pass
    ) {
      cond = true;
      break;
    }
  }
  if (cond == true) {
    massageName();
    moveToNextPage();
  } else {
    invalideInput();
  }
}
function moveToNextPage() {
  localStorage.setItem("indexArr",currentIndex)
  logInButton.href = "main-screen.html";

}
function invalideInput() {
  checkInput.classList.remove("d-none");
}

function massageName() {
  var cond = false;
  for (var i = 0; i < dataArr.length; i++) {
    if (
      dataArr[i].email == logInEmail.value &&
      dataArr[i].pass == logInPass.value
    ) {
      cond = true;
      currentIndex = i;
      break;
    }
  }

}

// !validation email input

function validationEmail() {
  var emailRejex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRejex.test(logInEmail.value)) {
    logInButton.disabled = "true";
    logInEmail.classList.add("is-invalid");
    logInEmail.classList.remove("is-valid");
    emailAlert.classList.remove("d-none");
  } else {
    logInButton.removeAttribute("disabled");
    logInEmail.classList.remove("is-invalid");
    logInEmail.classList.add("is-valid");
    emailAlert.classList.add("d-none");
  }
}

// !validation password input

function validationPass() {
  var passRejex = /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{4,15}$/;
  if (!passRejex.test(logInPass.value)) {
    logInButton.disabled = "true";
    logInPass.classList.add("is-invalid");
    logInPass.classList.remove("is-valid");
    passAlert.classList.remove("d-none");
  } else {
    logInButton.removeAttribute("disabled");
    logInPass.classList.remove("is-invalid");
    logInPass.classList.add("is-valid");
    passAlert.classList.add("d-none");
  }
}
