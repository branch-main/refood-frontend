import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks";
import { FiMail, FiLock, FiAlertCircle } from "react-icons/fi";
import {
  StyledInput,
  PasswordInput,
  SubmitButton,
} from "@/features/auth/components";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          "Inicio de sesión fallido. Por favor intenta de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 sm:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">¡Bienvenido de nuevo!</h1>
        <p className="text-gray-500">Ingresa tus credenciales para acceder</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
          <FiAlertCircle className="text-red-500 mt-0.5 shrink-0" size={20} />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <StyledInput
          label="Correo electrónico"
          icon={FiMail}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          required
          autoComplete="email"
        />

        <div className="space-y-1.5">
          <PasswordInput
            label="Contraseña"
            icon={FiLock}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa tu contraseña"
            required
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-red-500 border-gray-300 rounded ring-red-500 cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                Recuérdame
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>

        <div className="pt-2">
          <SubmitButton loading={loading} loadingText="Ingresando...">
            Iniciar sesión
          </SubmitButton>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="font-semibold text-red-500 hover:text-red-600 transition-colors"
          >
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};
