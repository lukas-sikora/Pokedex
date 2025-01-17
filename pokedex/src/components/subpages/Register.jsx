import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSnackbar } from "notistack";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/users";

// Schemat walidacji Zod
const schema = z
  .object({
    name: z
      .string()
      .min(3, "Imię musi mieć co najmniej 3 znaki")
      .nonempty("Pole jest wymagane"),
    email: z
      .string()
      .email("Niepoprawny adres email")
      .nonempty("Pole jest wymagane"),
    password: z
      .string()
      .min(8, "Hasło musi mieć co najmniej 8 znaków")
      .regex(/[A-Z]/, "Hasło musi zawierać co najmniej jedną dużą literę")
      .regex(/\d/, "Hasło musi zawierać co najmniej jedną cyfrę")
      .regex(
        /[@$!%*?&]/,
        "Hasło musi zawierać co najmniej jeden znak specjalny"
      )
      .nonempty("Pole jest wymagane"),
    repeatPassword: z.string().nonempty("Pole jest wymagane"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Hasła muszą być takie same",
    path: ["repeatPassword"],
  });

const Register = () => {
  const { theme } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  // Obsługa rejestracji
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(API_URL, data);
      enqueueSnackbar("Zarejestrowano pomyślnie!", { variant: "success" });
      navigate("/login");
    } catch (error) {
      enqueueSnackbar("Błąd podczas rejestracji. Spróbuj ponownie.", {
        variant: "error",
      });
    }
  };

  return (
    <div
      className={`p-6 max-w-md mx-auto rounded-lg shadow-lg ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Rejestracja</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Pole Imię */}
        <div className="mb-4">
          <label className="block">Imię</label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/* Pole Email */}
        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Pole Hasło */}
        <div className="mb-4">
          <label className="block">Hasło</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Pole Powtórz Hasło */}
        <div className="mb-4">
          <label className="block">Powtórz Hasło</label>
          <input
            type="password"
            {...register("repeatPassword")}
            className="w-full p-2 border rounded"
          />
          {errors.repeatPassword && (
            <p className="text-red-500">{errors.repeatPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Zarejestruj się
        </button>
      </form>
    </div>
  );
};

export default Register;
