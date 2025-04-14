import React, { useState } from "react";
import useBrowseDogs from "../hooks/useBrowseDogs";
import SearchBarLocation from "../components/BrowsePage/SearchByLocation/SearchBarLocation";
import LogoutBtn from "../components/LogoutFavBtn/Logout";
import DogBreeds from "../components/BrowsePage/DogBreeds";
import DogCards from "../components/BrowsePage/DogCards";
import Footer from "../components/Footer";

export default function BrowsePage() {
  const [selectedBreeds, setSelectedBreeds] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [sortOrder, setSortOrder] = useState("name:asc");
  const [pageSize] = useState(10);

  const {
    dogIds,
    total,
    isLoading,
    hasMoreNext,
    hasMorePrev,
    loadMoreNext,
    loadMorePrev,
  } = useBrowseDogs(selectedBreeds, sortOrder, pageSize);

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

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

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

        <div className="pt-3">
          <Footer />
        </div>
      </div>
    </>
  );
}
