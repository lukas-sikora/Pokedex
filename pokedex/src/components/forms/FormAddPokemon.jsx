import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pokemonSchema } from "../../validation/validationSchemas";
import { DataContext } from "../../context/DataContext";
import { ThemeContext } from "../../context/ThemeContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import arrowLeft from "../../assets/PNG/arrowleft.png";
import arrowRight from "../../assets/PNG/arrowright.png";

const FormAddPokemon = ({ onCancel }) => {
  const { pokemons, addPokemon } = useContext(DataContext);
  const { theme } = useContext(ThemeContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(pokemonSchema),
  });

  const [availableImages, setAvailableImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Pobieranie dostępnych grafik z kolekcji Pokémonów
    const allImages = pokemons.map((pokemon) => pokemon.image);
    setAvailableImages(allImages);
  }, [pokemons]);

  const onSubmit = async (data) => {
    try {
      const newPokemon = {
        ...data,
        pokeID: `${data.name}_${Date.now()}`, // Generowanie unikalnego pokeID
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1), // Nazwa z wielką literą
        image: availableImages[currentImageIndex],
      };
  
      await addPokemon(newPokemon); // Dodanie Pokémona do db.json i stanu lokalnego
      enqueueSnackbar(`Nowy Pokémon ${newPokemon.name} został dodany.`, {
        variant: "success",
      });
  
      reset();
      setCurrentImageIndex(0);
      navigate("/"); // Przekierowanie na stronę główną
    } catch (error) {
      enqueueSnackbar("Błąd podczas tworzenia Pokémona.", { variant: "error" });
    }
  };
  

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % availableImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + availableImages.length) % availableImages.length
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`max-w-lg mx-auto p-6 rounded shadow ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-center mb-4 items-center">
        <button
          type="button"
          onClick={handlePrevImage}
          className="bg-transparent border-none cursor-pointer"
        >
          <img src={arrowLeft} alt="Poprzednia grafika" className="w-6 h-6" />
        </button>
        {availableImages.length > 0 && (
          <img
            src={availableImages[currentImageIndex]}
            alt="Wybrana grafika"
            className="w-32 h-32 mx-4 object-contain"
          />
        )}
        <button
          type="button"
          onClick={handleNextImage}
          className="bg-transparent border-none cursor-pointer"
        >
          <img src={arrowRight} alt="Następna grafika" className="w-6 h-6" />
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-center">Stwórz Pokémona</h2>

      {/* Pola formularza */}
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
          {...register("weight", {
            valueAsNumber: true, // Konwersja wartości na liczbę
          })}
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
          {...register("height", {
            valueAsNumber: true, // Konwersja wartości na liczbę
          })}
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
          {...register("base_experience", {
            valueAsNumber: true, // Konwersja wartości na liczbę
          })}
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

      <div className="flex justify-between mt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Anuluj
          </button>
        )}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded shadow hover:bg-green-700 transition duration-200"
        >
          Stwórz
        </button>
      </div>
    </form>
  );
};

export default FormAddPokemon;
