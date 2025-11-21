import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks";
import { Button } from "@/shared/components/ui";
import {
  AuthBrandingSide,
  FormInput,
  ErrorAlert,
} from "../features/auth/components";
import { FiMail, FiLock, FiPhone, FiUser } from "react-icons/fi";

const REGISTER_FEATURES = [
  {
    title: "100% Gratis",
    description: "Sin tarifas ocultas ni suscripciones",
  },
  {
    title: "Acceso Instantáneo",
    description: "Empieza a reservar comidas inmediatamente",
  },
  {
    title: "Seguro y Confiable",
    description: "Tus datos están protegidos",
  },
];

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
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
      await register(formData);
      navigate("/");
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData) {
        const errorMessages = Object.values(errorData).flat().join(" ");
        setError(
          errorMessages || "Registro fallido. Por favor intenta de nuevo.",
        );
      } else {
        setError("Registro fallido. Por favor intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <AuthBrandingSide
          title="Únete a la Comunidad"
          description="Regístrate gratis y comienza a ahorrar dinero mientras ayudas al medio ambiente combatiendo el desperdicio de alimentos."
          features={REGISTER_FEATURES}
        />

        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:p-10">
            <div className="lg:hidden mb-6 text-center">
              <h2 className="text-3xl font-bold text-[#B21F1F]">🍽️ ReeFood</h2>
            </div>

            <h1 className="text-2xl font-bold mb-2 text-gray-900">
              Crear Cuenta
            </h1>
            <p className="text-gray-600 mb-6">
              Completa el formulario para registrarte
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
                placeholder="Crea una contraseña segura"
                required
              />

              <FormInput
                label="Confirmar Contraseña"
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                icon={FiLock}
                placeholder="Confirma tu contraseña"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Nombre"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  icon={FiUser}
                  placeholder="Tu nombre"
                />

                <FormInput
                  label="Apellido"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                />
              </div>

              <FormInput
                label="Teléfono"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                icon={FiPhone}
                placeholder="+34 123 456 789"
              />

              <Button
                type="submit"
                fullWidth
                loading={loading}
                className="bg-[#B21F1F]! hover:bg-[#8B1616]! text-white! py-3! rounded-lg! text-base! font-semibold! mt-6! transition-colors!"
              >
                Crear Cuenta Gratis
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="text-[#B21F1F] font-semibold hover:underline"
                >
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
