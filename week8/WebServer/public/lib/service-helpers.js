//process message requests, makes async and returns as JSON
const access_token = storageHasData() ? authService.isAuth() : '';
const token = 'Bearer ' + access_token;

//declare various options
const DEFAULT_OPTIONS = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const DEFAULT_OPTIONS_WITH_AUTH = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };
  
  const OPTIONS_WITH_AUTH = {
    headers: {
      Authorization: token,
    },
  };


//"functions"
const _get = async (url, options = DEFAULT_OPTIONS_WITH_AUTH) => {
    const res = await fetch(url, {
        method: 'GET',
        ...options,
    });
    return res.json();
}


const _post = async (url, data, options = DEFAULT_OPTIONS_WITH_AUTH) => {
    const res = await fetch(url, {
        method: 'POST',
        ...options,
        body: JSON.stringify(data)
    });
    return res.json();
}


const _put = async (url, data, options = DEFAULT_OPTIONS_WITH_AUTH) => {
    const res = await fetch(url, {
        method: 'PUT',
        ...options,
        body: JSON.stringify(data)
    });
    return res.json();
}


const _delete = async (url, options = DEFAULT_OPTIONS_WITH_AUTH) => {
    const res = await fetch(url, {
      method: 'DELETE',
      ...options,
    });
    return res.json();
  };
  