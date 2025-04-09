import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SearchHero.css";

export default function SearchHero() {
  return (
    <main className="d-flex flex-column justify-content-center align-items-center pt-5">
      <h1>Adopt don't shop!</h1>
      <p className="heroText text-center pt-4">
        Here at Fetch we believe that the value of the dog is not determined by
        it's past.
      </p>
      <p className="heroText text-center pt-2">
        We are dedicated to providing dogs with a second chance to find loving
        and safe homes. If you're looking to expand your family and think you'd
        be a great candidate explore the dogs currently available for adoption
        through any of the paths below. New animals are added as they become
        available.
      </p>
      <div className="mt-5">
        <Nav variant="pill" className="navBtns d-flex">
          <Nav.Item>
            <Nav.Link as={Link} to="/browse">
              Search Available Inventory!
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </main>
  );
}
