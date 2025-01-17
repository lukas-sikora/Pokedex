import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useSnackbar } from "notistack";
import PokemonCard from "../shared/PokemonCard";
import Pokeball from "../../assets/PNG/Pokeball.png";

const Arena = () => {
  const { arena, removeFromArena, updatePokemon } = useContext(DataContext);
  const { enqueueSnackbar } = useSnackbar();
  const [battleResult, setBattleResult] = useState(null);
  const capitalize = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const handleBattle = () => {
    if (arena.length !== 2) {
      enqueueSnackbar("Aby rozpocząć walkę, potrzebne są dwa Pokemony.", {
        variant: "warning",
      });
      return;
    }

    const [pokemon1, pokemon2] = arena;
    const score1 = pokemon1.base_experience * pokemon1.weight;
    const score2 = pokemon2.base_experience * pokemon2.weight;

    if (score1 > score2) {
      finalizeBattle(pokemon1, pokemon2);
    } else if (score2 > score1) {
      finalizeBattle(pokemon2, pokemon1);
    } else {
      setBattleResult({ draw: true });
      enqueueSnackbar("Remis! Żaden Pokémon nie wygrywa.", { variant: "info" });
    }
  };

  const finalizeBattle = async (winner, loser) => {
    setBattleResult({ winner, loser });

    enqueueSnackbar(`${capitalize(winner.name)} wygrał walkę!`, { variant: "success" });

    const updatedWinner = {
      ...winner,
      win: (winner.win || 0) + 1,
      lose: winner.lose || 0,
      base_experience: winner.base_experience + 10,
    };

    const updatedLoser = {
      ...loser,
      win: loser.win || 0,
      lose: (loser.lose || 0) + 1,
    };

    await updatePokemon(updatedWinner);
    await updatePokemon(updatedLoser);
  };

  const handleExitArena = () => {
    arena.forEach((pokemon) => removeFromArena(pokemon.pokeID));
    setBattleResult(null);
    enqueueSnackbar("Pokemony opuściły arenę.", { variant: "info" });
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4">
        {arena[0] ? (
          <div className="relative">
            <PokemonCard pokemon={arena[0]} />
            {battleResult === null && (
              <button
                onClick={() => removeFromArena(arena[0].pokeID)}
                className="absolute top-2 left-2 bg-gray-600 text-white p-1 rounded-lg"
              >
                Usuń
              </button>
            )}
          </div>
        ) : (
          <img
            src={Pokeball}
            alt="Pokeball"
            className="w-full h-full object-contain"
          />
        )}

        <div className="flex flex-col items-center justify-center">
          {battleResult ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleExitArena}
            >
              Opuść arenę
            </button>
          ) : (
            <button
              className={`bg-blue-500 text-white px-4 py-2 rounded ${
                arena.length === 2
                  ? "hover:bg-blue-600"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleBattle}
              disabled={arena.length !== 2}
            >
              WALCZ!
            </button>
          )}
        </div>

        {arena[1] ? (
          <div className="relative">
            <PokemonCard pokemon={arena[1]} />
            {battleResult === null && (
              <button
                onClick={() => removeFromArena(arena[1].pokeID)}
                className="absolute top-2 left-2 bg-gray-600 text-white p-1 rounded-lg"
              >
                Usuń
              </button>
            )}
          </div>
        ) : (
          <img
            src={Pokeball}
            alt="Pokeball"
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {battleResult && battleResult.draw && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">Remis!</h2>
        </div>
      )}
      {battleResult && battleResult.winner && battleResult.loser && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">
            {battleResult.winner.name} wygrał walkę!
          </h2>
          <img
            src={battleResult.loser.image}
            alt={`${battleResult.loser.name} przegrywa`}
            className="w-24 h-24 mx-auto opacity-50 transform scale-75"
          />
        </div>
      )}
    </div>
  );
};

export default Arena;
