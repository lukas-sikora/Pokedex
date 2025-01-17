import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { LoginContext } from "../../context/LoginContext";
import { DataContext } from "../../context/DataContext";
import { useSnackbar } from "notistack";
import HeartIconComponent from "../../icons/HeartIconComponent";
import SwordIconComponent from "../../icons/SwordIconComponent";

const PokemonDetails = () => {
  const { theme, gradients } = useContext(ThemeContext);
  const { user } = useContext(LoginContext);
  const {
    pokemons,
    favorites,
    addToFavorites,
    removeFromFavorites,
    arena,
    addToArena,
    removeFromArena,
  } = useContext(DataContext);
  const { enqueueSnackbar } = useSnackbar();
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const selectedPokemon = pokemons.find((p) => p.name === name);
    if (selectedPokemon) {
      setPokemon(selectedPokemon);
    } else {
      enqueueSnackbar("Pokemon nie został znaleziony.", { variant: "error" });
    }
  }, [name, pokemons, enqueueSnackbar]);

  if (!pokemon) {
    return (
      <p className="text-center text-gray-500">
        Ładowanie szczegółów Pokémona...
      </p>
    );
  }

  const isFavorite = favorites.some((fav) => fav.name === pokemon.name);
  const isInArena = arena.some((ar) => ar.name === pokemon.name);
  const handleFavoriteToggle = () => {
    const favoritePokemon = favorites.find(
      (fav) => fav.pokeID === pokemon.pokeID
    );
    if (favoritePokemon) {
      removeFromFavorites(pokemon.pokeID);
      enqueueSnackbar(`${pokemon.name} został usunięty z ulubionych.`, {
        variant: "info",
      });
    } else {
      addToFavorites(pokemon);
      enqueueSnackbar(`${pokemon.name} został dodany do ulubionych.`, {
        variant: "success",
      });
    }
  };
  const handleArenaToggle = () => {
    if (isInArena) {
      removeFromArena(pokemon.pokeID);
      enqueueSnackbar(`${pokemon.name} został usunięty z areny.`, {
        variant: "info",
      });
    } else if (arena.length >= 2) {
      enqueueSnackbar("Arena jest pełna! Usuń Pokemona, aby dodać nowego.", {
        variant: "warning",
      });
    } else {
      addToArena(pokemon);
      enqueueSnackbar(`${pokemon.name} został dodany do areny.`, {
        variant: "success",
      });
    }
  };

  return (
    <div
      className={`max-w-3xl mx-auto mt-5 rounded-lg shadow-lg p-8 relative transform transition-transform duration-200 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
      style={{
        background: gradients[theme],
      }}
    >
      {user && (
        <>
          <div>
            <HeartIconComponent
              isFavorite={isFavorite}
              onToggleFavorite={handleFavoriteToggle}
            />
            <SwordIconComponent
              isInArena={isInArena}
              onToggleArena={handleArenaToggle}
            />
          </div>

          <div className="absolute top-3 left-28 text-sm text-white bg-gray-700 px-2 py-1 rounded">
            {arena.length}/2
          </div>
        </>
      )}
      <img
        src={pokemon.image || "/assets/default-pokemon.png"}
        alt={pokemon.name}
        className="w-64 h-64 object-contain mx-auto mb-6"
      />
      <h1 className="text-3xl font-bold capitalize text-center mb-4">
        {pokemon.name}
      </h1>
      <div className="grid grid-cols-2 gap-8 text-center">
        <div>
          <p>{pokemon.height}</p>
          <p className="font-bold">Height:</p>
          <p>{pokemon.weight}</p>
          <p className="font-bold">Weight:</p>
        </div>
        <div>
          <p>{pokemon.base_experience}</p>
          <p className="font-bold">Base Experience:</p>
          <p>{pokemon.abilities?.[0]?.name || "N/A"}</p>
          <p className="font-bold">Ability:</p>
        </div>
      </div>
      {pokemon.win !== undefined && (
        <div className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded">
          <p>W: {pokemon.win}</p>
          <p>L: {pokemon.lose}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
