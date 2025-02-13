const loadCategories = () => {
    //Fetch the data
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then((res) => res.json())
    .then((data) => console.log(data.categories))
    .catch((error) => console.log(error));
}
const displayCategories = (categories) => {
}
loadCategories();