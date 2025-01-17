import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import arrowLeft from "../../assets/PNG/arrowleft.png";
import arrowRight from "../../assets/PNG/arrowright.png";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { theme } = useContext(ThemeContext);
  const [inputPage, setInputPage] = useState(currentPage);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setInputPage(value);
    }
  };

  const handleInputSubmit = () => {
    const page = parseInt(inputPage, 10);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
      alert(`Proszę wpisać numer strony z zakresu 1 - ${totalPages}`);
      setInputPage(currentPage);
    }
  };

  return (
    <div className="flex justify-center mt-6 items-center space-x-4">
      {/* Przycisk "Poprzednia" */}
      <button
        className={`px-4 py-2 rounded ${
          theme === "dark"
            ? "bg-gray-700 text-white"
            : "bg-blue-500 text-white"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={arrowLeft} alt="prev" className="w-6 h-6" />
      </button>

      {/* Pole do wpisywania numeru strony */}
      <span
        className={`flex items-center px-4 py-2 border rounded ${
          theme === "dark"
            ? "bg-gray-800 text-white border-gray-600"
            : "bg-gray-100 text-gray-800 border-gray-300"
        }`}
      >
        Strona{" "}
        <input
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          onBlur={handleInputSubmit}
          onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
          className={`mx-2 w-12 text-center px-1 py-1 border rounded ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />{" "}
        z {totalPages}
      </span>

      {/* Przycisk "Następna" */}
      <button
        className={`px-4 py-2 rounded ${
          theme === "dark"
            ? "bg-gray-700 text-white"
            : "bg-blue-500 text-white"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={arrowRight} alt="next" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Pagination;
