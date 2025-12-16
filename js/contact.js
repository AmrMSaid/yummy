"use strict";

let nameInputFocus = false;
let emailInputFocus = false;
let phoneInputFocus = false;
let ageInputFocus = false;
let passwordInputFocus = false;
let repasswordInputFocus = false;

function displayContact() {
  clear();
  contact.classList.remove("d-none");

  contact.innerHTML = `
    <div class="container text-center">
      <div class="row g-4">
        <div class="col-md-6">
          <input
            type="text"
            class="form-control bg-white text-black"
            id="nameInput"
            placeholder="Name"
            onkeyup="validateInputs()"
          />
          <div class="alert alert-danger w-100 mt-2 d-none" id="nameAlert">
            Special characters and numbers not allowed
          </div>
        </div>
        <div class="col-md-6">
          <input
            type="email"
            class="form-control bg-white text-black"
            id="emailInput"
            placeholder="Email"
            onkeyup="validateInputs()"
          />
          <div class="alert alert-danger w-100 mt-2 d-none" id="emailAlert">
            Email not valid *example@yyy.zzz
          </div>
        </div>
        <div class="col-md-6">
          <input
            type="tel"
            class="form-control bg-white text-black"
            id="phoneInput"
            placeholder="Phone"
            onkeyup="validateInputs()"
          />
          <div class="alert alert-danger w-100 mt-2 d-none" id="phoneAlert">
            Enter valid Phone Number
          </div>
        </div>
        <div class="col-md-6">
          <input
            type="number"
            class="form-control bg-white text-black"
            id="ageInput"
            placeholder="Age"
            onkeyup="validateInputs()"
          />
          <div class="alert alert-danger w-100 mt-2 d-none" id="ageAlert">
            Enter valid age
          </div>
        </div>
        <div class="col-md-6">
          <input
            type="password"
            class="form-control bg-white text-black"
            id="passwordInput"
            placeholder="Password"
            onkeyup="validateInputs()"
          />
          <div
            class="alert alert-danger w-100 mt-2 d-none"
            id="passwordAlert"
          >
            Enter valid password *Minimum eight characters, at least one
            letter and one number:*
          </div>
        </div>
        <div class="col-md-6">
          <input
            type="password"
            class="form-control bg-white text-black"
            id="repasswordInput"
            placeholder="Re-password"
            onkeyup="validateInputs()"
          />
          <div
            class="alert alert-danger w-100 mt-2 d-none"
            id="repasswordAlert"
          >
            Enter valid repassword
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-outline-warning m-4" id="submitBtn" disabled>
        Submit
      </button>
    </div>
  `;

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputFocus = true;
  });
  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputFocus = true;
  });
  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputFocus = true;
  });
  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputFocus = true;
  });
  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputFocus = true;
  });
  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputFocus = true;
  });
}

function isNameValid() {
  return /^[a-zA-Z]+(?: [a-z A-Z]+)*$/.test(
    document.getElementById("nameInput").value
  );
}
function isEmailValid() {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    document.getElementById("emailInput").value
  );
}
function isPhoneValid() {
  return /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/.test(
    document.getElementById("phoneInput").value
  );
}
function isAgeVaild() {
  return /^(?:[1-9]|[1-9][0-9]|1[0-9][0-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}
function isPasswordValid() {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}
function isRepasswordValid() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}

function validateInputs() {
  const submitBtn = document.getElementById("submitBtn");

  if (nameInputFocus) {
    if (isNameValid()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputFocus) {
    if (isEmailValid()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (phoneInputFocus) {
    if (isPhoneValid()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (ageInputFocus) {
    if (isAgeVaild()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (passwordInputFocus) {
    if (isPasswordValid()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputFocus) {
    if (isRepasswordValid()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (
    isNameValid() &&
    isEmailValid() &&
    isPhoneValid() &&
    isAgeVaild() &&
    isPasswordValid() &&
    isRepasswordValid()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
