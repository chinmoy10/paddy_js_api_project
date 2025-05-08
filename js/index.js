document.getElementById("loading").style.display="visible";

let showData = [];

// btn category
const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/peddy/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.categories);
};


const displayCategories = (categories) =>{
    // console.log(categories);
    const categoriesContainer = document.getElementById("categories-container");
    categories.forEach((item) => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML=`
        <button id="btn-${item.category}" onclick="loadPerCategory('${item.category}')" class="removeBtn category-btn">
            <img class="w-10 object-cover" src=${item.category_icon}>
            <h1 class="font-bold text-3xl">${item.category}</h1>
        </button>
    `
    categoriesContainer.appendChild(buttonContainer);
    });
}

// category wise data

const loadPerCategory = (categories) =>{
    // console.log(categories);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categories}`)
    .then((res) => res.json())
    .then((data) => {

        removeActiveBtnClass();

        const activeBtn = document.getElementById(`btn-${categories}`);
        activeBtn.classList.add("activeBtn");
        displayAllAnimals(data.data)
        showData= data.data;
    })
    .catch((error) => console.log(error));
    
}


const displaySorted = () =>{
    const sortedData = showData.sort((a,b)=> b.price - a.price);
    displayAllAnimals(sortedData);
}

const removeActiveBtnClass = () =>{
    const buttons = document.getElementsByClassName("category-btn");
    for(let btn of buttons){
        btn.classList.remove("activeBtn");
    }
}



// all categories data
const loadAllAnimals = async() =>{
    // console.log("hello2");
    

    const url = `https://openapi.programming-hero.com/api/peddy/pets`
    const res = await fetch(url);
    const data = await res.json();
    displayAllAnimals(data.pets);
    document.getElementById("loading").style.display="none";
    // sortedData(data.pets);
    console.log(displayAllAnimals(data.pets));
}



const displayAllAnimals = (animals) => {
    // console.log(animals);
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    if(animals.length === 0){
        cardContainer.classList.remove("grid");
        cardContainer.innerHTML = `
            <div class="min-h-[300px] flex flex-col gap-3 justify-center items-center bg-slate-100 rounded-2xl">
                <img src="./images/error.webp" alt="">
                <h1 class="text-center text-3xl font-bold">No Information Available</h1>
            </div>
        `;
        return;
    }else{
        cardContainer.classList.add("grid");
    }
    animals.forEach((animal) => {
        const singleCard = document.createElement("div");
        singleCard.classList = "card-1 border-2 p-4 rounded-2xl space-y-3";
        singleCard.innerHTML = `
            <div class="h-[220px]">
                <img class="w-full h-full object-cover rounded-xl" src=${animal.image} alt="">
            </div>
            <div class="space-y-3 px-3">
                <div class="border-b-2 pb-2 space-y-2">
                    <h2 class="card-title">${animal.pet_name}</h2>
                    
                    <p class="text-base text-gray-600"><i class="fa-brands fa-slack mr-3"></i>Breed: ${animal.breed ? `${animal.breed}` : "Not Available"}</p>
                    <p class="text-base text-gray-600"><i class="fa-regular fa-calendar mr-3"></i>Birth: ${animal.date_of_birth ? `${animal.date_of_birth}` : "Not Available"}</p>
                    <p class="text-base text-gray-600"><i class="fa-solid fa-mercury mr-3"></i>Gender: ${animal.gender ? `${animal.gender}` : "Not Available"}</p>
                    <p class="text-base text-gray-600"><i class="fa-solid fa-dollar-sign mr-3"></i>Price : ${animal.price ? `${animal.price}$` : "Not Available"}</p>
                </div>
                <div class="flex flex-col lg:flex-row flex-wrap justify-between gap-5 lg:gap-2">
                    <div onclick = "likeBtn('${animal.image}')" class="btn bg-transparent border-[#0E7A8170] border-2 text-lg font-bold hover:bg-transparent"><i class="fa-regular fa-thumbs-up text-gray-600"></i></div>
                    <div onclick = "loadAdoptsAnimals()" class="btn px-7 bg-transparent border-[#0E7A8170] border-2 text-lg font-bold hover:bg-transparent text-[#0E7A81]">Adopt</div>
                    <div onclick = "loadAnimalDetails(${animal.petId})" class="btn px-9 bg-transparent border-[#0E7A8170] border-2 text-lg font-bold hover:bg-transparent text-[#0E7A81]">Details</div>
                </div>
            </div>
            `
            
        const cards = cardContainer.appendChild(singleCard);
    });

    document.getElementById('sorted-btn').addEventListener('click',function() {
        animals.sort((a,b)=> b.price - a.price);
    });
}


// like btn

const likeBtn = (petImgs) => {
    // console.log(petImgs);
    const petImages = document.getElementById("petImages");
    const singleImg = document.createElement("div");
    singleImg.classList = "h-[130px] border-2 p-2 rounded-lg"
    singleImg.innerHTML = `
        <img class="w-full h-full object-cover" src=${petImgs} alt="">
    `
    petImages.appendChild(singleImg)
}

// adopt btn
const loadAdoptsAnimals = () =>{
    document.getElementById("adoptModal").showModal();
}

// details btn

const loadAnimalDetails = (id) => {
    // console.log("hello pet details:", id)
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    .then((res) => res.json())
    .then((data) => displayAnimalDetails(data.petData))
    .catch((error) => console.log(error));
}

const displayAnimalDetails = (data) =>{
    // console.log(data)
    const detailsModalContent = document.getElementById("details-modal-content");
    detailsModalContent.innerHTML = `
        <img class="w-full h-[230px] object-cover rounded-lg" src=${data.image} alt="">
        <h1 class="text-2xl font-bold">${data.pet_name}</h1>
        <div class="space-y-1">
            <div class="grid grid-cols-2 gap-10 text-justify">
                <p class="text-base text-gray-600"><i class="fa-brands fa-slack mr-2"></i>Breed: ${data.breed ? `${data.breed}` : "Not Available"}</p>
                <p class="text-base text-gray-600"><i class="fa-regular fa-calendar mr-2"></i>Birth: ${data.date_of_birth ? `${data.date_of_birth}` : "Not Available"}</p>
            </div>
            <div class="grid grid-cols-2 gap-10 text-justify">
                <p class="text-base text-gray-600"><i class="fa-solid fa-mercury mr-2"></i>Gender: ${data.gender ? `${data.gender}` : "Not Available"}</p>
                <p class="text-base text-gray-600"><i class="fa-solid fa-dollar-sign mr-2"></i>Price : ${data.price ? `${data.price}$` : "Not Available"}</p>
            </div>
            <div class="">
                <p class="text-base text-gray-600"><i class="fa-solid fa-syringe mr-2"></i>Vaccinated status: ${data.vaccinated_status ? `${data.vaccinated_status}` : "Not Available"}</p>
            </div>
        </div>
        <div class="divider"></div>
        <div class="space-y-1">
            <h3 class="text-base font-semibold">Details Information</h3>
            <p class="font-normal text-gray-600">${data.pet_details}</p>
        </div>
    `

    document.getElementById("detailsModal").showModal();
}

// loading function
const handleLoading = () =>{
    // console.log("hello");
    document.getElementById("loading").style.display="block";
    setTimeout(function(){
        loadAllAnimals()
    },6000)

}



handleLoading()
loadCategories();
loadAllAnimals();