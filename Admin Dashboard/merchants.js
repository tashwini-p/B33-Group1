// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `https://b33-group1-airbnb.onrender.com`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const hotelURL = `${baseServerURL}/listings`;
let mainSection = document.getElementById("data-list-wrapper");

let paginationWrapper = document.getElementById("pagination-wrapper");

// project
let hotelID = document.getElementById("hotel-id");
let hotelName = document.getElementById("hotel-title");
let hotelAddress = document.getElementById("hotel-address");
let hotelImage = document.getElementById("hotel-img");
let hotelYear = document.getElementById(
  "hotel-year"
);
let hotelPrice = document.getElementById("hotel-price");
let hotelRating = document.getElementById("hotel-rating");
let addHotelBtn = document.getElementById("add-hotel-btn");

// Update project
let updateHotelID = document.getElementById("update-hotel-id");
let updatehotelName = document.getElementById("update-hotel-title");
let updatehotelAddress = document.getElementById("update-hotel-address");
let updatehotelImage = document.getElementById(
  "update-hotel-img"
);
let updatehotelYear = document.getElementById(
  "update-hotel-year"
);
let updatehotelPrice = document.getElementById(
  "update-hotel-price"
);
let updatehotelRating = document.getElementById("update-hotel-rating");

let updateHotelBtn = document.getElementById("update-hotel-btn");



//sort and filter

let filterGoogle = document.getElementById("filter-completed");
let filterMicrosoft = document.getElementById("filter-pending");

let sortAtoZ = document.getElementById("sort-low-to-high");
let sortZtoA = document.getElementById("sort-high-to-low");




//Jobs Data
let jobsData = [];
let queryParamString = null;
let pageNumber = 1;

function createCard(item) {
  let card = document.createElement("div");
  card.className = "card";
  card.dataset.id = item.id;
  let cardImg = document.createElement("div");
  cardImg.className = "card-img";

  let img = document.createElement("img");
  img.src = item.image;
  img.alt = "hotel";

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
//   let cardRole = document.createElement("h5");
//   cardRole.classList.add("card-role");
//   cardRole.textContent = `Project Title : ${item.title}`;

//   let cardCompanyName = document.createElement("p");
//   cardCompanyName.className = "card-companyName";
//   cardCompanyName.textContent =`Tag : ${item.tags}` ;

//   let cardExperience = document.createElement("p");
//   cardExperience.className = "card-experienceRequired";
//   cardExperience.textContent = `Project Link : ${item.project_link} `;

//   let cardEmploymentType = document.createElement("p");
//   cardEmploymentType.className = "card-employmentType";
//   cardEmploymentType.textContent = `Status : ${item.status}`;

//   let packageCTC = document.createElement("p");
//   packageCTC.className = "card-packageCTC";
//   packageCTC.textContent = `Client: ${item.client}`;

//   let skills = document.createElement("p");
//   skills.className = "card-keySkills";
//   skills.textContent = `Description : ${item.description}`;

let cardHotelName = document.createElement("h5");
cardHotelName.classList.add("hotel-name");
cardHotelName.innerText = item.name;

let cardHotelYear = document.createElement("p");
cardHotelYear.classList.add("hotel-year");
cardHotelYear.innerText=`Year Built : ${item.year_built}`;

let cardHotelAddress = document.createElement("p");
cardHotelAddress.classList.add("hotel-address");
cardHotelAddress.innerText=`Address : ${item.address}`;

let cardHotelRating = document.createElement("p");
cardHotelRating.classList.add("hotel-rating");
cardHotelRating.innerText=`Ratings : ${item.rating}/5`

let cardHotelPrice = document.createElement("p");
cardHotelPrice.classList.add("hotel-price");
cardHotelPrice.innerText=`Price per night : Rs. ${item.price_per_night}`;


  let edit = document.createElement("a");
  edit.href = "#";
  edit.dataset.id = item.id;
  edit.className = "card-link";
  edit.textContent = "Edit";

  edit.addEventListener("click", (e) => {
    e.preventDefault();
    updateHotelID.value = item.id;
    updatehotelName.value = item.name;
    updatehotelAddress.value = item.address;
    updatehotelImage.value = item.image;
    updatehotelYear.value = item.year_built;
    updatehotelPrice.value = item.price_per_night;
    updatehotelRating.value = item.rating;

   
  });

  let delBtn = document.createElement("button");
  delBtn.className = "card-button";
  delBtn.dataset.id=item.id;
  delBtn.textContent = "Delete";

  delBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("delete");
    deleteJob(item.id);
  });

  card.append(cardImg, cardBody);
  cardImg.append(img);
  cardBody.append(
    cardHotelName,
    cardHotelYear,
    cardHotelAddress,
    cardHotelRating,
    cardHotelPrice,
    edit,
    delBtn
  );
  return card;
}

