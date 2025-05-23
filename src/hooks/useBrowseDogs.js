import { useState, useEffect } from "react";
import { fetchDogs, fetchDogsWithUrl } from "../utils/dogFetchUtils";

export default function useBrowseDogs(selectedBreeds, sortOrder, pageSize) {
  const [dogIds, setDogIds] = useState([]);
  const [total, setTotal] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [hasMoreNext, setHasMoreNext] = useState(null);
  const [hasMorePrev, setHasMorePrev] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDogIds = async (params = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const dogResults = await fetchDogs({
        ...params,
        breeds: [selectedBreeds],
        sort: sortOrder,
        size: pageSize,
      });

      setDogIds(dogResults.resultIds);
      setTotal(dogResults.total);
      setNextUrl(dogResults.next || null);
      setPrevUrl(dogResults.prev || null);
      setHasMoreNext(!!dogResults.next);
      setHasMorePrev(!!dogResults.prev);
    } catch (error) {
      console.log("Error fetching dogs:", error);
      setError("Error fetching dogs");
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
        setHasMoreNext(!!dogResults.next);
        setHasMorePrev(!!dogResults.prev);
      } catch (error) {
        console.log("Error fetching next dogs:", error);
        setError("Error fetching next dogs");
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
        setHasMoreNext(!!dogResults.next);
        setHasMorePrev(!!dogResults.prev);
      } catch (error) {
        console.log("Error fetching previous dogs:", error);
        setError("Error fetching previous dogs");
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
    error,
    hasMoreNext,
    hasMorePrev,
    loadMoreNext,
    loadMorePrev,
  };
}
