let pets = [];      // for sort

// -----------------------------loadCategories()-------------------------
const loadCategories = () => {
    //Fetch the data
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
}

// --------------------------displayCategories()-------------------------
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

// -----------------------------loadPets()-------------------------
const loadPets = () => {
    loadingSpinner(true);
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
        setTimeout (() => {
            displayPets(data.pets)
            loadingSpinner(false);
        },2000)

        pets = data.pets;
    })
    .catch((error) => console.log(error));
}

// -----------------------------displayPets()-------------------------
const displayPets = (pets) => {
    console.log(pets);
    const petsContainer = document.getElementById('pet-container');
    petsContainer.innerHTML = "";

    if (pets.length === 0) {
        petsContainer.classList.remove('grid');
        petsContainer.innerHTML = `
        <div class="text-center px-20 py-36 min-h-[400px] w-full flex flex-col gap-5 justify-center items-center bg-[#13131308] rounded-2xl">
            <img src="images/error.webp" />
            <h2 class="text-3xl font-bold"> No Information Available </h2>
            <p class="text-[#131313B3]"> Currently, there is no specific information available...</p>
        </div>
        `;
        return;
    } else {
        petsContainer.classList.add('grid');
    }

    pets.forEach((pet) => {
        console.log(pet);
        const petContainer = document.createElement('div');
        petContainer.classList = "card rounded-xl border-2 border-[#1313131A]";
        
        // Use a function to handle null or undefined values
        const safeValue = (value) => value ?? "Not available";

        petContainer.innerHTML = `
            <figure class="p-4">
                <img src="${safeValue(pet.image)}" class="rounded-lg" />
            </figure>
            <div class="card-body">
                <h2 class="text-xl font-bold">${safeValue(pet.pet_name)}</h2>
                <p class="text-[#131313B3]">Breed  : ${safeValue(pet.breed)}</p>
                <p class="text-[#131313B3]">Birth  : ${safeValue(pet.date_of_birth)}</p>
                <p class="text-[#131313B3]">Gender : ${safeValue(pet.gender)}</p>
                <p class="text-[#131313B3]">Price  : ${safeValue(pet.price)} $</p>
                <div class="card-actions">
                    <button onclick="loadLikedPets(${pet.petId})" class="px-4 py-1 rounded-lg border-2 border-[#0E7A8126] text-[#0E7A81] font-bold">
                        <img class="w-10" src="https://static.vecteezy.com/system/resources/previews/021/013/524/original/like-icon-on-transparent-background-free-png.png">
                    </button>
                    <button onclick="adopt(this)" class="px-4 py-1 rounded-lg border-2 border-[#0E7A8126] text-[#0E7A81] font-bold">Adopt</button>
                    <button onclick="loadDetails(${pet.petId})" class="px-4 py-1 rounded-lg border-2 border-[#0E7A8126] text-[#0E7A81] font-bold"> Details </button>
                </div>
            </div>
        `;
        petsContainer.appendChild(petContainer);
    });
};


// ---------------------------loadCategoryPets()-------------------------
const loadCategoryPets = (categoryName) => {
    console.log(categoryName);
    loadingSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${categoryName}`)
    .then((res) => res.json())
    .then((datas) => {
        removeActiveClass();
        const activeButton = document.getElementById(`category-btn-${categoryName}`)
        activeButton.classList.add('activeClass') ;
        
        setTimeout (() => {
            displayPets(datas.data)
            loadingSpinner(false);
        },2000)
        pets = datas.data;
    })
    .catch((error) => console.log(error));
}

// --------------------------removeActiveClass()-------------------------
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-button");
    console.log(buttons);
    for(let btn of buttons){
       btn.classList.remove('activeClass');
    }
}

// -----------------------------loadDetails()-------------------------
const loadDetails = async (petId) =>{
    console.log(petId);

    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    showDetails(data.
        petData);
}

// -----------------------------showDetails()-------------------------
const showDetails = (pets) => {
    console.log(pets);
    const detailsContainer = document.getElementById('modal-content');

    const safeValue = (value) => value ?? "Not available";

    detailsContainer.innerHTML = `
        <img class="w-[350px] mx-auto rounded-md" src="${safeValue(pets.image)}">
        <div class="my-6">
            <h2 class="text-xl font-bold">${safeValue(pets.pet_name)}</h2>
            <div class="text-[#131313B3] flex gap-9 border-b pb-4">
                <div>
                    <p>Breed  : ${safeValue(pets.breed)}</p>
                    <p>Gender : ${safeValue(pets.gender)}</p>
                    <p>Vaccinated status : ${safeValue(pets.vaccinated_status)}</p>
                </div>
                <div>
                    <p>Birth  : ${safeValue(pets.date_of_birth)}</p>
                    <p>Price  : ${safeValue(pets.price)} $</p>
                </div>
            </div>
        </div>
        <div>
            <h3 class="text-lg font-bold"> Details Information </h3>
            <p class="text-[#131313B3]"> ${safeValue(pets.pet_details)}</p>
        </div>
    `;
    document.getElementById('showModalData').click();
};

// -----------------------------loadLikedPets()-------------------------
const loadLikedPets = async (petId) =>{
    console.log(petId);

    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    addLikedPets(data.
        petData);
}

// -----------------------------addLikedPets()-------------------------
const addLikedPets = (pet) => {
    const imageContainer = document.getElementById('selected-pets');
    
    const likedPet = document.createElement('div');
        likedPet.innerHTML = `
        <img src="${pet.image}">
        `;
    imageContainer.appendChild(likedPet);
}

//--------------------bonus-1 : loading spinner------------------------
const loadingSpinner = (show) => {
    const spinner = document.getElementById('spinner');

    if(show){
        document.getElementById('pet-container').innerHTML = " ";
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }
}

//-------------------bonus-2 : handle sort button---------------------
const sortByPrice = () => {
    loadingSpinner(true);
    console.log(pets)
    const sortedPet = pets.sort((a, b) => b.price - a.price)

    setTimeout (() => {
        displayPets(sortedPet);
        loadingSpinner(false);
        },2000)
}

//----------------bonus-3 : Adopt Button Behavior-----------------------
const adopt = event => {
    let count = 3;
    const countNumber = document.getElementById('countdown');
    countNumber.innerText = count;
    my_modal_5.showModal()
    const interval = setInterval(() => {
        count--;
        if(count != 0){
            countNumber.innerText = count;
        }
        if(count === 0){
            clearInterval(interval)
            my_modal_5.close()

            event.innerText = 'Adopted'
            event.disabled = true; 
        }
    },1000)
}

//----------------bonus-3 : Handle null or undefined value-----------------------

loadCategories();
loadPets();