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
}

export default new RaceService();
