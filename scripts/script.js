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
// remove active class---------------
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (const button of buttons) {
    button.classList.remove("active");
  }
};
// remove active class---------------

// load videos from API--------------------------------------------
// click category button in their respective id -----------------
const clickButton = (id) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const activeButton = document.getElementById(`btn-${id}`);
      activeButton.classList.add("active");
      displayVideos(data.data);
    })
    .catch((error) => console.log(error));
};
// display the categories section-----------------------------------------------------
const displayCategory = (items) => {
  const categorySection = document.getElementById("categories-main");

  items.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `<button id="btn-${item.category}" onclick="clickButton('${item.category}')" class="category-btn font-bold text-[24px] flex items-center gap-4 items-center border px-[75px] py-[15px] rounded-lg cursor-pointer hover:shadow-lg"><img class="w-[56px]" src="${item.category_icon}"/>${item.category}</button>`;
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
  console.log(images);
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
  const petName = data.pet_name || "Unknown Pet";
  const breed = data.breed || "Not Specified";
  const birthDate = data.date_of_birth || "Unknown Date";
  const gender = data.gender || "Not Provided";
  const price = data.price || " Not Available";
  const imageSrc = data.image || "assets/default-image.jpg";
  detailsContainer.innerHTML = `<img class="w-[100%] object-cover object-center" src="${imageSrc}"/>
  <p class="text-[24px] font-bold">${petName}<p/>
  <div class="flex flex-wrap gap-2"><span class="flex gap-2 bold items-center"><i class="fa-solid fa-table"></i>Breed: ${breed}</span>
    <span class="flex gap-2 bold items-center"><i class="fa-regular fa-calendar"></i>Birth: ${birthDate}</span>
    <span class="flex gap-2 bold items-center"><i class="fa-solid fa-mercury"></i>Gender: ${gender}</span>
    <span class="flex gap-2 bold items-center"><i class="fa-solid fa-dollar-sign"></i>Price: ${price}</span></div>
    <span class="flex gap-2 bold items-center"><i class="fa-solid fa-syringe"></i>Vaccinated status: ${data.vaccinated_status}</span>
    <p class="text-[18px] font-bold">Details Information<p/>
    <span class="flex gap-2 bold items-center"> ${data.pet_details}</span></div>`;
  document.getElementById("customModal").showModal();
};
// load details & show details by clicking details button------------------------
//
// display the videos section-------------------------------------------------------------
const displayVideos = (videos) => {
  console.log("hii", videos);
  const categorySection = document.getElementById("card-1st");
  categorySection.innerHTML = "";
  if (videos.length === 0) {
    categorySection.innerHTML = `<div class="flex flex-col gap-5 items-center justify-center shadow w-[80%] py-15 px-15 text-center"><img src="assets/error.webp"/><h2 class="text-[40px] font-bold">No Information Available</h2>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.
    </p>
    </div>`;
  }
  videos.forEach((video) => {
    // console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    // add default values if API doesn't has any value-------------
    const petName = video.pet_name || "Unknown Pet";
    const breed = video.breed || "Not Specified";
    const birthDate = video.date_of_birth || "Unknown Date";
    const gender = video.gender || "Not Provided";
    const price = video.price || " Not Available";
    const imageSrc = video.image || "assets/default-image.jpg";
    card.innerHTML = `<div class="card-main px-5 py-4 rounded-xl w-[310px] shadow border-[#5A5A5A] hover:shadow-lg"><figure class="">
    <img class="w-full object-cover object-center rounded-xl"
      src="${imageSrc}"
      alt="pet"/>
  </figure>
    <div class="card-details py-3 flex flex-col gap-2">
    <h2 class="card-title text-[20px]">${petName}</h2>
    <div class="character-list flex flex-col">
    <span class="flex gap-2 bold items-center"><i class="fa-solid fa-table"></i>Breed: ${breed}</span>
    <span class="flex gap-2 bold items-center"><i class="fa-regular fa-calendar"></i>Birth: ${birthDate}</span>
    <span class="flex gap-2 bold items-center"><i class="fa-solid fa-mercury"></i>Gender: ${gender}</span>
    <span class="flex gap-2 bold items-center"><i class="fa-solid fa-dollar-sign"></i>Price: ${price}$</span>
    </div>
    <div class="card-actions justify-between border-t border-[#131313] pt-4">
      <button onclick="loadThumbnails(${video.petId})" class="btn py-1 px-5 rounded-lg"><img class="w-[20px]" src="https://img.icons8.com/?size=48&id=82788&format=png"/></button>
      <button onclick="loadCountdown(${video.petId})" class="btn py-1 px-5 rounded-lg text-[#0E7A81]">Adopt</button>
      <button onclick="loadDetails(${video.petId})" class="btn py-1 px-5 rounded-lg text-[#0E7A81]">Details</button>
    </div>
  </div></div>`;

    categorySection.append(card);
  });
};
// display the videos section-----------------------------------------------------

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
