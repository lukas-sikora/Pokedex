import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [arena, setArena] = useState([]);

  const fetchAllData = async () => {
    try {
      const apiResponse = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=1500"
      );
      const apiPokemons = apiResponse.data.results;

      const detailedPromises = apiPokemons.map((pokemon) =>
        axios.get(pokemon.url).then((res) => res.data)
      );
      const detailedPokemons = await Promise.all(detailedPromises);

      const jsonPokemonsResponse = await axios.get(
        "http://localhost:5000/pokemons"
      );
      const jsonFavoritesResponse = await axios.get(
        "http://localhost:5000/favorites"
      );
      const jsonArenaResponse = await axios.get("http://localhost:5000/arena");

      const jsonPokemonMap = new Map(
        jsonPokemonsResponse.data.map((p) => [p.pokeID, p])
      );

      const mergedPokemons = detailedPokemons.map((pokemon) => {
        const jsonPokemon = jsonPokemonMap.get(pokemon.id?.toString());
        return {
          pokeID: jsonPokemon?.pokeID || pokemon.id?.toString(),
          name: jsonPokemon?.name || pokemon.name,
          image:
            jsonPokemon?.image ||
            pokemon.sprites?.other?.["official-artwork"]?.front_default ||
            "",
          base_experience:
            jsonPokemon?.base_experience || pokemon.base_experience || 0,
          height: jsonPokemon?.height || pokemon.height || "N/A",
          weight: jsonPokemon?.weight || pokemon.weight || "N/A",
          abilities:
            jsonPokemon?.abilities ||
            pokemon.abilities?.map((a) => ({ name: a.ability.name })),
          win: jsonPokemon?.win || 0,
          lose: jsonPokemon?.lose || 0,
        };
      });

      const additionalPokemons = jsonPokemonsResponse.data.filter(
        (p) =>
          !detailedPokemons.some((apiP) => apiP.id?.toString() === p.pokeID)
      );

      setPokemons([...mergedPokemons, ...additionalPokemons]);
      setFavorites(jsonFavoritesResponse.data);
      setArena(jsonArenaResponse.data);
    } catch (error) {
      console.error("Błąd podczas pobierania danych:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const addPokemon = async (newPokemon) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/pokemons",
        newPokemon
      );

      setPokemons((prevPokemons) => [...prevPokemons, response.data]);
    } catch (error) {
      console.error("Błąd podczas dodawania Pokemona:", error);
    }
  };

  const updatePokemon = async (updatedPokemon) => {
    try {
      const response = await axios.get("http://localhost:5000/pokemons");
      const existingPokemon = response.data.find(
        (pokemon) => pokemon.pokeID === updatedPokemon.pokeID
      );

      if (existingPokemon) {
        await axios.put(
          `http://localhost:5000/pokemons/${existingPokemon.id}`,
          { ...updatedPokemon, hasFight: true }
        );
      } else {
        await axios.post("http://localhost:5000/pokemons", {
          ...updatedPokemon,
          hasFight: true,
        });
      }

      setPokemons((prevPokemons) =>
        prevPokemons.some((p) => p.pokeID === updatedPokemon.pokeID)
          ? prevPokemons.map((p) =>
              p.pokeID === updatedPokemon.pokeID
                ? { ...updatedPokemon, hasFight: true }
                : p
            )
          : [...prevPokemons, { ...updatedPokemon, hasFight: true }]
      );
    } catch (error) {
      console.error("Błąd podczas aktualizacji Pokemona:", error);
    }
  };

  const addToFavorites = async (pokemon) => {
    try {
      const newFavorite = { ...pokemon, id: `${Date.now()}` };
      await axios.post("http://localhost:5000/favorites", newFavorite);
      setFavorites((prev) => [...prev, newFavorite]);
    } catch (error) {
      console.error("Błąd podczas dodawania do ulubionych:", error);
    }
  };

  const removeFromFavorites = async (pokeID) => {
    try {
      const favoriteToRemove = favorites.find((p) => p.pokeID === pokeID);
      if (favoriteToRemove) {
        await axios.delete(
          `http://localhost:5000/favorites/${favoriteToRemove.id}`
        );
        setFavorites((prev) =>
          prev.filter((pokemon) => pokemon.pokeID !== pokeID)
        );
      }
    } catch (error) {
      console.error("Błąd podczas usuwania z ulubionych:", error);
    }
  };

  const addToArena = async (pokemon) => {
    if (arena.length >= 2) {
      alert("Arena może pomieścić maksymalnie dwa Pokemony!");
      return;
    }

    try {
      const newArenaPokemon = { ...pokemon, id: `${Date.now()}` };
      await axios.post("http://localhost:5000/arena", newArenaPokemon);
      setArena((prev) => [...prev, newArenaPokemon]);
    } catch (error) {
      console.error("Błąd podczas dodawania Pokemona do areny:", error);
    }
  };

  const removeFromArena = async (pokeID) => {
    try {
      const arenaPokemonToRemove = arena.find((p) => p.pokeID === pokeID);
      if (arenaPokemonToRemove) {
        await axios.delete(
          `http://localhost:5000/arena/${arenaPokemonToRemove.id}`
        );
        setArena((prev) => prev.filter((pokemon) => pokemon.pokeID !== pokeID));
      }
    } catch (error) {
      console.error("Błąd podczas usuwania Pokemona z areny:", error);
    }
  };
  return (
    <DataContext.Provider
      value={{
        pokemons,
        favorites,
        arena,
        fetchAllData,
        addPokemon,
        updatePokemon,
        addToFavorites,
        removeFromFavorites,
        addToArena,
        removeFromArena,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
