class LocalStorageService {
  saveUser = async (payload) => {
    localStorage.setItem("USER", JSON.stringify(payload));
  };

  saveAccessToken = async (payload) => {
    localStorage.setItem("ACCESS_TOKEN", JSON.stringify(payload));
  };

  saveRefreshToken = async (payload) => {
    localStorage.setItem("REFRESH_TOKEN", JSON.stringify(payload));
  };

  getRefreshToken = async () => {
    return await JSON.parse(localStorage.getItem("REFRESH_TOKEN"));
  };

  getAccessToken = async () => {
    return await JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
  };

  getUser = async () => {
    return await JSON.parse(localStorage.getItem("USER"));
  };

  removeStorageData = async () => {
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER");
  };
}

export default new LocalStorageService();
