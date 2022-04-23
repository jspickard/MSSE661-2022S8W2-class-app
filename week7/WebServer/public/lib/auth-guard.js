//account protection, logout if not authorized
(() => {
    if (!authService.isAuth() || authService.isTokenExpired()) {
      alert("Login to use app.");
      authService.logout();
      window.location.href = '/index.html';
    }
  })();
  