import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LoginContext } from "../../context/LoginContext";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ pokemon, }) => {
  const { theme, gradients } = useContext(ThemeContext);
  const { user } = useContext(LoginContext);
  const { pokemons} = useContext(DataContext);
  const navigate = useNavigate();

  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = () => {
      const detailedPokemon = pokemons.find((p) => p.name === pokemon.name);
      setDetails(detailedPokemon || {});
    };

    fetchDetails();
  }, [pokemon.name, pokemons]);

  const pokemonImage =
    details?.image ||
    details?.sprites?.other?.["official-artwork"]?.front_default ||
    "/assets/default-pokemon.png";
  return (
    <div
      className={`w-72-min rounded-lg shadow-lg p-6 relative transform transition-transform duration-200 hover:scale-105 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
      style={{
        background: gradients[theme],
      }}
      onClick={() => navigate(`/pokemon/${pokemon.name}`)}
    >
      <img
        src={pokemonImage}
        alt={pokemon.name}
        className="w-48 h-48 object-contain mx-auto mb-6"
      />{" "}
      <h3 className="text-2xl font-bold capitalize text-center mb-4">
        {pokemon.name}
      </h3>
      <div className="grid grid-cols-2 gap-2 text-center">
        <div>
          <p>{details?.height || "N/A"}</p>
          <p className="font-bold">Height:</p>
          <p>{details?.weight || "N/A"}</p>
          <p className="font-bold">Weight:</p>
        </div>
        <div>
          <p>{details?.base_experience || "N/A"}</p>
          <p className="font-bold">Base Experience:</p>
          <p>{details?.abilities?.[0]?.name || "N/A"}</p>
          <p className="font-bold">Ability:</p>
        </div>
      </div>
      {user && pokemon.hasFight && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded">
          <p>W: {pokemon.win}</p>
          <p>L: {pokemon.lose}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
