
let productsOrder = localStorage.getItem("productsOrder")
let orders = JSON.parse(productsOrder)   // to convert from string to object
let allOrders = document.querySelector(".products")
let totalPrices = document.querySelector(".totalPrice")

function displayOrders() {
    let y = orders.map( (item) => {
        let priceNumber = parseInt(item.price);
        let totalPrice = priceNumber * item.quantity
        if(item.quantity < 1){
            return;
        }
        return `
            <div class="product-order col-12 col-xl-5">
                <img src="${item.imageUrl}" alt="">
                <div class="product-order-details">
                    <div class="product-order-desc">
                        <h4>${item.title}</h4>
                        <p>${item.category}</p>
                        <p>price: ${totalPrice}$</p>
                    </div>
                    <div class="product-order-action">
                        <div>
                            <button class="add-del-btn" onClick="removeItem(${item.id})">-</button>
                            <span class="numOfOrderItem">${item.quantity}</span>
                            <button class="add-del-btn" onClick="addItem(${item.id})">+</button>
                        </div>
                        <div>
                            <button class="remove_from_cart" onClick="removeFromCart(${item.id})">
                                Remove From Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    allOrders.innerHTML = y.join(""); 
}

function displayPrice() {
    let totalPrice = orders.reduce((sum, item) => {
        let priceNumber = parseInt(item.price);
        let totalPricePerOrder = priceNumber * item.quantity;
        return sum + totalPricePerOrder;
    }, 0);
    totalPrices.innerHTML = "Total Price: " + totalPrice + "$"; 
}


let cartProductDiv = document.querySelector(".cart_product div")
let badge = document.querySelector(".badge")

function updateBadge() {
    let totalQuantity = orders.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);
    badge.innerHTML = totalQuantity;
}

function createOrder(prod){
    cartProductDiv.innerHTML = ""
    prod.map( item => {
        let priceNumber = parseInt(item.price);
        let totalPrice = priceNumber * item.quantity
        if(item.quantity < 1){
            return;
        }
        cartProductDiv.innerHTML += `
        <div class="oneProductOrder">
            <span class="title">${item.title}</span>
            <span class="price"> price: ${totalPrice}$</span><br>
            <button class="add-del-btn" onClick="removeItem(${item.id})">-</button>
            <span class="numOfOrderItem">${item.quantity}</span>
            <button class="add-del-btn" onClick="addItem(${item.id})">+</button>
        </div>
        
        `
    })
}

if(orders){
    displayOrders()
    displayPrice()
    createOrder(orders)
    updateBadge()
}


function addItem(id){
    let choosenItem = orders.find( (item) => item.id === id)
    choosenItem.quantity += 1
    createOrder(orders)
    updateBadge()
    localStorage.setItem("productsOrder", JSON.stringify(orders))
    displayOrders()
    displayPrice()
}

function removeItem(id){
    let choosenItem = orders.find( (item) => item.id === id)
    choosenItem.quantity -= 1
    if(choosenItem.quantity < 1){
        orders = orders.filter( item => item.id != id)
    }

    createOrder(orders)
    updateBadge()
    localStorage.setItem("productsOrder", JSON.stringify(orders))
    displayOrders()
    displayPrice()
}



function removeFromCart(id){
    orders = orders.filter(item => item.id !== id);
    localStorage.setItem("productsOrder", JSON.stringify(orders));
    createOrder(orders)
    updateBadge()
    allOrders.innerHTML = null
    displayOrders()
    displayPrice()
}


let cartProduct = document.querySelector(".cart_product")
let cartIcon = document.querySelector(".cart-icon")
// cartIcon.addEventListener("click" , listStatus)

// نقوم بإضافة مستمع للنقر مرة واحدة فقط
cartIcon.addEventListener("click", function() {
    // عند النقر، نسأل: هل الشاشة الآن صغيرة؟
    if (window.matchMedia('(max-width: 656px)').matches) {
        
    } else {
        listStatus();
    }
});

function listStatus() {
    if (cartProduct.style.display == "none" || cartProduct.style.display == "") {
        cartProduct.style.display = "block"
    }else {
        cartProduct.style.display = "none"
    }
}




// ///////////


let orderLoveDiv = document.querySelector(".orders")
let productsLove = JSON.parse(localStorage.getItem("productsLove"))

function createLoveItem(){
    let y = productsLove.map( (item) => {
        let isInLove = productsLove.find(p => p.id === item.id);
        return `
            <div class="love-item col-12 col-sm-6 col-md-4 col-lg-3">
                <img src="${item.imageUrl}" alt="">
                <div class="love-item-details">
                    <h4>${item.title}</h4>
                    <p>Category: ${item.category}</p>

                    <div class="love-item-action">
                        <button class="loveIcon" style="color: ${isInLove ? 'red' : ''}"
                            onClick="removeFromLove(${item.id}, this)"><i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `
    })
    orderLoveDiv.innerHTML = y.join("");
}

if(productsLove){
    createLoveItem()
}


function removeFromLove(id) {
    productsLove = productsLove.filter( item => item.id != id);
    localStorage.setItem("productsLove", JSON.stringify(productsLove))
    createLoveItem()
}