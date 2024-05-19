const searchBox = document.querySelector('.searchBox')
const searchBtn = document.querySelector('.searchBtn')
const recipe_container = document.querySelector('.recipe-container')
const recipeDetailsContainer = document.querySelector('.recipe-details-content')
const recipeCloseBtn = document.querySelector('.recipe-close-btn')


const fetchRecipes=async(query)=>{
    recipe_container.innerHTML="<h2>Fetching Recipes...</h2>"
    try{
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const response = await data.json()

        recipe_container.innerHTML=""
        response.meals.forEach(meal => {
            const reciepeDiv = document.createElement('div')
            reciepeDiv.classList.add('recipe');
            reciepeDiv.innerHTML=`
            <img src = "${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p> <span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> Category</p>
            
            `
            const button = document.createElement('button')
            button.textContent="View Recipe"
            reciepeDiv.append(button)
            recipe_container.append(reciepeDiv);

            button.addEventListener('click',()=>
            openRecipePopup(meal));
            
        });

        console.log(response)
    }catch(error){
        recipe_container.innerHTML = `<h2>Error in Fetching Recipes...</h2>`
    }
    
}

const fetchIngrediants = (meal)=>{
    console.log(meal);
    let ingrediantsList = ""
    for(let i=1; i<=20;i++){
        const ingrediant = meal[`strIngredient${i}`]
        if(ingrediant){
            const measure = meal[`strMeasure${i}`];
            ingrediantsList+=`<li>${measure} ${ingrediant}</li>`
        }
        else{
            break;
        }
        ;
    }
    return ingrediantsList;
}

const openRecipePopup= (meal)=>{
    recipeDetailsContainer.innerHTML=`
    <h2 class="recipeName">${meal.strMeal} </h2>
    <h3>Ingredents</h3>
    <ul class="ingredientList">${fetchIngrediants(meal)}</ul>
    <div class = "recipeInstructions">
    <h3> Instructions </h3>
    <p >${meal.strInstructions}</p>
    </div>

    `
    
    
    recipeDetailsContainer.parentElement.style.display="block";
}

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipe_container.innerHTML = `<h2>Type The Meal In the Search Box</h2>`
        return
    }
    fetchRecipes(searchInput);
})

recipeCloseBtn.addEventListener('click',()=>{
    recipeDetailsContainer.parentElement.style.display="none"
})