let links = document.querySelector("#links")
let userInfo = document.querySelector("#user_info")
let userData = document.querySelector("#user")

    if(localStorage.getItem("email")) {
        links.remove()
        userInfo.style.display = "flex"
        userData.innerHTML = "Hello, " + localStorage.getItem("firstName")
    }

let logOut = document.querySelector("#logout")

if(localStorage.getItem("email")){
    logOut.style.display = "block"
    logOut.addEventListener("click" , function(){
        localStorage.clear()
        setTimeout(() => {
            window.location = "login.html"
        } , 500)
    })
}




