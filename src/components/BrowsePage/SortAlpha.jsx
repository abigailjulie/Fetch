import React from "react";
import { Button } from "react-bootstrap";

export default function SortAlpha({ currentSort, onSortChange }) {
  return (
    <div className="d-flex justify-content-end gap-3 mt-5">
      <Button
        variant={currentSort === "name:asc" ? "dark" : "outline-dark"}
        size="lg"
        type="button"
        onClick={() => onSortChange("name:asc")}
      >
        Ascending
      </Button>
      <Button
        variant={currentSort === "name:desc" ? "dark" : "outline-dark"}
        size="lg"
        type="button"
        onClick={() => onSortChange("name:desc")}
      >
        Descending
      </Button>
    </div>
  );
}
