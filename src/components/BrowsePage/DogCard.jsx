import React, { useState } from "react";
import {
  Card,
  ListGroup,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { Location } from "../../models/Location";
import { LocationResults } from "../../models/LocationResults";
import { SearchLocations } from "../../models/api/SearchLocations";
import "./DogCard.css";

export default function DogCard({
  dog,
  dogIds,
  dogIdsLocation,
  addToFavorites,
}) {
  const [searchedLocations, setSearchedLocations] = useState([]);
  const [location, setLocation] = useState(null);

  const handleSearchLocations = async () => {
    if (dog.zipCodes && dog.zipCodes.length > 0) {
      try {
        const zipCode = dog.zipCodes;
        const getDogLocations = new SearchLocations();
        const dogLocation = await getDogLocations.getLocations(zipCode);
        const location = new Location({
          city: dogLocation.city || "no name",
          county: dogLocation.county || "no name",
          longitude: dogLocation.longitude || "no number",
          latitude: dogLocation.latitude || "no number",
          state: dogLocation.state || "no name",
          zip_code: dogLocation.zip_code || "no number",
        });
        setLocation(location);
        const locationResults = new LocationResults({
          results: [location],
          total: location.total,
        });

        setSearchedLocations(locationResults.results);
      } catch (error) {
        console.error("Failed to fetch locations", error);
        setSearchedLocations([]);
      }
    }
  };

  const handleAddToFavorites = (dog) => {
    if (dog) {
      addToFavorites(dog);
    } else {
      console.error("Dog object is missing required data.");
    }
  };

  const dynamicPopover = (
    <Popover id="popover-location">
      <Popover.Body>
        {location ? (
          <div>
            City: {location.city} <br />
            State: {location.state} <br />
            County: {location.county} <br />
            Zip Code: {location.zip_code} <br />
            Longitude: {location.longitude} <br />
            Latitude: {location.latitude}
          </div>
        ) : (
          <div>No location data available.</div>
        )}
      </Popover.Body>
    </Popover>
  );

  return (
    <Card className="dogCard">
      <Card.Img
        className="dogCardImg"
        variant="top"
        src={dog.img || "Dog Image"}
        alt={dog.name || "Dog Image Pending"}
      />
      <Card.Body>
        <Card.Title className="text-center">
          Meet <span className="fw-bold">{dog.name || "No Name"}</span>!
        </Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Breed: {dog.breed || "Unknown Breed"}</ListGroup.Item>
        <ListGroup.Item>Age: {dog.age || "Unknown Age"}</ListGroup.Item>

        <ListGroup.Item>
          Zip Code:
          <OverlayTrigger
            trigger="click"
            placement="right"
            overlay={dynamicPopover}
          >
            <Button
              variant="link link-underline link-underline-opacity-0"
              type="button"
              onClick={handleSearchLocations}
            >
              {dog.zipCodes || "Unknown Zip Code"}
            </Button>
          </OverlayTrigger>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body className="text-center">
        <Button
          variant="outline-dark"
          type="button"
          onClick={() => handleAddToFavorites(dog, dogIds, dogIdsLocation)}
        >
          Add to Favorites
        </Button>
      </Card.Body>
    </Card>
  );
}
