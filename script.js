
let mainContainer = document.getElementById("main_Container");
let userInputBox = document.getElementById("userInputBox");
let userSearchBox = document.getElementById("userSearchBox");
let ItemaBtn = document.querySelectorAll(".ItemaBtn");
let RecipeDetails = document.getElementById("Recipe_Details")
let RecipeClosedBtn = document.getElementById("Recipe_ClosedBtn")
let RecipeDetailsItems = document.getElementById("Recipe_Details_Items");


const userAPICall = async (value) => {
    mainContainer.innerHTML='';
    try {
        
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    let data = await response.json();
    console.log(data)

    data.meals.forEach((meal, id) => {
        let items = document.createElement("div");
        items.classList="foodItems"
        items.innerHTML = `
        <div class="foodItem" id="foodItems${id}">
        <img src='${meal.strMealThumb}' alt="" class="images"/>
        <h5>${meal.strMeal}</h5>
        <div class="foodInfo">
       <button class="Favourite" onclick="AddToCart('${id}', '${meal.strMealThumb}', '${meal.strMeal}')">Add to Favourite</button>
       </div>
        </div>
        `
       //Create Learn More Button.....
        let LearnBtn = document.createElement("button");
        LearnBtn.classList="LearnMore";
        LearnBtn.innerHTML="Learn More";
        items.appendChild(LearnBtn);
    
        LearnBtn.addEventListener("click", ()=>{
           openRecipe(meal);
        })

        mainContainer.appendChild(items);
    })
} catch (error) {
       alert("Oops! Please Search Valid Items...")  
}
   
}
// fetchIngredents

const fetchIngredents=(meal)=>{
    let IngredentList='';
    for(let i=1; i<=20; i++){
     const Ingredents=meal[`strIngredient${i}`];
     if(Ingredents){
         const measure = meal[`strMeasure${i}`];
         IngredentList +=`<li>${measure} ${Ingredents}</li>`
     }else{
         break;
     }
    }
    return IngredentList;
 }

// openRecipe call

const openRecipe=(meal)=>{
    console.log(meal)
    RecipeDetailsItems.innerHTML=`
    <h5 class="MealTitles">${meal.strMeal}</h5>
    <h3 class="Ingredents">Ingredents:</h3>
    <ul class="UnOrderList">${fetchIngredents(meal)}</ul>
    ` 
    RecipeDetailsItems.parentElement.style.display="block";
}





// Local Storage Define 

let userData = JSON.parse(localStorage.getItem("Datas")) || [];
let strMealThumb = JSON.stringify("${meal.strMealThumb}")
let strMeal = JSON.stringify("meal.strMeal");

// Add to Cart define
let AddToCart = ("click", (id, strMealThumb, strMeal) => {
    userData.push({
        id: id,
        strMealThumb:strMealThumb,
        strMeal:strMeal
    })
    localStorage.setItem("Datas", JSON.stringify(userData));
    calculate();
})



// Cart Count Define
const calculate = () => {
    let cart_icon = document.getElementById("cart_Amount");
    let cart_Amount = userData.length;
    cart_icon.innerHTML = cart_Amount;
}
calculate();



userSearchBox.addEventListener("click", () => {
    let userInputValue = userInputBox.value.trim();
    if(userInputValue == ""){
        alert("First Serach Items...")
    }else{
        userAPICall(userInputValue);
    }
    userInputBox.value = '';
})
// Optional button call here...
ItemaBtn.forEach(function(data){
    data.addEventListener("click", function(){
        userAPICall(data.value);
    })
})


// RecipeClosedBtn 
RecipeClosedBtn.addEventListener("click", ()=>{
    RecipeDetailsItems.parentElement.style.display="";
})