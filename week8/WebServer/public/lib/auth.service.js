//auth service configs messages to send
const AUTH_API = BASE_API_URL + '/auth';
const USER_API = BASE_API_URL + '/user';

class AuthService {

    currentUser = "";

    register = (formData) => {
        return _post(AUTH_API + '/register', formData);
    }
    
    login = (formData) =>  {
      const res=_post(AUTH_API + '/login', formData);
      setStorage('currentUser',formData.username);
      return res;
    }
    
    logout = (formData) => {
        const res = _post(AUTH_API + '/logout', formData);
        console.log(res); 
        /*clearStorage('isAuth');
        clearStorage('access_token');
        clearStorage('refresh_token');*/
        localStorage.clear();
        clearStorage('currentUser');
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

    userInfo = (username) =>  {
      const res = _get(AUTH_API + '/' + username, DEFAULT_OPTIONS);
      return res;
    }

    updateUser = (formData) =>  {
      const res=_post(AUTH_API + '/updateuser', formData);
      setStorage('currentUser',formData.newUsername, DEFAULT_OPTIONS_WITH_AUTH);
      return res;
    }

    updatePassword = (formData) =>  {
      const res=_post(AUTH_API + '/updatepassword', formData, DEFAULT_OPTIONS_WITH_AUTH);
      return res;
    }
}

const authService = new AuthService();
