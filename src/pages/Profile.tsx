import { useAuth } from "@/shared/hooks";
import { getFallbackImage } from "@/shared/utils";
import { useState, useRef } from "react";
import { FiUser, FiMail, FiPhone, FiSave, FiCamera, FiCalendar, FiShield } from "react-icons/fi";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());
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
      setImageTimestamp(Date.now());
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
      if (!file.type.startsWith("image/")) {
        setError("Por favor selecciona una imagen válida");
        return;
      }
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

  const getDisplayImage = () => {
    if (imagePreview) return imagePreview;
    if (user.image) return `${user.image}?t=${imageTimestamp}`;
    return getFallbackImage(user.firstName, null);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-4 sm:p-6 lg:p-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Ajustes de cuenta</h1>
        <p className="text-sm text-gray-500 mt-1">Gestiona tu información personal y preferencias</p>
      </motion.div>

      {/* Messages */}
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
        >
          {error}
        </motion.div>
      )}
      {success && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm"
        >
          {success}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] overflow-hidden">
            {/* Gradient Header */}
            <div className="h-24 bg-gradient-to-br from-red-500 to-red-600 relative">
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                <div className="relative group">
                  <img
                    alt={user.firstName}
                    src={getDisplayImage()}
                    className={`h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg ${isEditing ? "cursor-pointer" : ""}`}
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
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-16 pb-6 px-6 text-center">
              <h2 className="text-xl font-bold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{user.email}</p>
              {isEditing && (
                <p className="text-xs text-gray-400 mt-3">Haz clic en la imagen para cambiarla</p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="border-t border-gray-100 px-6 py-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FiCalendar className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Miembro desde</p>
                  <p className="font-medium text-gray-800">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 px-6 py-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                  <FiShield className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Tipo de cuenta</p>
                  <p className="font-medium text-gray-800 capitalize">
                    {user.role === "restaurant_owner" ? "Socio" : "Cliente"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Edit Form */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Información Personal</h3>
                <p className="text-sm text-gray-500 mt-0.5">Actualiza tu información de perfil</p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-red-500 text-white text-sm rounded-xl hover:bg-red-600 transition-colors font-medium"
                >
                  Editar
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiUser className="w-4 h-4 text-gray-400" />
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 text-sm transition-all"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FiUser className="w-4 h-4 text-gray-400" />
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 text-sm transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiMail className="w-4 h-4 text-gray-400" />
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 text-sm"
                />
                {isEditing && (
                  <p className="text-xs text-gray-400 mt-1.5">El correo electrónico no se puede cambiar</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FiPhone className="w-4 h-4 text-gray-400" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Ej: +51 999 999 999"
                  className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-600 text-sm transition-all"
                />
              </div>

              {isEditing && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100"
                >
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <FiSave className="w-4 h-4" />
                        Guardar Cambios
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 text-sm"
                  >
                    Cancelar
                  </button>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
