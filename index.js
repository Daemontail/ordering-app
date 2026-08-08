import menuArray from "./data.js";

const orders = []
document.addEventListener('click',function(e){
    if(e.target.dataset.add){
        return addOrderItem(e.target.dataset.add)
    }
})
function getMenuHtml(arr){
    return arr.map(function(menuitem){
        const {name,ingredients,id,price,emoji} = menuitem
        return `
        <div class="item-container">
                <div class="item-container-inner">
                <h2 class="item">${emoji}</h2>
                <div class="item-details">
                <h2>${name}</h2>
                <p class="ingredients">${ingredients.join(',')}</p>
                <p class="price">$${price}</p>
                </div>
                </div>
                <button class="add-item" data-add='${id}'>+</button>
            </div>

        `
    })
}

function addOrderItem(item){
    orders.push({name: menuArray[item].name,
                price: menuArray[item].price})
    renderOrder()
}
function renderOrder(){
    renderOrderedItems()
}
function renderOrderedItems(){
    const ordereditems = document.getElementById('orders')
    ordereditems.innerHTML=orders.map(function(order){
            return `
            <div class="order">
            <div class="order-name">
            <h3>${order.name}</h3>
            <button data-remove='${order.name}'>remove</button>
            </div>
            <h3>$${order.price}</h3>
            </div>
            `
    }).join("")
}
document.getElementById('menu').innerHTML=getMenuHtml(menuArray)