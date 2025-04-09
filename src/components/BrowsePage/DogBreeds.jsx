import React, { useEffect, useState } from "react";
import { SearchBreeds } from "../../models/api/SearchBreeds";
import SortAlpha from "./SortAlpha";
import SearchBar from "./Search/SearchBar";
import SearchResultsList from "./Search/SearchResultsList";
import "./DogBreeds.css";

export default function DogBreeds({
  onBreedsSelected,
  sortOrder,
  onSortChange,
}) {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);

  const fetchAllBreeds = async (query = "") => {
    try {
      const getAllBreeds = new SearchBreeds(query);
      const filteredBreeds = await getAllBreeds.SearchBreeds();
      setBreeds(filteredBreeds);
    } catch (error) {
      console.log(`Failed to load all dog breeds`, error);
    }
  };

  const handleBreedSelect = async (breed) => {
    const updatedSelectedBreeds = [...selectedBreeds, breed];
    setSelectedBreeds(updatedSelectedBreeds);
    onBreedsSelected(updatedSelectedBreeds);
  };

  const handleSortChange = (newSortOrder) => {
    onSortChange(newSortOrder);
  };

  useEffect(() => {
    fetchAllBreeds();
  }, []);

  return (
    <>
      <div className="searchBarContainer">
        <h2 className="mb-3">By Breeds</h2>
        <SearchBar onSearch={fetchAllBreeds} />
        <SearchResultsList
          breeds={breeds}
          onBreedsSelected={handleBreedSelect}
        />
        <SortAlpha currentSort={sortOrder} onSortChange={handleSortChange} />
      </div>
    </>
  );
}
