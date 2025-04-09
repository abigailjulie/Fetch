import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";
import { login } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { Button } from "react-bootstrap";
import FavModal from "./FavModal";

export default function LogoutBtn({ favorites, removeFromFavorites }) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { authUser, setAuthUser, setIsLoggedIn } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const { success, message } = await logout(setAuthUser, setIsLoggedIn);

      if (success) {
        navigate("/");
      } else {
        setMessage(message || "An error occurred during logout");
      }
    } catch (error) {
      setMessage("An error occured during logout");
      console.log(error);
    }
  };

  const handleReturnHome = async (e) => {
    e.preventDefault();
    try {
      if (!authUser) {
        const { success, message } = await login(
          authUser.name,
          authUser.email,
          setAuthUser,
          setIsLoggedIn
        );

        if (success) {
          navigate("/search");
        } else {
          setMessage(message || "An error occurred during logout");
        }
      } else {
        navigate("/search");
      }
    } catch (error) {
      setMessage("An error occured during logout");
      console.log(error);
    }
  };

  return (
    <div className="d-flex align-items-center mb-4">
      <a
        className="link-dark link-underline-opacity-0"
        href="#"
        onClick={handleReturnHome}
      >
        <i className="bi bi-house-heart-fill fs-1 d-flex justify-content-start"></i>
      </a>
      <div className="w-100 d-flex justify-content-end gap-3">
        <FavModal
          favorites={favorites}
          removeFromFavorites={removeFromFavorites}
        />
        <Button type="button" variant="outline-dark" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
