import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  return (
    <div className="inputWrapper d-flex align-items-center">
      <input
        type="text"
        placeholder="Type to search..."
        className="inputField"
        value={input}
        onChange={handleInputChange}
      />
    </div>
  );
}
