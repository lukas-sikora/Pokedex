import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { ThemeContext } from "../../context/ThemeContext";
import Pagination from "../shared/Pagination";
import Defaultpng from "../../assets/default-pokemon.png";

const Ranking = () => {
  const { pokemons } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const [sortCriteria, setSortCriteria] = useState("base_experience");
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 15;
  const sortedPokemons = [...pokemons].sort((a, b) => {
    if (typeof a[sortCriteria] === "string") {
      return a[sortCriteria].localeCompare(b[sortCriteria]);
    }
    return b[sortCriteria] - a[sortCriteria];
  });
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = sortedPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
  const totalPages = Math.ceil(sortedPokemons.length / pokemonsPerPage);
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Ranking</h1>
      <div className="max-w-4xl mx-auto mb-6 flex flex-col items-center">
        <label className="block text-lg font-bold mb-2 text-center">
          Sortuj według:
        </label>
        <select
          value={sortCriteria}
          onChange={(e) => {
            setSortCriteria(e.target.value);
            setCurrentPage(1);
          }}
          className={`w-1/4 p-2 rounded border ${
            theme === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        >
          <option value="base_experience">Doświadczenie</option>
          <option value="weight">Waga</option>
          <option value="height">Wzrost</option>
          <option value="win">Wygrane walki</option>
        </select>
      </div>
      <ul className="max-w-4xl mx-auto">
        {currentPokemons.map((pokemon, index) => (
          <li
            key={pokemon.pokeID || `${pokemon.name}_${index}`}
            className={`flex items-center justify-between p-4 rounded mb-2 ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <div className="flex items-center w-1/4">
              <span className="text-lg font-bold mr-2">
                {(currentPage - 1) * pokemonsPerPage + index + 1}.
              </span>
              <h2 className="text-lg font-bold capitalize">{pokemon.name}</h2>
            </div>

            <div className="flex items-center justify-center w-1/4">
              <img
                src={pokemon.image || `${Defaultpng}`}
                alt={pokemon.name}
                className="w-24 h-24 object-contain"
              />
            </div>
            <div className="ml-5">
              <div className="flex flex-col text-left">
                <p>Doświadczenie: {pokemon.base_experience}</p>
                <p>Waga: {pokemon.weight}</p>
                <p>Wzrost: {pokemon.height}</p>
                <p>Wygrane walki: {pokemon.win || 0}</p>
                <p>Przegrane walki: {pokemon.lose || 0}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Ranking;
