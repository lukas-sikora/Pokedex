import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { ThemeContext } from "../../context/ThemeContext";
import PokemonCard from "../shared/PokemonCard";
import Pagination from "../shared/Pagination";

const Home = () => {
  const { pokemons } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPoke, setSearchPoke] = useState("");
  const pokemonsPerPage = 15;

  if (!pokemons || pokemons.length === 0) {
    return <p className="text-center">Ładowanie Pokémonów...</p>;
  }

  // Filtracja Pokémonów na podstawie wyszukiwania
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchPoke.toLowerCase())
  );

  // Paginacja
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-5 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Wyszukiwarka */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Szukaj Pokémona..."
          value={searchPoke}
          onChange={(e) => setSearchPoke(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded shadow-sm"
        />
      </div>

      {/* Lista Pokémonów */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg">
        {currentPokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      {/* Komponent Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Home;
