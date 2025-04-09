import React from "react";
import { Button } from "react-bootstrap";

export default function FavoriteListIcon({ dog, removeFromFavorites }) {
  return (
    <section className="w-100 rounded-2 bg-secondary-subtle text-secondary-emphasis">
      <div
        className="d-flex justify-content-between align-items-center"
        key={dog.id}
      >
        <img
          className="rounded-2"
          src={dog.img}
          alt={dog.name}
          style={{ width: "10rem", height: "10rem", objectFit: "cover" }}
        />
        <div className="dogInfo d-flex flex-column justify-content-center text-center">
          <div className="fs-1 fw-bold">{dog.name}</div>
          Bread: {dog.breed} <br />
          Age: {dog.age}
        </div>
        <Button
          variant="dark link-underline link-underline-opacity-0"
          size="sm"
          type="button"
          onClick={() => removeFromFavorites(dog.id)}
        >
          ✕
        </Button>
      </div>
    </section>
  );
}
