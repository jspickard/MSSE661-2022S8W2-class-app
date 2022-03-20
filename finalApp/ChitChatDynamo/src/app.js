/*
    Final Application - Chit Chat Dynamo
    James Spickard
    Regis University
    MSSE661 - Web Software Development
    Spring 2022 8 Week 2 Semester
    Professor Morgan Worrell
    PLANNED RELEASE: May 1, 2022
*/

class User{
    username;
    password;

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

var currentPhrase = "";

function loginAttempt(username, password) {
    let enteredCredentials = new User(username, password);
    let authenticationMessage = autenticateOnlyUser(enteredCredentials); //not a realistic implementation
    alert(authenticationMessage);
}

function autenticateOnlyUser(enteredCredentials) { 
    let output = "No users yet, just a few bland phrases...isn't that a shame?";
    return (output);
}

function generatePhrase() {
    currentPhrase = "Here's a phrase, do you like it?";
    document.getElementById("generatePhrase").innerHTML = currentPhrase;
    document.getElementById('generatePhrase').innerHTML += '<button type="button" onclick="savePhrase();">Save Phrase</button>'
}

function getHeader() {
    document.getElementById('getHeader').innerHTML += '<li><a href="./home.html">Home</a></li>';
    document.getElementById('getHeader').innerHTML += '<li><a href="./about.html">About</a></li>';
    document.getElementById('getHeader').innerHTML += '<li><a href="./login.html">Login</a></li>';
}

function getFooter() {
    document.getElementById('getFooter').innerHTML += '<li><a href="./home.html">Home</a></li>';
    document.getElementById('getFooter').innerHTML += '<li><a href="./about.html">About</a></li>';
    document.getElementById('getFooter').innerHTML += '<li><a href="./login.html">Login</a></li>';
    document.getElementById('getFooter').innerHTML += '<p>Author: <a href="https://github.com/jspickard">James Spickard</a></p>';
}

function savePhrase() {
    alert("Oops! Can't save phrase yet. Wouldn't you like this feature?");
}