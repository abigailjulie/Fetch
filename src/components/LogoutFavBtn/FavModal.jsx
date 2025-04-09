import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FindMatch } from "../../models/api/FindMatch";
import { DogData } from "../../models/api/DogData";
import { Dog } from "../../models/Dog";
import FavoriteListIcon from "../BrowsePage/FavoriteListIcon";

export default function FavModal({ favorites = [], removeFromFavorites }) {
  const [show, setShow] = useState(false);
  const [matchedDog, setMatchedDog] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const favoriteIds = favorites.map((dog) => dog.id);

  const handleMatchSubmit = async (favoriteIds) => {
    try {
      const getMatchedDog = new FindMatch();
      const matchedDogId = await getMatchedDog.getMatch(favoriteIds);
      if (matchedDogId && matchedDogId.match) {
        handleMatchResult(matchedDogId.match);
      } else {
        console.log("No match Found");
      }
    } catch (error) {
      console.log("Cannot fetch match:", error);
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
    }
  };

  return (
    <>
      <Button type="button" variant="outline-dark" onClick={handleShow}>
        Favorites
        <span className="badge text-bg-light ms-2">
          {favorites?.length || 0}
        </span>
      </Button>
      <Modal show={show} scrollable={true} keyboard={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!matchedDog && (
            <div>
              {favorites?.length > 0 ? (
                <div>
                  {favorites.map((dog, index) => (
                    <div className="mb-2" key={dog.id || index}>
                      <FavoriteListIcon
                        dog={dog}
                        removeFromFavorites={removeFromFavorites}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p>No Favorites added yet!</p>
              )}
            </div>
          )}

          {matchedDog && (
            <div className="d-flex flex-column">
              <h3 className="text-center">It's a match!</h3>
              <FavoriteListIcon key={matchedDog.id} dog={matchedDog} />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!matchedDog && (
            <div>
              {favorites?.length >= 2 && (
                <Button
                  variant="primary"
                  onClick={() => handleMatchSubmit(favoriteIds)}
                >
                  Find a match!
                </Button>
              )}
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
