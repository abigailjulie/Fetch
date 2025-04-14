import { useState } from "react";
import { FindMatch } from "../models/api/FindMatch";
import { DogData } from "../models/api/DogData";
import { Dog } from "../models/Dog";

export default function useFavModal(favoriteIds) {
  const [matchedDog, setMatchedDog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const findMatch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const getMatchedDog = new FindMatch();
      const matchedDogId = await getMatchedDog.getMatch(favoriteIds);
      if (matchedDogId && matchedDogId.match) {
        handleMatchResult(matchedDogId.match);
      } else {
        console.log("No match Found:", error);
        setError("No match Found");
      }
    } catch (error) {
      console.log("Cannot fetch match:", error);
      setError("Cannot fetch match");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMatchResult = async (matchId) => {
    try {
      const getMatchDogData = new DogData();
      const matchData = await getMatchDogData.getDogData([matchId]);
      const dogData = new Dog({
        id: matchData[0].id,
        img: matchData[0].img,
        name: matchData[0].name,
        age: matchData[0].age,
        zipCodes: matchData[0].zip_code,
        breed: matchData[0].breed,
      });
      setMatchedDog(dogData);
    } catch (error) {
      console.log("Cannot fetch matched dog data:", error);
      setError("Cannot fetch matched dog data");
    }
  };

  return {
    matchedDog,
    isLoading,
    error,
    findMatch,
  };
}
