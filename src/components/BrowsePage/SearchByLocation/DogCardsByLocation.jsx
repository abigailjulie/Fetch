import React, { useState, useEffect } from "react";
import { SearchDogs } from "../../../models/api/SearchDogs";
import { DogResults } from "../../../models/DogResults";
import DogCards from "../DogCards";

export default function DogCardsByLocation({
  zipCode,
  sortOrder,
  addToFavorites,
}) {
  const [dogIdsLocation, setDogIdsLocation] = useState([]);
  const [total, setTotal] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [hasMoreNext, setHasMoreNext] = useState(false);
  const [hasMorePrev, setHasMorePrev] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize] = useState(10);

  const fetchDogIds = async (params = {}) => {
    try {
      setIsLoading(true);
      const getSearchedDogs = new SearchDogs();
      const searchParams = {
        ...params,
        zipCodes: [zipCode],
        sort: sortOrder,
        size: pageSize,
      };

      const foundDogs = await getSearchedDogs.getDogs(searchParams);
      const dogResults = new DogResults({
        resultIds: foundDogs.resultIds,
        total: foundDogs.total,
        next: foundDogs.next,
        prev: foundDogs.prev,
      });

      setDogIdsLocation(dogResults.resultIds);
      setTotal(dogResults.total);
      setNext(dogResults.next || null);
      setPrev(dogResults.prev || null);
      setHasMoreNext(!!dogResults.next);
      setHasMorePrev(!!dogResults.prev);
    } catch (error) {
      console.log("Error fetching dogs by Location:");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (zipCode) {
      fetchDogIds({ from: 0 });
    }
  }, [zipCode, sortOrder]);

  const loadMoreNext = async () => {
    if (nextUrl) {
      try {
        setIsLoading(true);
        const getSearchedDogs = new SearchDogs();
        const searchedDogs = await getSearchedDogs.getDogsFromUrl(nextUrl);

        const dogResults = new DogResults({
          resultIds: searchedDogs.resultIds || [],
          total: searchedDogs.total || 0,
          next: searchedDogs.next || null,
          prev: searchedDogs.prev || null,
        });

        setDogIds(dogResults.resultIds);
        setTotal(dogResults.total);
        setNextUrl(dogResults.next);
        setPrevUrl(dogResults.prev);
      } catch (error) {
        console.error("Error fetching next page:");
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
          resultIds: searchedDogs.resultIds || [],
          total: searchedDogs.total || 0,
          next: searchedDogs.next || null,
          prev: searchedDogs.prev || null,
        });

        setDogIds(dogResults.resultIds);
        setTotal(dogResults.total);
        setNextUrl(dogResults.next);
        setPrevUrl(dogResults.prev);
      } catch (error) {
        console.error("Error fetching previous page:");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="pt-5">
      <DogCards
        dogIdsLocation={dogIdsLocation}
        addToFavorites={addToFavorites}
        total={total}
        loadMoreNext={loadMoreNext}
        loadMorePrev={loadMorePrev}
        hasMoreNext={hasMoreNext}
        hasMorePrev={hasMorePrev}
        isLoading={isLoading}
      />
    </div>
  );
}
