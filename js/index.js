let meals = document.getElementById("meals");
let search = document.getElementById("search");
let details = document.getElementById("details");
let contact = document.getElementById("contact");
let navs = document.querySelectorAll(".nav-link");
let loading = document.querySelector(".loading");
let submitBtn;

async function fetchData(endpoint) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/${endpoint}`
  );
  return await response.json();
}

function home() {
  clear();
  searchByName("");
}

window.onload = () => {
  home();
};

navs.forEach((nav) => {
  nav.addEventListener("click", function () {
    document.querySelector(".active").classList.remove("active");
    nav.classList.add("active");
  });
});

function clear() {
  meals.innerHTML = "";
  details.innerHTML = "";
  search.innerHTML = "";
  contact.classList.add("d-none");
}

function LoadAndClear() {
  loading.classList.remove("d-none");
  clear();
}

function clearForSearch() {
  meals.innerHTML = "";
  details.innerHTML = "";
  contact.classList.add("d-none");
}

function displayMeals(arr) {
  let temp = "";

  for (let i = 0; i < arr.length; i++) {
    temp += `
      <div class="col">
        <div
          onclick="getMealDetails('${arr[i].idMeal}')"
          class="img-card overflow-hidden"
          role="button"
        >
          <img
            src="${arr[i].strMealThumb}"
            class="card-img-top rounded-2"
          />
          <div
            class="layer bg-white bg-opacity-75 top-0 h-100 w-100 d-flex flex-column justify-content-center rounded-2"
          >
            <h2 class="text-black ms-2">${arr[i].strMeal}</h2>
          </div>
        </div>
      </div>
    `;
  }
  meals.innerHTML = temp;
}

function displaySearch() {
  search.innerHTML = `
    <div class="row g-4 mb-5">
      <div class="col-md-6">
        <input
          onkeyup="searchByName(this.value)"
          class="form-control bg-transparent text-white"
          type="text"
          placeholder="Search By Name"
        />
      </div>
      <div class="col-md-6">
        <input
          onkeyup="searchByFirstLetter(this.value)"
          maxlength="1"
          class="form-control bg-transparent text-white"
          type="text"
          placeholder="Search By First Letter"
        />
      </div>
    </div>
  `;
  clearForSearch();
}

async function searchByName(input) {
  loading.classList.remove("d-none");
  clearForSearch();

  let data = await fetchData(`search.php?s=${input}`);

  if (data.meals) {
    displayMeals(data.meals);
  } else {
    displayMeals([]);
  }
  loading.classList.add("d-none");
}

async function searchByFirstLetter(input) {
  loading.classList.remove("d-none");
  clearForSearch();

  if (input == "") {
    input = "a";
  } else {
    ("");
  }
  let data = await fetchData(`search.php?f=${input}`);

  if (data.meals) {
    displayMeals(data.meals);
  } else {
    displayMeals([]);
  }
  loading.classList.add("d-none");
}

async function getCategories() {
  LoadAndClear();

  let data = await fetchData(`categories.php`);
  displayCategories(data.categories);

  loading.classList.add("d-none");
}

function displayCategories(arr) {
  let temp = "";

  for (let i = 0; i < arr.length; i++) {
    temp += `
      <div class="col">
        <div
          onclick="getCategoryMeals('${arr[i].strCategory}')"
          class="img-card overflow-hidden"
          role="button"
        >
          <img
            src="${arr[i].strCategoryThumb}"
            class="card-img-top rounded-2"
          />
          <div
            class="layer bg-white bg-opacity-75 top-0 h-100 w-100 d-flex flex-column justify-content-center rounded-2 text-center p-2"
          >
            <h2 class="text-black ms-2">${arr[i].strCategory}</h2>
            <p>
              ${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}
            </p>
          </div>
        </div>
      </div>
    `;
  }
  meals.innerHTML = temp;
}

async function getCategoryMeals(category) {
  LoadAndClear();

  let data = await fetchData(`filter.php?c=${category}`);
  displayMeals(data.meals.slice(0, 20));

  loading.classList.add("d-none");
}

async function getAreas() {
  LoadAndClear();

  let data = await fetchData(`list.php?a=list`);
  displayAreas(data.meals);

  loading.classList.add("d-none");
}

function displayAreas(arr) {
  let temp = "";

  for (let i = 0; i < arr.length; i++) {
    temp += `
      <div class="col">
        <div
          onclick="getAreaMeals('${arr[i].strArea}')"
          class="rounded-2 text-center text-white"
          role="button"
        >
          <i class="fa-solid fa-house-laptop fa-4x"></i>
          <h3>${arr[i].strArea}</h3>
        </div>
      </div>
    `;
  }
  meals.innerHTML = temp;
}

async function getAreaMeals(area) {
  LoadAndClear();

  let data = await fetchData(`filter.php?a=${area}`);
  displayMeals(data.meals.slice(0, 20));

  loading.classList.add("d-none");
}

async function getIngredients() {
  LoadAndClear();

  let data = await fetchData(`list.php?i=list`);
  displayIngredients(data.meals.slice(0, 20));

  loading.classList.add("d-none");
}

function displayIngredients(arr) {
  let temp = "";

  for (let i = 0; i < arr.length; i++) {
    temp += `
      <div class="col">
        <div
          onclick="getIngredientMeals('${arr[i].strIngredient}')"
          class="rounded-2 text-center text-white"
          role="button"
        >
          <i class="fa-solid fa-drumstick-bite fa-4x"></i>
          <h3>${arr[i].strIngredient}</h3>
          <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
        </div>
      </div>
    `;
  }
  meals.innerHTML = temp;
}

async function getIngredientMeals(ingredients) {
  LoadAndClear();

  let data = await fetchData(`filter.php?i=${ingredients}`);
  displayMeals(data.meals.slice(0, 20));

  loading.classList.add("d-none");
}

async function getMealDetails(mealID) {
  LoadAndClear();

  let data = await fetchData(`lookup.php?i=${mealID}`);
  displayMealDetails(data.meals[0]);

  loading.classList.add("d-none");
}

function displayMealDetails(meal) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `
        <div class="alert alert-info m-2 p-1" role="alert">
          ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
        </div>
      `;
    }
  }
  let tagsArr = meal.strTags?.split(",");
  let tags = ``;

  if (tagsArr) {
    tags += `
      <h3 class="mt-3"><span class="fw-bolder">Tags: </span></h3>
      <div class="d-flex flex-wrap">
    `;
    for (let i = 0; i < tagsArr.length; i++) {
      tags += `
        <div class="alert alert-light m-2 p-1" role="alert">
          ${tagsArr[i]}
        </div>
      `;
    }
    tags += `</div>`;
  }
  let temp = `
    <div class="col-md-4">
      <img
        src="${meal.strMealThumb}"
        class="w-100 rounded-2"
      />
      <h2 class="m-2 fw-bolder">${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
      <h2><span class="fw-bolder">Instructions</span></h2>
      <p>${meal.strInstructions}</p>
      <h3 class="mb-4"><span class="fw-bolder">Area: </span>${meal.strArea}</h3>
      <h3 class="mb-4"><span class="fw-bolder">Category: </span>${meal.strCategory}</h3>
      <h3><span class="fw-bolder">Recipes: </span></h3>
      <div class="d-flex flex-wrap">${ingredients}</div>
      ${tags}
      <a class="btn btn-success m-1 mt-5" href="${meal.strSource}" target="_blank">Source</a>
      <a class="btn btn-danger m-1 mt-5" href="${meal.strYoutube}" target="_blank">YouTube</a>
    </div>  
  `;
  details.innerHTML = temp;
}

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
      <button type="button" class="btn btn-outline-danger m-4" id="submitBtn" disabled>
        Submit
      </button>
    </div>
  `;
  submitBtn = document.getElementById("submitBtn");

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
