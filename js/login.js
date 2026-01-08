let email = document.querySelector("#email")
let password = document.querySelector("#password")
let loginBtn = document.querySelector("#sign_in")


loginBtn.addEventListener("click" , function (e){
    e.preventDefault()
    if(email.value == "" || password.value == ""){
        alert("Please Fill All Fields")
    }else {
        if(email.value == localStorage.getItem("email") && password.value == localStorage.getItem("password")){
            setTimeout ( () => {
                window.location = "index.html"
            })
        }else if (email.value != localStorage.getItem("email") && password.value != localStorage.getItem("password")){
            alert("Wrong email And Password")
        }else if (email.value != localStorage.getItem("email") && password.value == localStorage.getItem("password")){
            alert("Wrong email")
            
        }else {
            alert("Wrong Password")
        }
    }
})


