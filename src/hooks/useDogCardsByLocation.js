import { useState } from "react";
import { fetchDogs, fetchDogsWithUrl } from "../utils/dogFetchUtils";

export default function useDogCardsByLocation(zipCode, sortOrder, pageSize) {
  const [dogIdsLocation, setDogIdsLocation] = useState([]);
  const [total, setTotal] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [hasMoreNext, setHasMoreNext] = useState(false);
  const [hasMorePrev, setHasMorePrev] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDogIds = async (params = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const dogResults = await fetchDogs({
        ...params,
        zipCodes: [zipCode],
        sort: sortOrder,
        size: pageSize,
      });

      setDogIdsLocation(dogResults.resultIds);
      setTotal(dogResults.total);
      setNext(dogResults.next || null);
      setPrev(dogResults.prev || null);
      setHasMoreNext(!!dogResults.next);
      setHasMorePrev(!!dogResults.prev);
    } catch (error) {
      console.log("Error fetching dogs by Location:", error);
      setError("Error fetching dogs by Location");
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreNext = async () => {
    if (nextUrl) {
      try {
        setIsLoading(true);
        setError(null);
        const dogResults = await fetchDogsWithUrl(nextUrl);

        setDogIds(dogResults.resultIds);
        setTotal(dogResults.total);
        setNextUrl(dogResults.next || null);
        setPrevUrl(dogResults.prev || null);
      } catch (error) {
        console.error("Error fetching next page:", error);
        setError("Error fetching next page");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const loadMorePrev = async () => {
    if (prevUrl) {
      try {
        setIsLoading(true);
        setError(null);
        const dogResults = await fetchDogsWithUrl(prevUrl);

        setDogIds(dogResults.resultIds);
        setTotal(dogResults.total);
        setNextUrl(dogResults.next || null);
        setPrevUrl(dogResults.prev || null);
      } catch (error) {
        console.error("Error fetching previous page:", error);
        setError("Error fetching previous page");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    dogIdsLocation,
    total,
    isLoading,
    error,
    hasMoreNext,
    hasMorePrev,
    loadMoreNext,
    loadMorePrev,
  };
}
