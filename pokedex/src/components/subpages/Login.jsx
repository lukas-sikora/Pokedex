import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSnackbar } from "notistack";
import { LoginContext } from "../../context/LoginContext";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/users";

// Definicja schematu walidacji Zod
const schema = z.object({
  email: z
    .string()
    .email("Niepoprawny adres email")
    .nonempty("Pole jest wymagane"),
  password: z
    .string()
    .min(8, "Hasło musi mieć co najmniej 8 znaków")
    .nonempty("Pole jest wymagane"),
});

const Login = () => {
  const { login } = useContext(LoginContext);
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

  // Funkcja obsługująca logowanie
  const onSubmit = async (data) => {
    try {
      const response = await axios.get(
        `${API_URL}?email=${data.email}&password=${data.password}`
      );
      if (response.data.length === 0) {
        enqueueSnackbar("Niepoprawny email lub hasło.", { variant: "error" });
        return;
      }

      // Logowanie użytkownika
      login(response.data[0]);
      enqueueSnackbar(
        `Zalogowano pomyślnie! Witaj, ${response.data[0].name}.`,
        { variant: "success" }
      );
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Błąd podczas logowania. Spróbuj ponownie.", {
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
      <h2 className="text-2xl font-bold mb-4">Logowanie</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Pole email */}
        <div className="mb-4">
          <label className="block">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border-blackr rounded"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Pole hasło */}
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

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Zaloguj się
        </button>
      </form>
    </div>
  );
};

export default Login;
