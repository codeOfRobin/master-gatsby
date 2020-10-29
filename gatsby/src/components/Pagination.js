import React from "react";
import { Link } from "gatsby";

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  return (
    <div>
      <p>PAGINATION</p>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        🔙 Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link to={`${base}/${i > 0 ? i + 1 : ""}`}>{i + 1}</Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next 🔜
      </Link>
    </div>
  );
}
