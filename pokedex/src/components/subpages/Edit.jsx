import { useContext, useState } from "react";
import { useSnackbar } from "notistack";
import { DataContext } from "../../context/DataContext";
import { ThemeContext } from "../../context/ThemeContext";
import Pagination from "../shared/Pagination";
import FormAddPokemon from "../forms/FormAddPokemon";
import FormEditPokemon from "../forms/FormEditPokemon";

const Edit = () => {
  const { pokemons, updatePokemon } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const [editingPokemon, setEditingPokemon] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const pokemonsPerPage = 15;

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(pokemons.length / pokemonsPerPage)) {
      setCurrentPage(page);
    }
  };

  const handleSave = async (pokemon) => {
    try {
      await updatePokemon(pokemon);
      setEditingPokemon(null);
      enqueueSnackbar("Zapisano zmiany w Pokemonie.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Błąd podczas zapisywania zmian.", { variant: "error" });
    }
  };

  return (
    <div
      className={`p-6 min-h-screen ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      {!editingPokemon && (
        <>
          <div className="flex justify-center mb-8">
            <button
              onClick={() =>
                setEditingPokemon({
                  name: "",
                  weight: null,
                  height: null,
                  base_experience: null,
                  image: "",
                  pokeID: null,
                })
              }
              className="bg-blue-600 text-white px-6 py-3 rounded shadow-lg"
            >
              Stwórz Pokémona
            </button>
          </div>

          <ul className="max-w-5xl mx-auto mb-6 grid grid-cols-1 gap-4">
            {currentPokemons.map((pokemon, index) => (
              <li
                key={pokemon.pokeID}
                className={`flex items-center justify-between p-4 rounded ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <div className="flex items-center w-48">
                  <span className="text-lg font-semibold mr-4">
                    {(currentPage - 1) * pokemonsPerPage + index + 1}.
                  </span>
                  <span className="text-lg font-bold capitalize">
                    {pokemon.name}
                  </span>
                </div>
                <div className="flex justify-center items-center w-32">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <button
                  onClick={() => setEditingPokemon(pokemon)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edytuj
                </button>
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(pokemons.length / pokemonsPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {editingPokemon && (
        <>
          {editingPokemon.pokeID ? (
            <FormEditPokemon
              pokemon={editingPokemon}
              onCancel={() => setEditingPokemon(null)}
              onSave={handleSave}
            />
          ) : (
            <FormAddPokemon
              onCancel={() => setEditingPokemon(null)}
              onSave={handleSave}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Edit;
