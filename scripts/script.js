// fetch load and display the category section-------
// load CATEGORIES button from API--------------------------------

// normal arrow function---------

// const loadCatagories = () => {
//   fetch("https://openapi.programming-hero.com/api/peddy/categories")
//     .then((res) => res.json())
//     .then((data) => displayCategory(data.categories))
//     .catch((error) => console.log(error));
// };

// async await function---------------------------------------------

const loadCatagories = async () => {
  document.getElementById("loading-container").style.display = "block";
  const url = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await url.json();
  if (data.categories > 0) {
    document.getElementById("loading-container").style.display = "none";
  }
  displayCategory(data.categories);
};
// load CATEGORIES button from API--------------------------------

// load videos from API--------------------------------------------
// const loadVideos = () => {
//   document.getElementById("loading-container").style.display = "block";
//   fetch("https://openapi.programming-hero.com/api/peddy/pets")
//     .then((res) => res.json())
//     .then((data) => displayVideos(data.pets))
//     .catch((error) => console.log(error));
// };
const loadVideos = async () => {
  document.getElementById("loading-container").style.display = "block";
  const url = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await url.json();
  if (data.pets.length > 0) {
    document.getElementById("loading-container").style.display = "none";
  }
  pets = data.pets;
  displayVideos(pets);
};
// remove active class---------------
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (const button of buttons) {
    button.classList.remove("active");
  }
};
// remove active class---------------

// load videos from API--------------------------------------------
// click category button in their respective id & show the respective video according to their id -----------------
// const clickButton = (id) => {
//   document.getElementById("loading-container").style.display = "block";

//   fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
//     .then((res) => res.json())
//     .then((data) => {
//       removeActiveClass();
//       const activeButton = document.getElementById(`btn-${id}`);
//       activeButton.classList.add("active");
//       displayVideos(data.data);
//     })

//     .catch((error) => {
//       console.log(error);
//       document.getElementById("loading-container").style.display = "none";
//     });
// };
// onclick="clickButton('${item.category}')" it will go to the button innerHTML;
document
  .getElementById("categories-main")
  .addEventListener("click", (event) => {
    if (event.target.closest(".category-btn")) {
      const button = event.target.closest(".category-btn");
      const id = button.getAttribute("data-id");
      // closest means ase pase(nearest) ja ase se gula niyei kaj korbe
      // 👉 Show loading spinner
      document.getElementById("loading-container").style.display = "block";

      // 🧠 Call clickButton (you can refactor it inline or keep it)
      fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
          removeActiveClass();
          document.getElementById(`btn-${id}`).classList.add("active");
          displayVideos(data.data);

          // ⏳ Delay hiding spinner by 2 seconds

          setTimeout(() => {
            // ✅ Hide spinner after data is loaded
            document.getElementById("loading-container").style.display = "none";
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
          document.getElementById("loading-container").style.display = "none";
        });
    }
  });
// document.getElementById("categories-main").addEventListener("click", () => {
//   console.log("hi");
// });
// display the categories section-----------------------------------------------------
const displayCategory = (items) => {
  const categorySection = document.getElementById("categories-main");

  items.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `<button id="btn-${item.category}" data-id="${item.category}"  class="category-btn font-bold text-[24px] flex items-center gap-4 items-center border px-[75px] py-[15px] rounded-lg cursor-pointer hover:shadow-lg"><img class="w-[56px]" src="${item.category_icon}"/>${item.category}</button>`;
    categorySection.append(buttonContainer);
  });
};

// display the categories section-------------------------------------------------------------
const demo = [
  {
    petId: 1,
    breed: "Golden Retriever",
    category: "Dog",
    date_of_birth: "2023-01-15",
    price: 1200,
    image: "https://i.ibb.co.com/p0w744T/pet-1.jpg",
    gender: "Male",
    pet_details:
      "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
    vaccinated_status: "Fully",
    pet_name: "Sunny",
  },
];
// display the thumbnails by clicking like-----------------------------------------------------
const loadThumbnails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => res.json())
    .then((data) => displayTumbnails(data.petData.image))
    .catch((error) => console.log(error));
};
const displayTumbnails = (images) => {
  const categorySection = document.getElementById("card-2nd");
  // console.log(images);
  const thumbnail = document.createElement("div");
  thumbnail.innerHTML = `<img class="w-[110px] object-cover object-center shadow" src="${images}"/>`;
  categorySection.append(thumbnail);
};
// display the thumbnails by clicking like-----------------------------------------------------

