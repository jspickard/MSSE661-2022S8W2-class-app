//auth related functions only
const doLogin = async (e) => {
    try {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        const res = await authService.login({ username, password });
    
        const autho = !!res.auth;
        const access_token = res.access_token;
        const refresh_token = res.refresh_token; 
        const expires_in = res.expires_in;
        const expirationDate = authService.setExpiration(expires_in);
    
        if (res.msg === null || res.msg === 'Logged in!') {
            setStorage('isAuth', autho);
            setStorage('access_token', access_token);
            setStorage('refresh_token', refresh_token);
            setStorage('expirationDate', expirationDate);
    
            window.location.href = "quotes/quotes.html";
        } 
        else{
            throw res.msg;
        }
    } catch (error) {
        console.log(error)
        alert("Could not login.")
    }
};


const doRegister = (e) => {
    try {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = document.getElementById("email").value;
        
        const res = authService.register({
            username: username,
            password: password,
            email: email
        });
        
        console.log(res);
    
        if (res.msg === null || res.msg === undefined) {
            logout(res);
            alert("You have been registered! You can now login."); 
            window.location.href = '/';
        } 
        else{
            throw res.msg;
        }
    } catch (error) {
        console.log(error)
        alert("Could not register.")
    }
};

const doLogout = (e) => {
    try {
        e.preventDefault();
        const token = authService.isAuth();
        const res = {
            user: {
                tokens: [{
                    token: token,
                }]
            },
            token: token,
        };
        console.log(res);
        authService.logout(res);
        window.location.href = '/';
    }
    catch {
        alert("Issues requesting logout to server.")
    }
};

(() => {
    console.log(storageHasData());
    console.log(localStorage.length);
    if (storageHasData()) {
      //const isAuth = getStorage('isAuth');
      if (authService.isAuth) {
        const logoutButton = document.getElementById('logout');
        if (!!logoutButton) {logoutButton.style.display = 'block';}
        const loginForm = document.getElementById('login-form');
        console.log("loginForm" + loginForm);
        if (!!loginForm) {
            loginForm.style.display = 'none';
            document.getElementById('login-message').innerText = "You are logged in.";
        }
      }
    }
    else {
        document.getElementById('logout').style.display = 'none';
    }
})();