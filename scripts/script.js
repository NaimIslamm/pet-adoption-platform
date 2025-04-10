// fetch load and display the category section-------
// load CATEGORIES button from API--------------------------------
const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
    .catch((error) => console.log(error));
};
// load CATEGORIES button from API--------------------------------

// load videos from API--------------------------------------------
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayVideos(data.pets))
    .catch((error) => console.log(error));
};

// load videos from API--------------------------------------------

// display the categories section-----------------------------------------------------
const displayCategory = (items) => {
  const categorySection = document.getElementById("categories-main");
  items.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `<div class="flex gap-4 items-center border px-[75px] py-[15px] rounded-lg cursor-pointer hover:shadow-lg"><img class="w-[56px] " src="${item.category_icon}"/><button class="category-btn font-bold text-[24px]">${item.category}</button></div>`;
    categorySection.append(buttonContainer);
  });
};
// display the categories section-----------------------------------------------------
// display the videos section-----------------------------------------------------
const displayVideos = (videos) => {
  const categorySection = document.getElementById("card-1st");
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `<div class="card-main py-5 border w-[310px]"><figure class="">
    <img class="w-full object-cover object-center"
      src="${video.image}"
      alt="pet" />
  </figure>
  <div class="">
    <h2 class="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-between">
      <button class="btn py-2 px-4 rounded-lg"><img class="w-[20px]" src="https://img.icons8.com/?size=48&id=82788&format=png"/></button>
      <button class="btn btn-primary">Buy Now</button>
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div></div>`;

    categorySection.append(card);
  });
};
// display the videos section-----------------------------------------------------
loadVideos();
loadCatagories();
