import { useAuth } from "@/shared/hooks";
import { getFallbackImage } from "@/shared/utils";
import { useState, useRef } from "react";
import { FiUser, FiMail, FiPhone, FiSave, FiCamera } from "react-icons/fi";
import { motion } from "framer-motion";

export const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await updateUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        image: selectedImage,
      });
      setSuccess("¡Perfil actualizado correctamente!");
      setIsEditing(false);
      setSelectedImage(null);
      setImagePreview(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al actualizar el perfil");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
    setSelectedImage(null);
    setImagePreview(null);
    setIsEditing(false);
    setError(null);
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Por favor selecciona una imagen válida");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("La imagen no debe superar los 5MB");
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const displayImage = imagePreview || getFallbackImage(user.firstName, user.image);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 border-b border-gray-200 flex items-center gap-5">
        <span className="text-gray-800 font-bold">Ajustes de cuenta</span>
      </div>

      <div className="px-24 py-12 flex flex-col gap-8">
        {/* Messages */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg"
          >
            {success}
          </motion.div>
        )}

        {/* Profile Picture Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col items-center border-b border-gray-200 pb-8"
        >
          <div className="relative group">
            <img
              alt={user.firstName}
              src={displayImage}
              className={`h-24 w-24 rounded-full object-cover shadow-lg border-4 border-white ${isEditing ? "cursor-pointer" : ""}`}
              onClick={handleImageClick}
            />
            {isEditing && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleImageClick}
              >
                <FiCamera className="w-6 h-6 text-white" />
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          {isEditing && (
            <p className="text-xs text-gray-500 mt-2">Haz clic en la imagen para cambiarla</p>
          )}
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </motion.div>

        {/* Personal Information Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-col px-5"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-800 text-lg font-bold">
              Información Personal
            </span>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
              >
                Editar
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FiUser size={16} />
                  Nombre
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FiUser size={16} />
                  Apellido
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiMail size={16} />
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
              {isEditing && (
                <p className="text-xs text-gray-500 mt-1">El correo electrónico no se puede cambiar</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FiPhone size={16} />
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <FiSave size={18} />
                      Guardar Cambios
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
                >
                  Cancelar
                </button>
              </div>
            )}
          </form>
        </motion.div>

        {/* Account Details Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-col border-t border-gray-200 pt-8 px-5"
        >
          <span className="text-gray-800 text-lg font-bold mb-4">
            Detalles de la Cuenta
          </span>
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-600">Fecha de registro</span>
              <span className="text-sm font-semibold text-gray-800">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-600">Rol</span>
              <span className="text-sm font-semibold text-gray-800 capitalize">
                {user.role}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
