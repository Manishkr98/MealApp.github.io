
let favItems = document.getElementById("favItems");
let Fav_items= document.querySelector(".Fav_items")

// Local Storage Define 

let userData = JSON.parse(localStorage.getItem("Datas")) || [];

document.body.style.backgroundImage="none";
// Cart Count Define
const calculate = () => {
    let cart_icon = document.getElementById("cart_Amount");
    let cart_Amount = userData.length;
    cart_icon.innerHTML = cart_Amount;
}


const favsectioncall=()=>{
    if(userData.length !=0){
        return(favItems.innerHTML = userData.map((meal, id)=>{

            return`
            <div class="Fav_items" id="shop_items${id}">
            <img src='${meal.strMealThumb}' alt="" width="200px" />
            <h5>${meal.strMeal}</h5>
            <button type="button" onclick="RemoveToCart('${id}')">Remove</button>
       
            </div>
            `
        }))
    }

}
favsectioncall();
calculate();


let RemoveToCart=("click",(id)=>{

        userData = JSON.parse(localStorage.getItem("Datas")) ||[];
        userData.splice(id, 1);
        localStorage.setItem("Datas", JSON.stringify(userData));
        calculate();
        favsectioncall();
   
     if(userData==''){
        favItems.innerHTML=""
     }

})
