//auth service configs messages to send
const AUTH_API = BASE_API_URL + '/auth';
const USER_API = BASE_API_URL + '/user';

function register(formData) {
    return _post(AUTH_API + '/register', formData);
}

const login = (formData) => _post(AUTH_API + '/login', formData);

const logout = (formData) => {
    const res = _post(AUTH_API + '/logout', formData);
    console.log(res); 
    clearStorage('isAuth');
    clearStorage('access_token');
    clearStorage('refresh_token');
    return res;
  };
  