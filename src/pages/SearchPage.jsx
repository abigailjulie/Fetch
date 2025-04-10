import React from "react";
import LogoutBtn from "../components/LogoutFavBtn/Logout";
import SearchHero from "../components/SearchHero";
import Footer from "../components/Footer";
import "./SearchPage.css";

export default function SearchPage() {
  return (
    <>
      <div className="pt-3 d-flex flex-column min-vh-100">
        <main className="flex-grow-1 px-3">
          <LogoutBtn />
          <SearchHero />
        </main>
        <div className="pt-3">
          <Footer />
        </div>
      </div>
    </>
  );
}
