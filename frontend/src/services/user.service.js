import HttpService from "./http.service";

class AuthService {
  updateUser = async (payload) => {
    const updateUserEndpoint = `user/update?id=${payload.id}`;
    return await HttpService.put(updateUserEndpoint, payload);
  };

  addUser = async (payload) => {
    const addUserEndpoint = `user/create`;
    return await HttpService.post(addUserEndpoint, payload);
  };

  deleteUser = async (payload) => {
    const deleteUserEndPoint = `user/delete?id=${payload.id}`;
    return await HttpService.delete(deleteUserEndPoint, null);
  };

  getAllUsers = async (payload) => {
    const getAllUsersEndppoint = `user/all?page=${payload.page}&per_page=10&search=${payload.search}`;
    return await HttpService.get(getAllUsersEndppoint, null);
  };
}

export default new AuthService();
