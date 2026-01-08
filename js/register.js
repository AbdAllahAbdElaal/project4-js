let firstName = document.querySelector("#firstName")
let lastName = document.querySelector("#lastName")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let registerBtn = document.querySelector("#sign_up")


registerBtn.addEventListener("click" , function (e) {
    e.preventDefault()
    if(firstName.value.trim() == "" || lastName.value.trim() == "" || email.value.trim() == "" ||password.value == ""){
        alert("Please Fill All Fields")
    }else {
        localStorage.setItem("firstName" , firstName.value.trim())
        localStorage.setItem("lastName" , lastName.value.trim())
        localStorage.setItem("email" , email.value)
        localStorage.setItem("password" , password.value)

        setTimeout ( () => {
            window.location = "login.html"
        })
    }
})