//stores data (encoded) to map for retrieval as needed
const setStorage = (key, data) => {
    console.log(data);
    const dataAsString = JSON.stringify(data); // data = new Object()
    const encodedData = btoa(dataAsString); // {}
    localStorage.setItem(key, encodedData);
    console.log(encodedData);
  };
  
  const getStorage = (key) => {
    const encodedData = localStorage.getItem(key);
    if (!!encodedData) {
      const decodedData = atob(encodedData);
      console.log(decodedData);
      return JSON.parse(decodedData);
    }
  };
  
  const clearStorage = (key) => {
    localStorage.removeItem(key);
  };
  
  const storageHasData = () => localStorage.length > 0;
  