import menuArray from "./data.js";
function getMenuItems(arr){
    return arr.map(function(menuitem){
        const {name,ingredients,id,price,emoji} = menuitem
        return `
        <div class="item-container" id="item-container-${id}">
                <div class="item-container-inner">
                <h2 class="item">${emoji}</h2>
                <div class="item-details">
                <h2>${name}</h2>
                <p class="ingredients">${ingredients.join(',')}</p>
                <p class="price">$${price}</p>
                </div>
                </div>
                <button class="add-item">+</button>
            </div>

        `
    })
}
document.getElementById('menu').innerHTML=getMenuItems(menuArray)