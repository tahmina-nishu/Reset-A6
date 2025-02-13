const loadCategories = () => {
    //Fetch the data
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
}

const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categories');
    
    categories.forEach((item) => {
    console.log(item);
        const categoryContainer = document.createElement('div');
        categoryContainer.innerHTML = `
        <button id="category-btn-${item.category}" onclick="loadCategoryPets('${item.category}')" class="category-button w-[160px] hover:bg-[#0E7A811A] border-2 border-[#0E7A811A] hover:rounded-full py-2 flex justify-center items-center">
            <div class="flex gap-3"><img class="w-8" src="${item.category_icon}">${item.category}</div>
        </button>
       `;
        categoriesContainer.appendChild(categoryContainer);
    });
}
const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayPets(data.pets))
    .catch((error) => console.log(error));
}
const displayPets = (pets) => {
    console.log(pets);
    const petsContainer = document.getElementById('pet-container');
    petsContainer.innerHTML = "";
    // category te kono item na thakle error msg show korbe. tkhn grid ta remove kore dibe
    if(pets.length == 0){
        petsContainer.classList.remove('grid');
        petsContainer.innerHTML = `
        <div class="text-center px-20 py-36 min-h-[400px] w-full flex flex-col gap-5 justify-center items-center bg-[#13131308] rounded-2xl">
            <img src="images/error.webp" />
            <h2 class="text-3xl font-bold"> No Information Available </h2>
            <p class="text-[#131313B3]"> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
        `;
        return;
    }
    else
        petsContainer.classList.add('grid');
    
    //item gulo add korbe
    pets.forEach((pet) => {
    console.log(pet);
        const petContainer = document.createElement('div');
        petContainer.classList = "card rounded-xl border-2 border-[#1313131A]";
        petContainer.innerHTML = `
        
            <figure class="p-4">
            <img src="${pet.image}"class="rounded-lg" />
            </figure>
            <div class="card-body">
                <h2 class="text-xl font-bold">${pet.pet_name}</h2>
                <p class="text-[#131313B3]">Breed  : ${pet.breed}</p>
                <p class="text-[#131313B3]">Birth  : ${pet.date_of_birth}</p>
                <p class="text-[#131313B3]">Gender : ${pet.gender}</p>
                <p class="text-[#131313B3]">Price  : ${pet.price} $</p>
                <div class="card-actions">
                    <button onclick="loadLikedPets(${pet.petId})" class="px-4 py-1 rounded-lg border-2 border-[#0E7A8126] text-[#0E7A81] font-bold"><img class="w-10" src="https://static.vecteezy.com/system/resources/previews/021/013/524/original/like-icon-on-transparent-background-free-png.png"></button>
                    <button class="px-4 py-1 rounded-lg border-2 border-[#0E7A8126] text-[#0E7A81] font-bold">Adopt</button>
                    <button onclick="loadDetails(${pet.petId})" class="px-4 py-1 rounded-lg border-2 border-[#0E7A8126] text-[#0E7A81] font-bold"> Details </button>
                </div>
            </div>
        `;
        petsContainer.appendChild(petContainer);
    });
}
const loadCategoryPets = (categoryName) => {
    console.log(categoryName);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
    .then((res) => res.json())
    .then((datas) => {
        removeActiveClass();
        const activeButton = document.getElementById(`category-btn-${categoryName}`)
        activeButton.classList.add('activeClass') ;
        
        displayPets(datas.data)
    })
    .catch((error) => console.log(error));
}

// remove active class
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-button");
    console.log(buttons);
    for(let btn of buttons){
       btn.classList.remove('activeClass');
    }
}

const loadDetails = async (petId) =>{
    console.log(petId);
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    showDetails(data.
        petData);
}
const showDetails = (pets) => {
    console.log(pets);
    const detailsContainer = document.getElementById('modal-content');
    detailsContainer.innerHTML = `
    
        <img class="w-[350px] mx-auto rounded-md" src="${pets.image}">
        <div class="my-6">
            <h2 class="text-xl font-bold">${pets.pet_name}</h2>
            <div class="text-[#131313B3] flex gap-9 border-b pb-4">
                <div>
                    <p>Breed  : ${pets.breed}</p>
                    <p>Gender : ${pets.gender}</p>
                    <p>Vaccinated status : ${pets.vaccinated_status}</p>
                </div>
                <div>
                    <p>Birth  : ${pets.date_of_birth}</p>
                    <p>Price  : ${pets.price} $</p>
                </div>
            </div>
        </div>
        <div>
            <h3 class="text-lg font-bold"> Details Information </h3>
            <p class="text-[#131313B3]"> ${pets.pet_details}</p>
        </div>
    `;
    document.getElementById('showModalData').click();
}
const loadLikedPets = async (petId) =>{
    console.log(petId);
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    addLikedPets(data.
        petData);
}
const addLikedPets = (pet) => {
    const imageContainer = document.getElementById('selected-pets');
    
    const likedPet = document.createElement('div');
        likedPet.innerHTML = `
        <img src="${pet.image}">
        `;
    imageContainer.appendChild(likedPet);
}

loadCategories();
loadPets();