import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { pokemonSchema } from "../../validation/validationSchemas";
import { DataContext } from "../../context/DataContext";
import { ThemeContext } from "../../context/ThemeContext";
import { useSnackbar } from "notistack";

const FormEditPokemon = ({ pokemon, onCancel }) => {
  const { updatePokemon } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const capitalize = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pokemonSchema),
    defaultValues: {
      name: pokemon.name,
      weight: pokemon.weight,
      height: pokemon.height,
      base_experience: pokemon.base_experience,
    },
  });

  const onSubmit = async (data) => {
    try {
      await updatePokemon({ ...pokemon, ...data });
      enqueueSnackbar(`Zmieniono atrybuty ${capitalize(data.name)}.`, {
        variant: "success",
      });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Błąd podczas aktualizacji Pokémona.", {
        variant: "error",
      });
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`max-w-lg mx-auto p-6 rounded shadow ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-center mb-4">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-32 h-32 object-contain"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">
        Edytuj {capitalize(pokemon.name)}
      </h2>

      <div className="mb-4">
        <label className="block">Nazwa</label>
        <input
          type="text"
          {...register("name")}
          className={`w-full p-2 border rounded ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block">Waga</label>
        <input
          type="number"
          {...register("weight", { valueAsNumber: true })}
          className={`w-full p-2 border rounded ${
            errors.weight ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.weight && (
          <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block">Wzrost</label>
        <input
          type="number"
          {...register("height", { valueAsNumber: true })}
          className={`w-full p-2 border rounded ${
            errors.height ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.height && (
          <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block">Doświadczenie</label>
        <input
          type="number"
          {...register("base_experience", { valueAsNumber: true })}
          className={`w-full p-2 border rounded ${
            errors.base_experience ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.base_experience && (
          <p className="text-red-500 text-sm mt-1">
            {errors.base_experience.message}
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Anuluj
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Zmień atrybuty
        </button>
      </div>
    </form>
  );
};

export default FormEditPokemon;
