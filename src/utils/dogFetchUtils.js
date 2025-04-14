import { SearchDogs } from "../models/api/SearchDogs";
import { DogResults } from "../models/DogResults";

export const fetchDogs = async (params) => {
  const getSearchedDogs = new SearchDogs();
  const searchedDogs = await getSearchedDogs.getDogs(params);

  return new DogResults({
    resultIds: searchedDogs.resultIds,
    total: searchedDogs.total,
    next: searchedDogs.next,
    prev: searchedDogs.prev,
  });
};

export const fetchDogsWithUrl = async (url) => {
  const getSearchedDogs = new SearchDogs();
  const searchedDogs = await getSearchedDogs.getDogsFromUrl(url);

  return new DogResults({
    resultIds: searchedDogs.resultIds,
    total: searchedDogs.total,
    next: searchedDogs.next,
    prev: searchedDogs.prev,
  });
};