function appendData(data) {
  let cardList = document.createElement("div");
  cardList.className="card-list";
  data.forEach((item) => {
    cardList.appendChild(createCard(item));
  });
  mainSection.innerText = "";
  mainSection.append(cardList);
}

function pagination(totalPages, limit, params) {
  paginationWrapper.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    let btn = document.createElement("button");
    btn.innerText = i;
    btn.addEventListener("click", () => {
      fetchData(`${hotelURL}?_page=${i}&_limit=${limit}`, params);
    });
    paginationWrapper.append(btn);
  }
}

async function fetchData(url, params = "") {
  try {
    let res = await fetch(`${url}&${params}`);
    let totalData = res.headers.get("X-Total-Count");
    let limit = 3;
    let totalPages = Math.ceil(totalData / limit);
    console.log(totalPages);
    pagination(totalPages, limit, params);
    let data = await res.json();
    appendData(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
fetchData(`${hotelURL}?_page=1&_limit=4`);

async function addHotel() {
  try {
    let hoteldata = {
        id:hotelID.value,
        name: hotelName.value,
        address:hotelAddress.value, 
        image:hotelImage.value, 
        year_built: hotelYear.value, 
        price_per_night: hotelPrice.value,
        rating: hotelRating.value
    };
    let res = await fetch(hotelURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(hoteldata),
    });
    let data = await res.json();
    console.log(data);
    fetchData(`${hotelURL}?_page=1&_limit=5`);
  } catch (error) {
    console.log(error);
  }
}

addHotelBtn.addEventListener("click", addHotel);

async function updateHotel() {
  try {
    let hoteldata= {
    id:updateHotelID.value,
    name: updatehotelName.value,
    address:updatehotelAddress.value, 
    image:updatehotelImage.value, 
    year_built: updatehotelYear.value, 
    price_per_night: updatehotelPrice.value,
    rating: updatehotelRating.value,
  };
    let res = await fetch(`${hotelURL}/${updateHotelID.value}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(hoteldata),
    });
    let data = await res.json();
    console.log(data);
    fetchData(`${hotelURL}?_page=1&_limit=3`);
  } catch (error) {
    console.log(error);
  }
}

updateHotelBtn.addEventListener("click", updateHotel);
async function deleteJob(jobId) {
  try {
    // Make a DELETE request to the API endpoint for deleting a job
    let res = await fetch(`${hotelURL}/${jobId}`, {
      method: "DELETE",
    });

    // Check if the request was successful (HTTP status code 200)
    if (res.ok) {
      console.log(`Job with ID ${jobId} deleted successfully`);
      fetchData(`${hotelURL}?_page=1&_limit=3`);
    } else {
      console.error(`Failed to delete job with ID ${jobId}`);
    }
  } catch (error) {
    console.error("Error while deleting job:", error);
  }
}

sortAtoZ.addEventListener("click", ()=>{
  fetchData(`${hotelURL}?_page=1&_limit=5`, `_sort=price_per_night&_order=asc`)
})

sortZtoA.addEventListener("click", ()=>{
  fetchData(`${hotelURL}?_page=1&_limit=5`, `_sort=price_per_night&_order=desc`)
})

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

searchByButton.addEventListener("click", ()=>{
  if(searchBySelect.value=="title"){
    fetchData(`${hotelURL}?_page=1&_limit=5`, `name_like=${searchByInput.value}`)
  } else if(searchBySelect.value=="artist"){
    fetchData(`${hotelURL}?_page=1&_limit=5`, `address_like=${searchByInput.value}`)
  } else {
    fetchData(`${hotelURL}?_page=1&_limit=5`);
  }
})








