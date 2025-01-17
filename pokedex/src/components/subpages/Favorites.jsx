import { useContext } from "react";
import PokemonCard from "../shared/PokemonCard";
import { DataContext } from "../../context/DataContext";

const Favorites = () => {
  const { favorites } = useContext(DataContext);

  if (!favorites || favorites.length === 0) {
    return (
      <p className="text-center text-gray-500">Brak ulubionych Pokemonów</p>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.map((pokemon) => (
        <div key={pokemon.id||pokemon.pokeID}>
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
};

export default Favorites;
