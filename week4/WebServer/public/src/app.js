const doLogin = function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    login({
        username: username,
        password: password
    }).then((r) => r.json())

    .then(function(res) {
        console.log(res)
        if (res.status === 200) {
            window.location.href = "home.html";
        } 
        else{
            console.log(res.msg);
            alert(res.msg); 
        }
    }) /*.catch( function (res) {
            alert(res.body.msg)
    })*/
};


const doRegister = function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    
    register({
        username: username,
        password: password,
        email: email
    }).then(function(res) {
        if (res.status === 500) {
            alert('Could not register user.'); //redundant with auth.controller, how to display msg?
        } 
        else{
            window.location.href = "home.html";
        }
    });
};

const doLogout = function(e) {
    e.preventDefault();
};

/*class User{
    username;
    password;
    email;

    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

const onlyUser = new User('ArtVandelay','ItsNotALieIfYouBelieveIt');

function getOnlyUserCredentials() {
    document.getElementById("onlyUserCredentials").innerHTML = onlyUser.username + " " + onlyUser.password;
}

function loginAttempt(username, password) {
    let enteredCredentials = new User(username, password)
    let authenticationMessage = autenticateOnlyUser(enteredCredentials); //not a realistic implementation
    alert(authenticationMessage);
}

function autenticateOnlyUser(enteredCredentials) { 
    console.log(enteredCredentials.username + " " + enteredCredentials.password); //definitely not a realistic implementation...well maybe for a hacker
    console.log("'You dip the way you want to dip. I'll dip the way I want to dip.'");
    let usernameCheck = (enteredCredentials.username === onlyUser.username);
    let passwordCheck = (enteredCredentials.password === onlyUser.password);
    let output = "";
    if (usernameCheck & passwordCheck) {output = "Login Successful!\r'I am speechless. Speechless! I have no speech!'";}
    else {output = "Login Failed!\r'You're killing independent George!'";}
    return (output);
}*/


