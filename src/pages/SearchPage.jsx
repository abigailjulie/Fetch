import React from "react";
import LogoutBtn from "../components/LogoutFavBtn/Logout";
import SearchHero from "../components/SearchHero";
import Footer from "../components/Footer";
import "./SearchPage.css";

export default function SearchPage() {
  return (
    <>
      <div className="pt-3 px-3 h-100">
        <LogoutBtn />
        <SearchHero />
      </div>
      <Footer />
    </>
  );
}
