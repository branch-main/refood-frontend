import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui";
import { useAuthContext } from "@/features/auth/contexts";

export const PartnerLogin = () => {
  const navigate = useNavigate();
  const { partnerLogin, loading: authLoading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await partnerLogin(email, password);
      
      // Store remember me preference
      if (rememberMe) {
        localStorage.setItem("remember_partner", "true");
      }
      
      // Navigate to dashboard
      navigate("/partner/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      
      // Handle different error types
      if (err.response?.status === 401) {
        setError("Email o contraseña incorrectos");
      } else if (err.response?.status === 403) {
        setError("No tienes permisos de socio. Por favor contacta al soporte.");
      } else if (err.code === "ERR_NETWORK") {
        setError("Error de conexión. Por favor verifica tu conexión a internet.");
      } else {
        setError(err.response?.data?.message || "Error al iniciar sesión. Por favor intenta de nuevo.");
      }
    }
  };

  const loading = authLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="ReFood Partner" className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Partner Login</h1>
          <p className="text-gray-600 mt-2">Accede a tu panel de restaurante</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="partner@restaurant.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-red-600"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span className="text-sm text-gray-600">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-red-600 hover:text-red-700">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <a href="/partners" className="text-red-600 hover:text-red-700 font-medium">
                Únete como socio
              </a>
            </p>
          </div>

          {/* Demo Credentials (remove in production) */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-600 font-semibold mb-2">Demo (Development Only):</p>
            <p className="text-xs text-blue-600">Email: demo@partner.com</p>
            <p className="text-xs text-blue-600">Password: demo123</p>
          </div>
        </div>

        {/* Customer Link */}
        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Volver al sitio de clientes
          </a>
        </div>
      </div>
    </div>
  );
};
