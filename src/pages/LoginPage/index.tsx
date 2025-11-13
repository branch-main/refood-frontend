import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { Button } from "../../components/common";
import { AuthBrandingSide, FormInput, ErrorAlert } from "../../components/auth";
import { FiMail, FiLock } from "react-icons/fi";

const LOGIN_FEATURES = [
  {
    title: "Ahorra Hasta 50%",
    description: "En alimentos de alta calidad cada día",
  },
  {
    title: "Impacto Ambiental",
    description: "Reduce desperdicios y ayuda al planeta",
  },
  {
    title: "Fácil y Rápido",
    description: "Reserva en segundos, recoge cuando quieras",
  },
];

export const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <AuthBrandingSide
          title="Bienvenido de Nuevo"
          description="Continúa tu viaje para combatir el desperdicio de alimentos y descubrir comidas deliciosas a precios increíbles."
          features={LOGIN_FEATURES}
        />

        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-10">
            <div className="lg:hidden mb-6 text-center">
              <h2 className="text-3xl font-bold text-[#B21F1F]">
                🍽️ ReeFood
              </h2>
            </div>

            <h1 className="text-2xl font-bold mb-2 text-gray-900">
              Iniciar Sesión
            </h1>
            <p className="text-gray-600 mb-6">
              Accede a tu cuenta para continuar
            </p>

            <ErrorAlert message={error} />

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <FormInput
                label="Correo Electrónico"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                icon={FiMail}
                placeholder="tu@email.com"
                required
              />

              <FormInput
                label="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                icon={FiLock}
                placeholder="Ingresa tu contraseña"
                required
              />

              <Button
                type="submit"
                fullWidth
                loading={loading}
                className="!bg-[#B21F1F] hover:!bg-[#8B1616] !text-white !py-3 !rounded-lg !text-base !font-semibold !mt-6 !transition-colors"
              >
                Iniciar Sesión
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                ¿No tienes una cuenta?{" "}
                <Link
                  to="/register"
                  className="text-[#B21F1F] font-semibold hover:underline"
                >
                  Regístrate gratis
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
