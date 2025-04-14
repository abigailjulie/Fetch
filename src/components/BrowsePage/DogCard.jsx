import React from "react";
import {
  Card,
  ListGroup,
  Button,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import useDogCard from "../../hooks/useDogCard";
import "./DogCard.css";

export default function DogCard({
  dog,
  dogIds,
  dogIdsLocation,
  addToFavorites,
}) {
  const { location, error, isLoading, handleSearchLocations } = useDogCard(dog);

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
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : location ? (
          <section>
            <div>
              City: <strong>{location.city}</strong>
            </div>
            <div>
              State: <strong>{location.state}</strong>
            </div>
            <div>
              County: <strong>{location.county}</strong>
            </div>
            <div>
              Zip Code: <strong>{location.zip_code}</strong>
            </div>
            <div>
              Longitude: <strong>{location.longitude}</strong>
            </div>
            <div>
              Latitude: <strong>{location.latitude}</strong>
            </div>
          </section>
        ) : (
          <p>No location data available.</p>
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
