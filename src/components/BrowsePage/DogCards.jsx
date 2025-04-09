import React, { useState, useEffect } from "react";
import { DogData } from "../../models/api/DogData";
import { Dog } from "../../models/Dog";
import DogCard from "./DogCard";
import DogCardPagination from "../BrowsePage/DogCardPagination";
import "./DogCards.css";

export default function DogCards({
  dogIds,
  dogIdsLocation,
  addToFavorites,
  total,
  loadMoreNext,
  loadMorePrev,
  hasMoreNext,
  hasMorePrev,
  isLoading,
}) {
  const [dogs, setDogs] = useState([]);
  const [isLoadingDogCards, setIsLoadingDogCards] = useState(false);

  useEffect(() => {
    const populateDogCards = async () => {
      try {
        setIsLoadingDogCards(true);
        const dogsData = new DogData();
        const data = await dogsData.getDogData(dogIds || dogIdsLocation);
        const dogInstances = data.map((dogData) => {
          const dog = new Dog({
            id: dogData.id,
            img: dogData.img,
            name: dogData.name,
            age: dogData.age,
            zipCodes: dogData.zip_code,
            breed: dogData.breed,
          });
          return dog;
        });
        setDogs(dogInstances);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingDogCards(false);
      }
    };

    populateDogCards();
  }, [dogIds, dogIdsLocation]);

  if (isLoading || isLoadingDogCards) {
    return <p className="mt-2 text-center">Fetching dogs...</p>;
  }

  return (
    <>
      {dogs.length > 0 ? (
        <>
          <p className="text-center fs-5">
            Great choice! We've found {total} total!
          </p>

          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {dogs.map((dog, index) => (
              <div className="m-2" key={index || dog.id}>
                <DogCard
                  dog={dog}
                  dogIds={dogIds}
                  dogIdsLocation={dogIdsLocation}
                  addToFavorites={addToFavorites}
                />
              </div>
            ))}
          </div>

          {(hasMoreNext || hasMorePrev) && (
            <div>
              <DogCardPagination
                loadMoreNext={loadMoreNext}
                loadMorePrev={loadMorePrev}
                hasMoreNext={hasMoreNext}
                hasMorePrev={hasMorePrev}
                disabled={isLoading}
              />
            </div>
          )}
        </>
      ) : (
        !isLoading && (
          <p className="text-center">
            No dogs found. Try selecting a breed first.
          </p>
        )
      )}
    </>
  );
}
