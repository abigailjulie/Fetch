import React from "react";
import { SearchResult } from "./SearchResult";
import "./SearchResultsList.css";

export default function SearchResultsList({ breeds, onBreedsSelected }) {
  const handleBreedClick = (breed) => {
    if (onBreedsSelected) {
      onBreedsSelected(breed);
    }
  };
  return (
    <div className="resultsList">
      {breeds.map((breed, index) => {
        return (
          <div key={index} onClick={() => handleBreedClick(breed)}>
            <SearchResult breeds={breed} />
          </div>
        );
      })}
    </div>
  );
}
