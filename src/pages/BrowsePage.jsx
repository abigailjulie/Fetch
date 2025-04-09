import React, { useState, useEffect } from "react";
import { SearchDogs } from "../models/api/SearchDogs";
import { DogResults } from "../models/DogResults";
import SearchBarLocation from "../components/BrowsePage/SearchByLocation/SearchBarLocation";
import LogoutBtn from "../components/LogoutFavBtn/Logout";
import DogBreeds from "../components/BrowsePage/DogBreeds";
import DogCards from "../components/BrowsePage/DogCards";
import Footer from "../components/Footer";

export default function BrowsePage() {
  const [selectedBreeds, setSelectedBreeds] = useState(null);
  const [dogIds, setDogIds] = useState([]);
  const [total, setTotal] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [hasMoreNext, setHasMoreNext] = useState(null);
  const [hasMorePrev, setHasMorePrev] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState("name:asc");
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize] = useState(10);

  const addToFavorites = (dog) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((favDog) => favDog.id === dog.id)) {
        return [...prevFavorites, dog];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (dogId) => {
    setFavorites(favorites.filter((dog) => dog.id !== dogId));
  };

  const handleBreedsSelected = (breeds) => {
    if (breeds && breeds.length > 0) {
      const lastBreed = breeds[breeds.length - 1];
      setSelectedBreeds(lastBreed);
    } else {
      setSelectedBreeds(null);
    }
  };

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

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  const handleDogIdsReceived = (ids) => {
    setDogIds(ids);
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

  return (
    <>
      <div className="pt-3 h-100">
        <header className="px-3">
          <LogoutBtn
            favorites={favorites}
            removeFromFavorites={removeFromFavorites}
          />
          <section className="text-center">
            <h1>Browse</h1>
            <p className="mx-auto w-75 pt-4">
              Start by typing the name of the breed that interests you or the
              city you'd like to adopt from. A list of available dogs will
              appear for you to browse. If you find one you can add to your
              favorite cart and decide on a luckly pup from there!
            </p>
          </section>
        </header>
        <main className="px-5">
          <DogBreeds
            onBreedsSelected={handleBreedsSelected}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
          />

          {isLoading && (
            <p className="pt-3 fs-2 text-center">Fetching available dogs...</p>
          )}
          <section className="pt-5">
            <DogCards
              dogIds={dogIds}
              addToFavorites={addToFavorites}
              total={total}
              loadMoreNext={loadMoreNext}
              loadMorePrev={loadMorePrev}
              hasMoreNext={hasMoreNext}
              hasMorePrev={hasMorePrev}
              isLoading={isLoading}
            />
          </section>

          <SearchBarLocation />
        </main>
        <Footer />
      </div>
    </>
  );
}
