import React from "react";

export default function Footer() {
  return (
    <div className="pt-4 pb-2 w-100 d-flex justify-content-between bg-dark position-relative mt-auto">
      <p className="text-white ps-4">
        Website by
        <a
          href="https://www.linkedin.com/in/abigailfigaro/"
          target="_blank"
          rel="noopener noreferrer"
          className="fw-bold ms-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-light"
        >
          Abigail Figaro
        </a>
      </p>
      <p className="text-white pe-4">
        Fetch App 2025 <i className="bi bi-c-circle me-2"></i>
      </p>
    </div>
  );
}
