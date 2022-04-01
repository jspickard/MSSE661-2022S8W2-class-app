/*
    Module 2 - Basic Fluid Layout
    James Spickard
    Regis University
    MSSE661 - Web Software Development
    Spring 2022 8 Week 2 Semester
    Professor Morgan Worrell
    March 20, 2022
*/

class User{
    username;
    password;

    constructor(username, password) {
        this.username = username;
        this.password = password;
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
}