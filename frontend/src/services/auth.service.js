import HttpService from "./http.service";

class AuthService {
  login = async (payload) => {
    const loginEndpoint = "auth/login";
    return await HttpService.post(loginEndpoint, payload);
  };
  regiser = async (payload) => {
    const regiserEndpoint = "auth/register";
    return await HttpService.post(regiserEndpoint, payload);
  };
  logout = async () => {
    const regiserEndpoint = "auth/logout";
    return await HttpService.get(regiserEndpoint, null);
  };

  getUser = async (id) => {
    const getMainUserId = `api/v1/main-user/get-main-user?id=${id}`;
    return await HttpService.get(getMainUserId, id);
  };
}

export default new AuthService();
