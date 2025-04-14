import React, { useState, useEffect } from "react";
import useDogCardsByLocation from "../../../hooks/useDogCardsByLocation";
import DogCards from "../DogCards";

export default function DogCardsByLocation({
  zipCode,
  sortOrder,
  addToFavorites,
}) {
  const [pageSize] = useState(10);

  const {
    dogIdsLocation,
    total,
    isLoading,
    error,
    hasMoreNext,
    hasMorePrev,
    loadMoreNext,
    loadMorePrev,
  } = useDogCardsByLocation(zipCode, sortOrder, pageSize);

  return (
    <div className="pt-5">
      {error && <p className="pt-3 fs-5 text-danger text-center">{error}</p>}
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
