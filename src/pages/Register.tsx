import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks";
import { FiMail, FiLock, FiAlertCircle, FiUser, FiPhone } from "react-icons/fi";
import {
  StyledInput,
  PasswordInput,
  SubmitButton,
} from "@/features/auth/components";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // if (formData.password !== formData.password2) {
    //   setError("Las contraseñas no coinciden");
    //   return;
    // }

    setLoading(true);

    try {
      await register(formData);
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
          "Registro fallido. Por favor intenta de nuevo.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 sm:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Crear cuenta</h1>
        <p className="text-gray-500">Completa tus datos para registrarte</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
          <FiAlertCircle className="text-red-500 mt-0.5 shrink-0" size={20} />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <StyledInput
            label="Nombre"
            icon={FiUser}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Nombre"
            required
            autoComplete="given-name"
          />

          <StyledInput
            label="Apellido"
            icon={FiUser}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Apellido"
            required
            autoComplete="family-name"
          />
        </div>

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

        <StyledInput
          label="Teléfono"
          icon={FiPhone}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="999999999"
          required
          autoComplete="tel"
        />

        <PasswordInput
          label="Contraseña"
          icon={FiLock}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Crea una contraseña segura"
          required
          autoComplete="new-password"
        />

        <PasswordInput
          label="Confirmar contraseña"
          icon={FiLock}
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          placeholder="Confirma tu contraseña"
          required
          autoComplete="new-password"
        />

        <div className="pt-2">
          <SubmitButton loading={loading} loadingText="Registrando...">
            Crear cuenta
          </SubmitButton>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="font-semibold text-red-500 hover:text-red-600 transition-colors"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
