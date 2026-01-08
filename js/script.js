
let allProducts = document.querySelector(".products")
let products = [
    {
        id: 1,
        title: "lenovo V14",
        price: "1499$",
        category: "laptop",
        imageUrl: "images/laptop1.jpg",
        quantity : 0
    },
    {
        id: 2,
        title: "lenovo",
        price: "1699$",
        category: "laptop",
        imageUrl: "images/laptop2.jpg",
        quantity : 0
    },
    {
        id: 3,
        title: "macBook Pro",
        price: "2199$",
        category: "laptop",
        imageUrl: "images/laptop3.jpg",
        quantity : 0
    },
    {
        id: 4,
        title: "macBook",
        price: "1899$",
        category: "laptop",
        imageUrl: "images/laptop4.jpg",
        quantity : 0
    },
    {
        id: 5,
        title: "hp",
        price: "799$",
        category: "laptop",
        imageUrl: "images/laptop5.jpg",
        quantity : 0
    },
    {
        id: 6,
        title: "hp",
        price: "1199$",
        category: "laptop",
        imageUrl: "images/laptop6.jpg",
        quantity : 0
    },
    {
        id: 7,
        title: "msi",
        price: "1799$",
        category: "laptop",
        imageUrl: "images/laptop7.jpg",
        quantity : 0
    },
    {
        id: 8,
        title: "msi",
        price: "2299$",
        category: "laptop",
        imageUrl: "images/laptop8.jpg",
        quantity : 0
    },
    {
        id: 9,
        title: "iphone 16",
        price: "1199$",
        category: "phone",
        imageUrl: "images/phone1.jpg",
        quantity : 0
    },
    {
        id: 10,
        title: "iphone 14",
        price: "999$",
        category: "phone",
        imageUrl: "images/phone2.jpg",
        quantity : 0
    },
    {
        id: 11,
        title: "iphone 14 pro",
        price: "1099$",
        category: "phone",
        imageUrl: "images/phone3.jpg",
        quantity : 0
    },
    {
        id: 12,
        title: "iphone 15",
        price: "1149$",
        category: "phone",
        imageUrl: "images/phone4.jpg",
        quantity : 0
    },
    {
        id: 13,
        title: "iphone 17 pro max",
        price: "1999$",
        category: "phone",
        imageUrl: "images/phone5.jpg",
        quantity : 0
    },
    {
        id: 14,
        title: "galaxy s24 ultra",
        price: "1499$",
        category: "phone",
        imageUrl: "images/phone6.jpg",
        quantity : 0
    },
    {
        id: 15,
        title: "galaxy a23",
        price: "399$",
        category: "phone",
        imageUrl: "images/phone7.jpg",
        quantity : 0
    },
    {
        id: 16,
        title: "Camera",
        price: "1499$",
        category: "camera",
        imageUrl: "images/product1.jpg",
        quantity : 0
    },
    {
        id: 17,
        title: "watch",
        price: "99$",
        category: "watch",
        imageUrl: "images/product2.jpg",
        quantity : 0
    },
    {
        id: 18,
        title: "apple watch",
        price: "299$",
        category: "watch",
        imageUrl: "images/watch2.jpg",
        quantity : 0
    },
]

let productsOrder = localStorage.getItem("productsOrder") ? JSON.parse(localStorage.getItem("productsOrder")) : [];
let productsLove = localStorage.getItem("productsLove") ? JSON.parse(localStorage.getItem("productsLove")) : [];


function createItem (products){
    let y = products.map( (item) => {
        let isInCart = productsOrder.find(p => p.id === item.id);
        let isInLove = productsLove.find(p => p.id === item.id);
        return `
            <div class="col-12 col-md-6 col-lg-4 mb-5">
                <div class="product-item">
                    <img src="${item.imageUrl}" alt="">
                    <div class="product-item-details">
                        <h4>${item.title}</h4>
                        <p>Price: ${item.price}</p>
                        <p>Category: ${item.category}</p>

                        <div class="product-item-action">
                            <button style="color: ${isInLove ? 'red' : ''}"
                                onClick="addToLove(${item.id}, this)"><i class="fas fa-heart"></i>
                            </button>

                            <button class="add_to_cart" style="background-color: ${isInCart ? 'red' : ''}"
                                onClick="addToCart(${item.id}, this)">
                                ${isInCart ? 'Delete From Cart' : 'Add To Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        `
    })
    allProducts.innerHTML = y.join("");
}

