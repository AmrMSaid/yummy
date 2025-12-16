"use strict";

const meals = document.getElementById("meals");
const search = document.getElementById("search");
const details = document.getElementById("details");
const contact = document.getElementById("contact");
const loading = document.querySelector(".loading");
const navs = document.querySelectorAll(".nav-link");

async function fetchData(endpoint) {
  const response = await fetch(
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

function loadAndClear() {
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

  const data = await fetchData(`search.php?s=${input}`);

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
  const data = await fetchData(`search.php?f=${input}`);

  if (data.meals) {
    displayMeals(data.meals);
  } else {
    displayMeals([]);
  }
  loading.classList.add("d-none");
}

async function getSelectionMeals(selection) {
  loadAndClear();

  const data = await fetchData(`filter.php?${selection}`);
  displayMeals(data.meals.slice(0, 20));

  loading.classList.add("d-none");
}

async function getCategories() {
  loadAndClear();

  const data = await fetchData(`categories.php`);
  displayCategories(data.categories);

  loading.classList.add("d-none");
}

function displayCategories(arr) {
  let temp = "";

  for (let i = 0; i < arr.length; i++) {
    temp += `
      <div class="col">
        <div
          onclick = "getSelectionMeals('c=${arr[i].strCategory}')";
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

async function getAreas() {
  loadAndClear();

  const data = await fetchData(`list.php?a=list`);
  displayAreas(data.meals);

  loading.classList.add("d-none");
}

function displayAreas(arr) {
  let temp = "";

  for (let i = 0; i < arr.length; i++) {
    temp += `
      <div class="col">
        <div
          onclick = "getSelectionMeals('a=${arr[i].strArea}')";
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

async function getIngredients() {
  loadAndClear();

  const data = await fetchData(`list.php?i=list`);
  displayIngredients(data.meals.slice(0, 20));

  loading.classList.add("d-none");
}

function displayIngredients(arr) {
  let temp = "";

  for (let i = 0; i < arr.length; i++) {
    temp += `
      <div class="col">
        <div
          onclick = "getSelectionMeals('i=${arr[i].strIngredient}')";
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

async function getMealDetails(mealID) {
  loadAndClear();

  const data = await fetchData(`lookup.php?i=${mealID}`);
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
  const tagsArr = meal.strTags?.split(",");
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
  const temp = `
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
