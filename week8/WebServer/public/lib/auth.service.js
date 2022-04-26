//auth service configs messages to send
const AUTH_API = BASE_API_URL + '/auth';
const USER_API = BASE_API_URL + '/user';

class AuthService {

    register = (formData) => {
        return _post(AUTH_API + '/register', formData);
    }
    
    login = (formData) => _post(AUTH_API + '/login', formData);
    
    logout = (formData) => {
        const res = _post(AUTH_API + '/logout', formData);
        console.log(res); 
        /*clearStorage('isAuth');
        clearStorage('access_token');
        clearStorage('refresh_token');*/
        localStorage.clear();
        return res;
    };   


    setExpiration = (maxExpiration) => {
      new Date(new Date().getTime() + maxExpiration * 1000);
    }
  
    isAuth = () => {
      return getStorage('access_token');
    };
  
    isTokenExpired() {
      const expiryDate = getStorage('expires_in');
      const isExpired = expiryDate === new Date();
  
      if (isExpired) {
        localStorage.clear();
      }
  
      return isExpired;
    }
}

const authService = new AuthService();