createItem(products)

let cartProductDiv = document.querySelector(".cart_product div")
let badge = document.querySelector(".badge")



function updateBadge() {
    let totalQuantity = productsOrder.reduce((sum, item) => {
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


function addItem(id){
    let choosenItem = productsOrder.find( (item) => item.id === id)
    choosenItem.quantity += 1
    createOrder(productsOrder)
    updateBadge()
    localStorage.setItem("productsOrder", JSON.stringify(productsOrder))
}

function removeItem(id){
    let choosenItem = productsOrder.find( (item) => item.id === id)
    choosenItem.quantity -= 1
    if(choosenItem.quantity < 1){
        productsOrder = productsOrder.filter( item => item.id != id)
    }

    createOrder(productsOrder)
    updateBadge()
    localStorage.setItem("productsOrder", JSON.stringify(productsOrder))
    createItem(products)
}


if(productsOrder){
    createOrder(productsOrder)
    updateBadge()
}


// let addToCartBtn = document.querySelector(".add_to_cart")

function addToCart(id, btn){
    if (localStorage.getItem("email")){
        let choosenItem = products.find( (item) => item.id === id)
        let itemInCart = productsOrder.find(item => item.id === id)

        if(!itemInCart){        
            choosenItem.quantity = 1
            productsOrder = [...productsOrder , choosenItem]
            createOrder(productsOrder)
            updateBadge()
            localStorage.setItem("productsOrder" , JSON.stringify(productsOrder))
            btn.innerHTML = "Delete From Cart"
            btn.style.backgroundColor = "red"
        }else{
            productsOrder = productsOrder.filter(item => item.id !== id)
            choosenItem.quantity -= 1
            createOrder(productsOrder)
            updateBadge()
            localStorage.setItem("productsOrder" , JSON.stringify(productsOrder))
            btn.innerHTML = "Add To Cart"
            btn.style.backgroundColor = ""
        }

    }else{
        window.location = "login.html"
    }
}

function addToLove(id, btn) {
    if (localStorage.getItem("email")){
        let choosenItem = products.find( (item) => item.id === id)
        let itemInLove = productsLove.find(item => item.id === id)

        if(!itemInLove){
            productsLove = [...productsLove , choosenItem]
            localStorage.setItem("productsLove" , JSON.stringify(productsLove))
            btn.style.color = "red"
        }else{
            productsLove = productsLove.filter(item => item.id !== id)
            localStorage.setItem("productsLove" , JSON.stringify(productsLove))
            btn.style.color = ""
        }
        
    }else{
        window.location = "login.html"
    }
}


////////

let cartProduct = document.querySelector(".cart_product")
let cartIcon = document.querySelector(".cart-icon")
cartIcon.addEventListener("click" , listStatus)

if(!localStorage.getItem("email")){
    cartIcon.style.display = "none"
}

function listStatus() {
    if (cartProduct.style.display == "none") {
        cartProduct.style.display = "block"
    }else {
        cartProduct.style.display = "none"
    }
}

function dropDown() {
    cartProduct.style.display = "block"
}

// //////////////////// Search ///////////////////////////////


let select = document.querySelector(".searchKey");
let searchInput = document.querySelector("#search")
let searchKey = select.value; // القيمة الافتراضية عند التحميل

function updateSearchKey() {
    searchKey = select.value;
}
updateSearchKey();
select.addEventListener("change", updateSearchKey);

searchInput.addEventListener("input" , function(){
    if (select.value == "name") {
        let searchedItem = products.filter( (item) => item.title.includes(searchInput.value.toLowerCase()))
        allProducts.innerHTML = ""
        createItem(searchedItem)
    }else{
        let searchedItem = products.filter( (item) => item.category.toLowerCase().includes(searchInput.value.toLowerCase()))
        allProducts.innerHTML = ""
        createItem(searchedItem)
    }
})


// ///////////////////////////////////////////////////////////











