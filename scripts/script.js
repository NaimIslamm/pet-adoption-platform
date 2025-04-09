// fetch load and display the category section-------

const loadCatagories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
    .catch((error) => console.log(error));
};

// display the categories section----
const displayCategory = (items) => {
  const categorySection = document.getElementById("categories-main");
  items.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `<div class="flex gap-4 items-center border px-[75px] py-[15px] rounded-lg"><img class="w-[56px]" src="${item.category_icon}"/><button class="category-btn font-bold text-[24px]">${item.category}</button></div>
    `;
    categorySection.append(buttonContainer);
  });
};

loadCatagories();
