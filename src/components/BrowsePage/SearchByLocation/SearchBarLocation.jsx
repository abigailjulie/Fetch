import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FilterLocations } from "../../../models/api/FilterLocations";
import { Location } from "../../../models/Location";
import SortAlpha from "../SortAlpha";
import DogCardsByLocation from "./DogCardsByLocation";
import "../Search/SearchBar.css";

export default function SearchBarLocation() {
  const [locationInput, setLocationInput] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [sortOrder, setSortOrder] = useState("name:asc");

  const handleLocationInputChange = async (e) => {
    const locationValue = e.target.value;
    setLocationInput(locationValue);
  };

  const fetchLocation = async () => {
    if (locationInput.trim()) {
      try {
        const filterLocations = new FilterLocations();
        const locationsData = await filterLocations.getFilteredLocations({
          city: locationInput,
        });

        const results = locationsData.results;

        const locationData = results[0];
        const newLocation = new Location({
          city: locationData.city,
          county: locationData.county,
          longitude: locationData.longitude,
          latitude: locationData.latitude,
          state: locationData.state,
          zip_code: locationData.zip_code,
        });

        setZipCode(newLocation.zip_code);
      } catch (error) {
        console.log("Error fetching location data:", error);
      }
    }
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  return (
    <article className="pt-4 w-100 d-flex flex-column justify-items-center align-items-center">
      <h2 className="w-100 d-flex flex-column text-center">By City</h2>
      <div className="inputWrapper d-flex align-items-center mt-3">
        <input
          type="text"
          placeholder="Type a city name to search..."
          className="inputField"
          value={locationInput}
          onChange={handleLocationInputChange}
        />
        <Button
          className="link-underline link-underline-opacity-0"
          variant="light"
          type="submit"
          size="sm"
          onClick={fetchLocation}
        >
          Submit
        </Button>
      </div>
      <SortAlpha currentSort={sortOrder} onSortChange={handleSortChange} />
      <DogCardsByLocation zipCode={zipCode} sortOrder={sortOrder} />
    </article>
  );
}
