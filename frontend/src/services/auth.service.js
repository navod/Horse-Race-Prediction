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
}

export default new AuthService();
