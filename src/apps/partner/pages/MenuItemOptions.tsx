import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui";
import { menuService } from "@/shared/services";
import { MenuItemOption, MenuItemChoice } from "@/shared/types";
import { FiEdit2, FiTrash2, FiPlus, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { formatPrice } from "@/shared/utils";

export const MenuItemOptions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [expandedOptions, setExpandedOptions] = useState<Set<number>>(new Set());
  const [isOptionFormOpen, setIsOptionFormOpen] = useState(false);
  const [isChoiceFormOpen, setIsChoiceFormOpen] = useState(false);
  const [editingOption, setEditingOption] = useState<MenuItemOption | null>(null);
  const [editingChoice, setEditingChoice] = useState<MenuItemChoice | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

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
    if (window.confirm(`¿Eliminar opción "${option.name}"?`)) {
      await deleteOptionMutation.mutateAsync(option.id);
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
    if (window.confirm(`¿Eliminar opción "${choice.name}"?`)) {
      await deleteChoiceMutation.mutateAsync(choice.id);
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
      <div className="bg-white rounded-4xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.02)]">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-7">
        <div>
          <h1 className="text-2xl font-medium text-black">
            Opciones de Personalización
          </h1>
          {menuItem && (
            <p className="text-gray-500 mt-1">{menuItem.name}</p>
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/partner/menu")}>
            Volver
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateOption}
            className="flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            Agregar Opción
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-4xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.02)]">
        {options && options.length > 0 ? (
          <div className="space-y-4">
            {options.map((option) => (
              <div
                key={option.id}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => toggleOption(option.id)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      {expandedOptions.has(option.id) ? (
                        <FiChevronUp className="w-5 h-5" />
                      ) : (
                        <FiChevronDown className="w-5 h-5" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {option.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {option.isRequired ? "Obligatorio" : "Opcional"} •{" "}
                        {option.minChoices}-{option.maxChoices} opciones
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {option.choices.length} opciones
                    </span>
                    <button
                      onClick={() => handleEditOption(option)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <FiEdit2 className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleDeleteOption(option)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Eliminar"
                      disabled={deleteOptionMutation.isPending}
                    >
                      <FiTrash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {expandedOptions.has(option.id) && (
                  <div className="p-6 space-y-3">
                    {option.choices.map((choice) => (
                      <div
                        key={choice.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-gray-900">
                              {choice.name}
                            </span>
                            <span className="text-sm text-gray-600">
                              +{formatPrice(choice.price)}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                choice.isAvailable
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {choice.isAvailable
                                ? "Disponible"
                                : "No disponible"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditChoice(choice, option.id)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <FiEdit2 className="w-4 h-4 text-gray-700" />
                          </button>
                          <button
                            onClick={() => handleDeleteChoice(choice)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Eliminar"
                            disabled={deleteChoiceMutation.isPending}
                          >
                            <FiTrash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={() => handleCreateChoice(option.id)}
                      className="w-full flex items-center justify-center gap-2"
                      size="sm"
                    >
                      <FiPlus className="w-4 h-4" />
                      Agregar Opción
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No hay opciones de personalización para este producto.
            </p>
            <Button variant="primary" onClick={handleCreateOption}>
              Crear primera opción
            </Button>
          </div>
        )}
      </div>

      {/* Option Form Modal */}
      {isOptionFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingOption ? "Editar Opción" : "Agregar Opción"}
            </h2>
            <form onSubmit={handleSubmitOption} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={optionForm.name}
                  onChange={(e) =>
                    setOptionForm({ ...optionForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Ej: Tamaño, Ingredientes extras"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mínimo *
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
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Máximo *
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
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
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
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="isRequired" className="text-sm font-medium text-gray-700">
                  Obligatorio
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOptionFormOpen(false);
                    setEditingOption(null);
                  }}
                  fullWidth
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" fullWidth>
                  {editingOption ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Choice Form Modal */}
      {isChoiceFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingChoice ? "Editar Opción" : "Agregar Opción"}
            </h2>
            <form onSubmit={handleSubmitChoice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={choiceForm.name}
                  onChange={(e) =>
                    setChoiceForm({ ...choiceForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Ej: Grande, Queso extra"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio Adicional (S/) *
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
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="flex items-center gap-3">
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
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label
                  htmlFor="choiceAvailable"
                  className="text-sm font-medium text-gray-700"
                >
                  Disponible
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsChoiceFormOpen(false);
                    setEditingChoice(null);
                    setSelectedOptionId(null);
                  }}
                  fullWidth
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" fullWidth>
                  {editingChoice ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
