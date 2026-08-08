import menuArray from "./data.js";

const orders = []
document.addEventListener('click', function(e){
    if (e.target.dataset.add) {
        return addOrderItem(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        return removeOrderItem(e.target.dataset.remove)
    }
    else if(e.target.id==='complete-order'){
        return renderModal()
    }
})
document.addEventListener('submit',function(e){
    e.preventDefault()
    const paymentDetails=document.getElementById('payment-details')
    paymentDetails.style.display='none'
    showConfirmationMessage(new FormData(paymentDetails).get('full-name'))
})
function showConfirmationMessage(name){
    document.getElementById('order-container').innerHTML=`
    <div class='confirmation'>
    <h4>
    Thanks,${name}! Your order is on it's way!
    </h4>
    </div>
    `
}
function getMenuHtml(arr) {
    return arr.map(function (menuitem) {
        const { name, ingredients, id, price, emoji } = menuitem
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

function addOrderItem(item) {
    orders.push({
        name: menuArray[item].name,
        price: menuArray[item].price
    })
    renderOrder()
}
function removeOrderItem(index) {
    orders.splice(index,1)
    renderOrder()
}
function renderOrder() {
    if (orders.length) {
        document.getElementById('order-container').style.display = 'block'
        renderOrderedItems()
        renderPriceSection()
    }
    else {
        document.getElementById('order-container').style.display = 'none'
    }
}
function renderOrderedItems() {
    const ordereditems = document.getElementById('orders')
    ordereditems.innerHTML = orders.map(function (order) {
        return `
            <div class="order">
            <div class="order-name">
            <h3>${order.name}</h3>
            <button data-remove='${orders.indexOf(order)}'>remove</button>
            </div>
            <h3>$${order.price}</h3>
            </div>
            `
    }).join("")
}
function renderPriceSection() {
    const purchase = document.getElementById('purchase')
    const totalprice = orders.reduce(function (total, currOrder) {
        return total + currOrder.price
    },0)
    purchase.innerHTML =`
            <div class="price">
            <h3>Total Price:</h3>
            <h3>$${totalprice}</h3>
            </div>
            <button class='complete-order' id="complete-order">
            Complete Order
            </button>
            `
}
function renderModal(){
    document.getElementById('payment-details').style.display='block'
}
document.getElementById('menu').innerHTML = getMenuHtml(menuArray)