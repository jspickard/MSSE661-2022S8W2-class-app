const getHeader = () => {
    document.getElementById('getHeader').innerHTML += '<li><a href="/home.html">Home</a></li>';
    document.getElementById('getHeader').innerHTML += '<li><a href="/index.html">Index</a></li>';
    document.getElementById('getHeader').innerHTML += '<li><a href="/about.html">About</a></li>';
    if (!authService.isAuth()) {document.getElementById('getHeader').innerHTML += '<li><a href="./login.html">Login</a></li>';}
    else {
        document.getElementById('getHeader').innerHTML += '<li><a href="/quotes/quotes.html">My Quotes</a></li>';
        document.getElementById('getHeader').innerHTML += '<p>Hi '+getStorage('currentUser')+'!</p>';
        //if (!!document.getElementById('username')) {document.getElementById('username').value = getStorage('currentUser');}
        document.getElementById('getHeader').innerHTML += '<button id="logout" onclick="doLogout(event)">Logout</button>';
        document.getElementById('getHeader').innerHTML += '<li><a href="/settings.html">Settings</a></li>';
    }
}

const getFooter = () => {
    document.getElementById('getFooter').innerHTML += '<li><a href="/home.html">Home</a></li>';
    document.getElementById('getFooter').innerHTML += '<li><a href="/index.html">Index</a></li>';
    document.getElementById('getFooter').innerHTML += '<li><a href="/about.html">About</a></li>';
    document.getElementById('getFooter').innerHTML += '<p>Author: <a href="https://github.com/jspickard">James Spickard</a></p>';
}

(() => {
    getHeader();
    getFooter();
  })();