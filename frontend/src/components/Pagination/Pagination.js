import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevClick = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div>
      <button onClick={handlePrevClick} disabled={isFirstPage}>
        Previous
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button onClick={handleNextClick} disabled={isLastPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
