import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useFavModal from "../../hooks/useFavModal";
import FavoriteListIcon from "../BrowsePage/FavoriteListIcon";

export default function FavModal({ favorites = [], removeFromFavorites }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const favoriteIds = favorites.map((dog) => dog.id);

  const { matchedDog, isLoading, error, findMatch } = useFavModal(favoriteIds);

  const handleMatchSubmit = () => {
    findMatch();
  };

  const favCount = matchedDog ? 1 : favorites?.length || 0;

  return (
    <>
      <Button type="button" variant="outline-dark" onClick={handleShow}>
        Favorites
        <span className="badge text-bg-light ms-2">{favCount}</span>
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

          {isLoading && <p>Finding a match...</p>}

          {error && <p>{error}</p>}

          {matchedDog && (
            <div className="d-flex flex-column">
              <h3 className="text-center">It's a match!</h3>
              <FavoriteListIcon
                key={matchedDog.id}
                dog={matchedDog}
                removeFromFavorites={removeFromFavorites}
              />
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
