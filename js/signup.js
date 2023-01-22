// !Java Script For Signup page
var userName = document.getElementById("userNameSignUp");
var userEmail = document.getElementById("signUpEmail");
var userPass = document.getElementById("signUpPassword");
var signUpButton = document.getElementById("signUpButton");
var success = document.getElementById("success");
var input = document.querySelectorAll("input");
var goToLoginPage = document.getElementById("goToLoginPage");
var checkInput = document.getElementById("checkInput");
var checkExist = document.getElementById("checkExist");
var nameAlert = document.getElementById("nameAlert");
var emailAlert = document.getElementById("emailAlert");
var passAlert = document.getElementById("passAlert");
var userData = [];

//!events
signUpButton.addEventListener("click", signUp);
goToLoginPage.addEventListener("click", moveToNextPage);
userName.addEventListener("keyup", validationName);
userEmail.addEventListener("keyup", validationEmail);
userPass.addEventListener("keyup", validationPass);
//!function
function displayData() {
  var data = {
    name: userName.value,
    email: userEmail.value,
    pass: userPass.value,
  };
  userData.push(data);
  localStorage.setItem("parsonalData", JSON.stringify(userData));
}

if (JSON.parse(localStorage.getItem("parsonalData") != null)) {
  userData = JSON.parse(localStorage.getItem("parsonalData"));
}

function signUp() {
  if (userName.value == "" || userEmail.value == "" || userPass.value == "") {
    inpuTempty();
  } else {
    // resetData();
    successMassage();
    checkExistMassage();
  }
}
function resetData() {
  for (var i = 0; i < input.length; i++) {
    input[i].value = "";
  }
}
function successMassage() {
  success.classList.remove("d-none");
  checkInput.classList.add("d-none");
  checkExist.classList.add("d-none");
}
function checkExistMassage() {
  var cond = false;
  for (var i = 0; i < userData.length; i++) {
    if (userEmail.value == userData[i].email) {
      cond = true;
      break;
    }
  }
  if (cond == true) {
    success.classList.add("d-none");
    checkInput.classList.add("d-none");
    checkExist.classList.remove("d-none");
  } 
  else {
    displayData();
  }
}
function moveToNextPage() {
  goToLoginPage.href = "index.html";
}
function inpuTempty() {
  checkInput.classList.remove("d-none");
  success.classList.add("d-none");
  checkExist.classList.add("d-none");
}



function validationName() {
  var nameRejex = /^[A-Z][a-z/s]{2,10}$/;
  if (!nameRejex.test(userName.value)) {
    signUpButton.disabled = "true";
    userName.classList.add("is-invalid");
    userName.classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
  } else {
    signUpButton.removeAttribute("disabled");
    userName.classList.remove("is-invalid");
    userName.classList.add("is-valid");
    nameAlert.classList.add("d-none");
  }
}


function validationEmail() {
  var emailRejex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRejex.test(userEmail.value)) {
    signUpButton.disabled = "true";
    userEmail.classList.add("is-invalid");
    userEmail.classList.remove("is-valid");
    emailAlert.classList.remove("d-none");
  } else {
    signUpButton.removeAttribute("disabled");
    userEmail.classList.remove("is-invalid");
    userEmail.classList.add("is-valid");
    emailAlert.classList.add("d-none");
  }
}

// !validation password input

function validationPass() {
  var passRejex = /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{4,15}$/;
  if (!passRejex.test(userPass.value)) {
    signUpButton.disabled = "true";
    userPass.classList.add("is-invalid");
    userPass.classList.remove("is-valid");
    passAlert.classList.remove("d-none");
  } else {
    signUpButton.removeAttribute("disabled");
    userPass.classList.remove("is-invalid");
    userPass.classList.add("is-valid");
    passAlert.classList.add("d-none");
  }
}
