import React from "react";

const Paginate = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center md:justify-start">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button
              onClick={handlePreviousPage}
              className={`flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === 1 ? "cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
          </li>
          {pages.map((page, index) => {
            return (
              <li key={index}>
                <a
                  onClick={() => setCurrentPage(page)}
                  href="#"
                  className={`flex items-center justify-center px-4 h-10 leading-tight hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                    page === currentPage
                      ? "text-blue-600 border border-blue-300 bg-blue-50"
                      : "text-gray-500 bg-white border border-gray-300"
                  }`}
                >
                  {page}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href="#"
              onClick={handleNextPage}
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === pages.length ? "cursor-not-allowed" : ""
              }`}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Paginate;
