console.log("%c HI", "color: firebrick");

document.addEventListener("DOMContentLoaded", function () {
  fetchDogImages(imgUrl); //Challenge 1
  fetchDogBreeds(breedUrl); //Challenge 2 & 3
  initDropdown(); //Challenge 4
});
// Challenge 1 - Fetch random dog images
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

function fetchDogImages(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((json) => renderDogs(json));
}

function renderDogs(dogs) {
  const dogContainer = document.getElementById("dog-image-container");
  for (const dog of dogs.message) {
    const img = document.createElement("img");
    img.src = dog;
    img.style.maxWidth = "25%";
    dogContainer.appendChild(img);
  }
}

let dogsArray = [];

function logDogResponse(dogs) {
  dogsArray = dogs;
  console.log(dogs);
}

// Chalenge 2 - Fetch all dog breeds from url
const breedUrl = "https://dog.ceo/api/breeds/list/all";

function fetchDogBreeds(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((json) => renderDogBreeds(json));
}

function renderDogBreeds(response) {
  const breeds = response.message;
  const ul = document.getElementById("dog-breeds");

  for (const key in breeds) {
    if (breeds[key].length > 0) {
      for (const breed of breeds[key]) {
        const li = document.createElement("li");
        li.innerHTML = `${breed} ${key}`;
        ul.appendChild(li);

        // Challenge 3
        li.addEventListener("click", function () {
          li.style.color = "green";
        });
      }
    } else {
      const li = document.createElement("li");
      li.innerHTML = key;
      ul.appendChild(li);

      li.addEventListener("click", function () {
        li.style.color = "green";
      });
    }
  }
}

// Challenge 4 - filter dog breeds by dropdown selection
function initDropdown() {
  const dropdown = document.getElementById("breed-dropdown");
  dropdown.onchange = function () {
    filterDogs(dropdown.value);
  };
}

function filterDogs(letter) {
  const ul = document.getElementById("dog-breeds");
  for (const breed of ul.children) {
    if (letter === " ") {
      breed.style.display = "list-item";
    } else if (breed.innerText[0] !== letter) {
      breed.style.display = "none";
    } else {
      breed.style.display = "list-item";
    }
  }
}
