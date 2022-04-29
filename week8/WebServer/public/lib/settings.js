const getValues = async () => {
    if (!!authService.isAuth()) {
        if (!!document.getElementById('username')) {document.getElementById('username').value = getStorage('currentUser');}
        if (!!document.getElementById('email')) {
            const userInfo = await authService.userInfo(getStorage('currentUser'));
            console.log("userInfo: "+userInfo);
            document.getElementById('email').value = userInfo.email;
        }
    }
}

(() => {
    getValues();
  })();