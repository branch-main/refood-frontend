import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Modal } from "@/shared/components/ui/Modal";
import { ConfirmModal } from "../components/ConfirmModal";
import { menuService } from "@/shared/services";
import { MenuItemOption, MenuItemChoice } from "@/shared/types";
import { FiEdit2, FiTrash2, FiPlus, FiChevronDown, FiChevronUp, FiArrowLeft } from "react-icons/fi";
import { HiChevronRight } from "react-icons/hi2";
import { formatPrice } from "@/shared/utils";
import { useRestaurantContext } from "../contexts";

// Skeleton for option rows
const OptionSkeleton = () => (
  <div className="px-6 py-4 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 bg-gray-200 rounded-lg" />
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-200 rounded-full" />
        </div>
        <div className="h-4 w-48 bg-gray-200 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-lg" />
        <div className="w-8 h-8 bg-gray-200 rounded-lg" />
      </div>
    </div>
  </div>
);

export const MenuItemOptions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { selectedRestaurant } = useRestaurantContext();
  const [expandedOptions, setExpandedOptions] = useState<Set<number>>(new Set());
  const [isOptionFormOpen, setIsOptionFormOpen] = useState(false);
  const [isChoiceFormOpen, setIsChoiceFormOpen] = useState(false);
  const [editingOption, setEditingOption] = useState<MenuItemOption | null>(null);
  const [editingChoice, setEditingChoice] = useState<MenuItemChoice | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [deleteOption, setDeleteOption] = useState<MenuItemOption | null>(null);
  const [deleteChoice, setDeleteChoice] = useState<MenuItemChoice | null>(null);

  const [optionForm, setOptionForm] = useState({
    name: "",
    minChoices: 0,
    maxChoices: 1,
    isRequired: false,
  });

  const [choiceForm, setChoiceForm] = useState({
    name: "",
    price: 0,
    isAvailable: true,
  });

  // Get menu item details
  const { data: menuItem } = useQuery({
    queryKey: ["menu-item", id],
    queryFn: () => menuService.getMenuItem(Number(id)),
    enabled: !!id,
  });

  // Get options for this menu item
  const { data: options, isLoading } = useQuery({
    queryKey: ["menu-options", id],
    queryFn: () => menuService.getMenuOptions(Number(id)),
    enabled: !!id,
  });

  const createOptionMutation = useMutation({
    mutationFn: (data: any) => menuService.createOption(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-options", id] });
      setIsOptionFormOpen(false);
      resetOptionForm();
    },
  });

  const updateOptionMutation = useMutation({
    mutationFn: ({ optionId, data }: { optionId: number; data: any }) =>
      menuService.updateOption(optionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-options", id] });
      setIsOptionFormOpen(false);
      setEditingOption(null);
      resetOptionForm();
    },
  });

  const deleteOptionMutation = useMutation({
    mutationFn: menuService.deleteOption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-options", id] });
    },
  });

  const createChoiceMutation = useMutation({
    mutationFn: ({ optionId, data }: { optionId: number; data: any }) =>
      menuService.createChoice(optionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-options", id] });
      setIsChoiceFormOpen(false);
      setSelectedOptionId(null);
      resetChoiceForm();
    },
  });

  const updateChoiceMutation = useMutation({
    mutationFn: ({ choiceId, data }: { choiceId: number; data: any }) =>
      menuService.updateChoice(choiceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-options", id] });
      setIsChoiceFormOpen(false);
      setEditingChoice(null);
      resetChoiceForm();
    },
  });

  const deleteChoiceMutation = useMutation({
    mutationFn: menuService.deleteChoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menu-options", id] });
    },
  });

  const resetOptionForm = () => {
    setOptionForm({
      name: "",
      minChoices: 0,
      maxChoices: 1,
      isRequired: false,
    });
  };

  const resetChoiceForm = () => {
    setChoiceForm({
      name: "",
      price: 0,
      isAvailable: true,
    });
  };

  const handleCreateOption = () => {
    setEditingOption(null);
    resetOptionForm();
    setIsOptionFormOpen(true);
  };

  const handleEditOption = (option: MenuItemOption) => {
    setEditingOption(option);
    setOptionForm({
      name: option.name,
      minChoices: option.minChoices,
      maxChoices: option.maxChoices,
      isRequired: option.isRequired,
    });
    setIsOptionFormOpen(true);
  };

  const handleDeleteOption = async (option: MenuItemOption) => {
    setDeleteOption(option);
  };

  const confirmDeleteOption = async () => {
    if (deleteOption) {
      await deleteOptionMutation.mutateAsync(deleteOption.id);
      setDeleteOption(null);
    }
  };

  const handleSubmitOption = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOption) {
      await updateOptionMutation.mutateAsync({
        optionId: editingOption.id,
        data: optionForm,
      });
    } else {
      await createOptionMutation.mutateAsync(optionForm);
    }
  };

  const handleCreateChoice = (optionId: number) => {
    setSelectedOptionId(optionId);
    setEditingChoice(null);
    resetChoiceForm();
    setIsChoiceFormOpen(true);
  };

  const handleEditChoice = (choice: MenuItemChoice, optionId: number) => {
    setSelectedOptionId(optionId);
    setEditingChoice(choice);
    setChoiceForm({
      name: choice.name,
      price: choice.price,
      isAvailable: choice.isAvailable,
    });
    setIsChoiceFormOpen(true);
  };

  const handleDeleteChoice = async (choice: MenuItemChoice) => {
    setDeleteChoice(choice);
  };

  const confirmDeleteChoice = async () => {
    if (deleteChoice) {
      await deleteChoiceMutation.mutateAsync(deleteChoice.id);
      setDeleteChoice(null);
    }
  };

  const handleSubmitChoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingChoice) {
      await updateChoiceMutation.mutateAsync({
        choiceId: editingChoice.id,
        data: choiceForm,
      });
    } else if (selectedOptionId) {
      await createChoiceMutation.mutateAsync({
        optionId: selectedOptionId,
        data: choiceForm,
      });
    }
  };

  const toggleOption = (optionId: number) => {
    const newExpanded = new Set(expandedOptions);
    if (newExpanded.has(optionId)) {
      newExpanded.delete(optionId);
    } else {
      newExpanded.add(optionId);
    }
    setExpandedOptions(newExpanded);
  };

  if (isLoading) {
    return (
      <>
        <div className="flex justify-between items-center mb-7">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/partner/menu")}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div className="h-7 w-32 bg-gray-200 rounded animate-pulse" />
            <HiChevronRight className="w-5 h-5 text-gray-400" />
            <div className="h-7 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]">
          <div className="divide-y divide-gray-100">
            {[...Array(3)].map((_, i) => (
              <OptionSkeleton key={i} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/partner/menu")}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5 text-gray-500" />
          </button>
          <span className="text-2xl leading-none text-gray-500">{menuItem?.name || "Producto"}</span>
          <HiChevronRight className="w-5 h-5 text-gray-400" />
          <h1 className="text-2xl leading-none font-bold text-gray-800">Opciones</h1>
        </div>
        <button
          onClick={handleCreateOption}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium text-sm shadow-sm shadow-red-500/25 hover:bg-red-600 hover:shadow-md hover:shadow-red-500/30 active:scale-[0.98] transition-all"
        >
          <FiPlus className="w-4 h-4" />
          Nueva Opción
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]">
        {options && options.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {options.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {/* Option Header */}
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleOption(option.id)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {expandedOptions.has(option.id) ? (
                        <FiChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-gray-900">{option.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          option.isRequired 
                            ? "bg-red-50 text-red-600" 
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {option.isRequired ? "Obligatorio" : "Opcional"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {option.choices.length} {option.choices.length === 1 ? "opción" : "opciones"} • 
                        Seleccionar {option.minChoices === option.maxChoices 
                          ? option.minChoices 
                          : `${option.minChoices}-${option.maxChoices}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditOption(option)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <FiEdit2 className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDeleteOption(option)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                      disabled={deleteOptionMutation.isPending}
                    >
                      <FiTrash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Choices */}
                {expandedOptions.has(option.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-5"
                  >
                    <div className="space-y-3">
                      {option.choices.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {option.choices.map((choice, choiceIndex) => (
                            <motion.div
                              key={choice.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2, delay: choiceIndex * 0.03 }}
                              className={`relative group p-4 rounded-xl border-2 transition-all ${
                                choice.isAvailable
                                  ? "bg-white border-gray-100 hover:border-gray-200"
                                  : "bg-gray-50 border-gray-100 opacity-60"
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-800 truncate">{choice.name}</h4>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {choice.price > 0 ? `+${formatPrice(choice.price)}` : "Sin costo adicional"}
                                  </p>
                                </div>
                                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${
                                  choice.isAvailable ? "bg-green-400" : "bg-gray-300"
                                }`} />
                              </div>
                              
                              {/* Hover actions */}
                              <div className="absolute top-2 right-8 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => handleEditChoice(choice, option.id)}
                                  className="p-1.5 bg-white hover:bg-gray-100 rounded-lg transition-colors shadow-sm"
                                  title="Editar"
                                >
                                  <FiEdit2 className="w-3.5 h-3.5 text-gray-500" />
                                </button>
                                <button
                                  onClick={() => handleDeleteChoice(choice)}
                                  className="p-1.5 bg-white hover:bg-red-50 rounded-lg transition-colors shadow-sm"
                                  title="Eliminar"
                                  disabled={deleteChoiceMutation.isPending}
                                >
                                  <FiTrash2 className="w-3.5 h-3.5 text-red-500" />
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 text-center py-4">
                          No hay opciones agregadas
                        </p>
                      )}
                      
                      <button
                        onClick={() => handleCreateChoice(option.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50/50 transition-all"
                      >
                        <FiPlus className="w-4 h-4" />
                        Agregar opción
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-2xl flex items-center justify-center">
              <FiPlus className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Sin opciones</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Agrega opciones de personalización para que tus clientes puedan elegir extras o variantes.
            </p>
            <button
              onClick={handleCreateOption}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl font-medium text-sm shadow-sm shadow-red-500/25 hover:bg-red-600 hover:shadow-md hover:shadow-red-500/30 active:scale-[0.98] transition-all"
            >
              <FiPlus className="w-4 h-4" />
              Crear primera opción
            </button>
          </motion.div>
        )}
      </div>

      {/* Option Form Modal */}
      <Modal isOpen={isOptionFormOpen} onClose={() => {
        setIsOptionFormOpen(false);
        setEditingOption(null);
      }}>
        <div className="w-[400px] max-w-[90vw]">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              {editingOption ? "Editar Opción" : "Nueva Opción"}
            </h2>
          </div>
          <form onSubmit={handleSubmitOption} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={optionForm.name}
                onChange={(e) =>
                  setOptionForm({ ...optionForm, name: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                placeholder="Ej: Tamaño, Ingredientes extras"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mínimo
                </label>
                <input
                  type="number"
                  value={optionForm.minChoices}
                  onChange={(e) =>
                    setOptionForm({
                      ...optionForm,
                      minChoices: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Máximo
                </label>
                <input
                  type="number"
                  value={optionForm.maxChoices}
                  onChange={(e) =>
                    setOptionForm({
                      ...optionForm,
                      maxChoices: parseInt(e.target.value) || 1,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="isRequired"
                checked={optionForm.isRequired}
                onChange={(e) =>
                  setOptionForm({
                    ...optionForm,
                    isRequired: e.target.checked,
                  })
                }
                className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="isRequired" className="text-sm text-gray-700">
                Obligatorio para el cliente
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsOptionFormOpen(false);
                  setEditingOption(null);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl font-medium text-sm hover:bg-red-600 transition-colors"
              >
                {editingOption ? "Guardar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Choice Form Modal */}
      <Modal isOpen={isChoiceFormOpen} onClose={() => {
        setIsChoiceFormOpen(false);
        setEditingChoice(null);
        setSelectedOptionId(null);
      }}>
        <div className="w-[400px] max-w-[90vw]">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">
              {editingChoice ? "Editar Opción" : "Nueva Opción"}
            </h2>
          </div>
          <form onSubmit={handleSubmitChoice} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                value={choiceForm.name}
                onChange={(e) =>
                  setChoiceForm({ ...choiceForm, name: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                placeholder="Ej: Grande, Queso extra"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio Adicional (S/)
              </label>
              <input
                type="number"
                value={choiceForm.price}
                onChange={(e) =>
                  setChoiceForm({
                    ...choiceForm,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="choiceAvailable"
                checked={choiceForm.isAvailable}
                onChange={(e) =>
                  setChoiceForm({
                    ...choiceForm,
                    isAvailable: e.target.checked,
                  })
                }
                className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
              />
              <label htmlFor="choiceAvailable" className="text-sm text-gray-700">
                Disponible
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsChoiceFormOpen(false);
                  setEditingChoice(null);
                  setSelectedOptionId(null);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl font-medium text-sm hover:bg-red-600 transition-colors"
              >
                {editingChoice ? "Guardar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={!!deleteOption}
        onClose={() => setDeleteOption(null)}
        onConfirm={confirmDeleteOption}
        title="Eliminar Opción"
        message={`¿Estás seguro de que deseas eliminar la opción "${deleteOption?.name}"? Se eliminarán también todas las opciones asociadas.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
        isLoading={deleteOptionMutation.isPending}
      />

      <ConfirmModal
        isOpen={!!deleteChoice}
        onClose={() => setDeleteChoice(null)}
        onConfirm={confirmDeleteChoice}
        title="Eliminar Elección"
        message={`¿Estás seguro de que deseas eliminar "${deleteChoice?.name}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
        isLoading={deleteChoiceMutation.isPending}
      />
    </>
  );
};
