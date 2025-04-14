import { useState, useEffect } from "react";
import { SearchDogs } from "../models/api/SearchDogs";
import { DogResults } from "../models/DogResults";

export default function useBrowseDogs(selectedBreeds, sortOrder, pageSize) {
  const [dogIds, setDogIds] = useState([]);
  const [total, setTotal] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [hasMoreNext, setHasMoreNext] = useState(null);
  const [hasMorePrev, setHasMorePrev] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDogIds = async (params = {}) => {
    try {
      setIsLoading(true);
      const getSearchedDogs = new SearchDogs();
      const searchParams = {
        ...params,
        breeds: [selectedBreeds],
        sort: sortOrder,
        size: pageSize,
      };

      const searchedDogs = await getSearchedDogs.getDogs(searchParams);

      const dogResults = new DogResults({
        resultIds: searchedDogs.resultIds,
        total: searchedDogs.total,
        next: searchedDogs.next,
        prev: searchedDogs.prev,
      });

      setDogIds(dogResults.resultIds);
      setTotal(dogResults.total);
      setNextUrl(dogResults.next || null);
      setPrevUrl(dogResults.prev || null);
      setHasMoreNext(!!dogResults.next);
      setHasMorePrev(!!dogResults.prev);
    } catch (error) {
      console.log("Error fetching dogs:");
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreNext = async () => {
    if (nextUrl) {
      try {
        setIsLoading(true);
        const getSearchedDogs = new SearchDogs();
        const searchedDogs = await getSearchedDogs.getDogsFromUrl(nextUrl);

        const dogResults = new DogResults({
          resultIds: searchedDogs.resultIds,
          total: searchedDogs.total,
          next: searchedDogs.next,
          prev: searchedDogs.prev,
        });

        setDogIds(dogResults.resultIds);
        setTotal(dogResults.total);
        setNextUrl(dogResults.next || null);
        setPrevUrl(dogResults.prev || null);
        setHasMoreNext(!!dogResults.next);
        setHasMorePrev(!!dogResults.prev);
      } catch (error) {
        console.log("Error fetching next dogs:");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const loadMorePrev = async () => {
    if (prevUrl) {
      try {
        setIsLoading(true);
        const getSearchedDogs = new SearchDogs();
        const searchedDogs = await getSearchedDogs.getDogsFromUrl(prevUrl);

        const dogResults = new DogResults({
          resultIds: searchedDogs.resultIds,
          total: searchedDogs.total,
          next: searchedDogs.next,
          prev: searchedDogs.prev,
        });

        setDogIds(dogResults.resultIds);
        setTotal(dogResults.total);
        setNextUrl(dogResults.next || null);
        setPrevUrl(dogResults.prev || null);
        setHasMoreNext(!!dogResults.next);
        setHasMorePrev(!!dogResults.prev);
      } catch (error) {
        console.log("Error fetching previous dogs:");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (selectedBreeds) {
      fetchDogIds({ from: 0 });
    }
  }, [selectedBreeds, sortOrder]);

  return {
    dogIds,
    total,
    isLoading,
    hasMoreNext,
    hasMorePrev,
    loadMoreNext,
    loadMorePrev,
  };
}