// load details & show details by clicking details button------------------------
const loadDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.petData);
};
const displayDetails = (data) => {
  const detailsContainer = document.getElementById("modal-container");

  detailsContainer.innerHTML = `<img class="w-[100%] object-cover object-center" src="${
    data.image
  }"/>
  <p class="text-[24px] font-bold">${data.pet_name}<p/>
  <div class="flex flex-wrap gap-2"><span class="flex gap-2 bold items-center"><i class="fa-solid fa-table"></i>Breed: ${
    data.breed ? data.breed : "Not Specific"
  }</span>
    <span class="flex gap-2 bold items-center"><i class="fa-regular fa-calendar"></i>Birth: ${
      data.date_of_birth ? data.date_of_birth : "Unknown Date"
    }</span>
    <span class="flex gap-2 bold items-center"><i class="fa-solid fa-mercury"></i>Gender: ${
      data.gender ? data.gender : "Not Provided"
    }</span>
    <span class="flex gap-2 bold items-center"><i class="fa-solid fa-dollar-sign"></i>Price: ${
      data.price ? data.price : "Not Available"
    }</span></div>
    <span class="flex gap-2 bold items-center"><i class="fa-solid fa-syringe"></i>Vaccinated status: ${
      data.vaccinated_status ? data.vaccinated_status : "Not Available"
    }</span>
    <p class="text-[18px] font-bold">Details Information<p/>
    <span class="flex gap-2 bold items-center"> ${
      data.pet_details
    }</span></div>`;
  document.getElementById("customModal").showModal();
};
// load details & show details by clicking details button------------------------
// load adopt details------------------------------------------------------------
const adoptDetails = () => {
  document.getElementById("customModal2").showModal();
};
// function adoptDetails() {
//   document.getElementById("customModal2").showModal();
// }
// load adopt details------------------------------------------------------------

// display the videos section-------------------------------------------------------------
const displayVideos = (videos) => {
  // console.log("hii", videos);
  const categorySection = document.getElementById("card-1st");
  categorySection.innerHTML = "";
  // jodi API te data na thake kono ekta category te tahle no info show korbe with image.
  if (videos.length === 0) {
    categorySection.innerHTML = `<div class="flex flex-col gap-5 items-center justify-center shadow w-[80%] py-15 px-15 text-center"><img src="assets/error.webp"/><h2 class="text-[40px] font-bold">No Information Available</h2>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.
    </p>
    </div>`;
  }
  videos.forEach((video) => {
    // console.log(video.price);
    const card = document.createElement("div");
    card.classList = "card card-compact";

    //dhori: If video.pet_name exists(truthy), display it.
    // If video.pet_name is null, undefined, or empty(flasy), display "Unknown Pet".
    // let petName;
    // example:
    // if (video.pet_name) {
    //   petName = video.pet_name;
    // } else {
    //   petName = "Unknown Pet";
    // }
    // ternary te likhci code a----------------------------------------

    card.innerHTML = `<div class="card-main px-5 py-4 rounded-xl w-[300px] shadow border-[#5A5A5A] hover:shadow-lg"><figure class="">
    <img class="w-full object-cover object-center rounded-xl"
      src="${video.image ? video.image : "assets/default-image.jpg"}"
      alt="pet"/>
  </figure>
    <div class="card-details py-3 flex flex-col gap-2">
    <h2 class="card-title text-[20px]">${
      video.pet_name ? video.pet_name : "Unknown Pet"
    }</h2>
    <div class="character-list flex flex-col">
    <span class="flex gap-2 bold items-center"><i class="fa-solid fa-table"></i>Breed: ${
      video.breed ? video.breed : "Not Specified"
    }</span>
    <span class="flex gap-2 bold items-center"><i class="fa-regular fa-calendar"></i>Birth: ${
      video.date_of_birth ? video.date_of_birth : "Unknown Date"
    }</span>
    <span class="flex gap-2 bold items-center"><i class="fa-solid fa-mercury"></i>Gender: ${
      video.gender ? video.gender : "Not Provided"
    }</span>
    <span class="flex gap-2 bold items-center"><i class="fa-solid fa-dollar-sign"></i>Price: ${
      video.price ? video.price : " Not Available"
    }$</span>
    </div>
    <div class="card-actions justify-between border-t border-[#131313] pt-4">
      <button onclick="loadThumbnails(${
        video.petId
      })" class="btn py-1 px-5 rounded-lg"><img class="w-[20px]" src="https://img.icons8.com/?size=48&id=82788&format=png"/></button>
      <button onclick="adoptDetails()" class="btn py-1 px-5 rounded-lg text-[#0E7A81]">Adopt</button>
      <button onclick="loadDetails(${
        video.petId
      })" class="btn py-1 px-5 rounded-lg text-[#0E7A81]">Details</button>
    </div>
  </div></div>`;
    categorySection.append(card);
  });
};
// display the videos section-----------------------------------------------------

// sorted by price-------------------------------------------------
document.getElementById("sortBtn").addEventListener("click", function () {
  const sortedProducts = [...pets].sort((a, b) => a.price - b.price);
  displayVideos(sortedProducts);
});
// sorted by price-------------------------------------------------

loadVideos();
loadCatagories();
// menu section------------------------
function myFunction() {
  var x = document.getElementById("myLinks1");
  var icon = document.getElementById("toggleIcon");
  if (x.style.display === "block") {
    x.style.display = "none";
    icon.className = "fas fa-bars";
    icon.style.fontSize = "30px";
  } else {
    x.style.display = "block";
    icon.className = "fas fa-times";
    icon.style.fontSize = "30px";
    icon.innerHTML = "";
  }
}

// const sortByPrice = () => {};
// const sortVideos = async () => {
//   const url = await fetch(
//     "https://openapi.programming-hero.com/api/peddy/pets"
//   );
//   const data = await url.json();

//   displayVideos(data.pets);
// };
