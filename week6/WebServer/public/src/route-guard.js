//account protection, logout if not authorized
(() => {
    if (storageHasData() && !getStorage('isAuth')) {
      logout();
      window.location.href = '/login.html';
    }
  })();
  