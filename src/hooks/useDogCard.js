import { useState, useEffect } from "react";
import { Location } from "../models/Location";
import { SearchLocations } from "../models/api/SearchLocations";

export default function useDogCard(dog) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchLocations = async () => {
    if (dog.zipCodes && dog.zipCodes.length > 0) {
      setIsLoading(true);
      setError(null);

      try {
        const zipCode = dog.zipCodes;
        const getDogLocations = new SearchLocations();
        const dogLocation = await getDogLocations.getLocations(zipCode);
        const location = new Location({
          city: dogLocation[0].city || "no name",
          county: dogLocation[0].county || "no name",
          longitude: dogLocation[0].longitude || "no number",
          latitude: dogLocation[0].latitude || "no number",
          state: dogLocation[0].state || "no name",
          zip_code: dogLocation[0].zip_code || "no number",
        });

        setLocation(location);
      } catch (error) {
        console.error("Failed to fetch locations", error);
        setError("Failed to fetch locations");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    handleSearchLocations();
  }, [dog.zipCodes]);

  return {
    location,
    error,
    isLoading,
    handleSearchLocations,
  };
}
