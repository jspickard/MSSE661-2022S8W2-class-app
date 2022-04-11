const doLogin = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    const res = await login({ username, password });

    console.log(res);
    //const { auth, access_token, refresh_token } = res;
    const auth = !!res.user;
    const access_token = res.token;
    const refresh_token = res.token; //eventually populate differently

    if (res.msg === null || res.msg === undefined) {
        setStorage('isAuth', auth);
        setStorage('access_token', access_token);
        setStorage('refresh_token', refresh_token);

        window.location.href = "quotes.html";
    } 
    else{
        alert(res.msg); 
    }
};


const doRegister = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    
    const res = register({
        username: username,
        password: password,
        email: email
    });
    
    console.log(res);
    //const { auth, access_token, refresh_token } = res;
    const auth = !!res.user;
    const access_token = res.token;
    const refresh_token = res.token; //eventually populate differently

    if (res.msg === null || res.msg === undefined) {
        logout(res);
        alert("You have been registered! You can now login."); 
        window.location.href = '/';
    } 
    else{
        alert(res.msg); 
    }
};

const doLogout = (e) => {
    e.preventDefault();
    const token = getStorage('access_token');
    const res = {
        user: {
            tokens: [{
                token: token,
            }]
        },
        token: token,
    };
    console.log(res);
    logout(res);
    window.location.href = '/';
};
  
(() => {
    console.log(storageHasData());
    if (storageHasData()) {
      const isAuth = getStorage('isAuth');
      if (isAuth) {
        document.getElementById('logout').style.display = 'block';
      }
    }
    else {
        document.getElementById('logout').style.display = 'none';
    }
})();

function functionNotAvailableYet() {
    alert('Function not available yet.');
}