import HttpService from "./http.service";

class IntegraionService {
  connect = async (payload) => {
    const connectEndpoint = "integration/create-connection";
    return await HttpService.post(connectEndpoint, payload);
  };

  disconnect = async (id) => {
    const disconnectEndPoint = `integration/delete-connection?user_id=${id}`;
    return await HttpService.delete(disconnectEndPoint, id);
  };
}

export default new IntegraionService();
