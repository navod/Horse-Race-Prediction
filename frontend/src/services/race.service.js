import HttpService from "./http.service";

class RaceService {
  getRaceCards = async (date) => {
    const raceCardsEndpoint = `/races/all?date=${date}`;
    return await HttpService.get(raceCardsEndpoint);
  };

  getRaceDetails = async (id) => {
    const raceDetailEndpoint = `/races/race?id=${id}`;
    return await HttpService.get(raceDetailEndpoint);
  };

  predict = async (payload) => {
    const predictEndpoint = `/races/prediction`;
    return await HttpService.post(predictEndpoint, payload);
  };
}

export default new RaceService();
