import React from "react";
import { Pagination } from "react-bootstrap";

export default function DogCardPagination({
  hasMoreNext,
  hasMorePrev,
  loadMoreNext,
  loadMorePrev,
  disabled,
}) {
  return (
    <article className="d-flex flex-column align-items-center">
      <div>
        <Pagination>
          <Pagination.Prev
            onClick={loadMorePrev}
            disabled={!hasMorePrev || disabled}
          />

          <Pagination.Next
            onClick={loadMoreNext}
            disabled={!hasMoreNext || disabled}
          />
        </Pagination>
      </div>
    </article>
  );
}
