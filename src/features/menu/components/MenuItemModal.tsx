import {
  MenuItemChoice as MenuItemChoiceDomain,
  MenuItem as MenuItemDomain,
  MenuItemOption as MenuItemOptionDomain,
} from "@/entities";
import { Textarea } from "@/shared/components/ui";
import { Checkbox } from "@/shared/components/ui/Checkbox";
import { Modal } from "@/shared/components/ui/Modal";
import { Radio } from "@/shared/components/ui/Radio";
import {
  formatPrice,
  calculateDiscount,
  getFallbackImage,
} from "@/shared/utils";
import { ChangeEvent, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";

// TODO: use actual values
const DISCOUNTED_PRICE: number | null = 10;
const OPTIONS = [
  new MenuItemOptionDomain(1, "Elige Salsas", 2, 3, true, [
    new MenuItemChoiceDomain(1, "Mayonesa", 1.99, true),
    new MenuItemChoiceDomain(2, "Mayonesa", 1.99, false),
    new MenuItemChoiceDomain(3, "Mayonesa", 1.99, true),
    new MenuItemChoiceDomain(4, "Mayonesa", 1.99, true),
    new MenuItemChoiceDomain(5, "Mayonesa", 1.99, true),
    new MenuItemChoiceDomain(6, "Mayonesa", 1.99, true),
    new MenuItemChoiceDomain(7, "Mayonesa", 1.99, true),
    new MenuItemChoiceDomain(8, "Mayonesa", 1.99, true),
  ]),

  new MenuItemOptionDomain(2, "Elige Salsas", 1, 1, true, [
    new MenuItemChoiceDomain(2, "Mayonesa", 1.99, true),
    new MenuItemChoiceDomain(3, "Mayonesa", 1.99, false),
    new MenuItemChoiceDomain(4, "Mayonesa", 1.99, true),
  ]),

  new MenuItemOptionDomain(3, "Elige Salsas", 1, 1, true, [
    new MenuItemChoiceDomain(2, "Mayonesa", 1.99, true),
    new MenuItemChoiceDomain(3, "Mayonesa", 1.99, false),
    new MenuItemChoiceDomain(4, "Mayonesa", 1.99, true),
  ]),
];

const MenuItemChoice = ({
  choice,
  type,
  checked,
  disabled,
  onChange,
}: {
  choice: MenuItemChoiceDomain;
  type: "checkbox" | "radio";
  checked: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const isAvailable = choice.isAvailable;
  const hasExtraCost = choice.price > 0;

  return (
    <div className="flex justify-between items-center">
      <div
        className={`flex-col flex text-xs ${isAvailable ? "text-gray-800" : "text-gray-500"}`}
      >
        {choice.name}
        {hasExtraCost && (
          <span className="font-bold">{formatPrice(choice.price)}</span>
        )}
      </div>

      {isAvailable ? (
        type === "checkbox" ? (
          <Checkbox onChange={onChange} checked={checked} disabled={disabled} />
        ) : (
          <Radio onChange={onChange} checked={checked} disabled={disabled} />
        )
      ) : (
        <span className="text-gray-500 text-xs">No disponible</span>
      )}
    </div>
  );
};

const MenuItemOption = ({
  option,
  selected,
  onSelectionChange,
}: {
  option: MenuItemOptionDomain;
  selected: Set<number>;
  onSelectionChange: (selected: Set<number>) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const isMulti = option.maxChoices > 1;
  const isRequired = option.isRequired || option.minChoices > 0;

  const minReached = selected.size >= option.minChoices;
  const maxReached = isMulti && selected.size >= option.maxChoices;

  const toggleChoice = (id: number) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
      onSelectionChange(newSelected);
    } else if (!maxReached) {
      newSelected.add(id);
      onSelectionChange(newSelected);
    }
  };

  const selectChoice = (id: number) => {
    onSelectionChange(new Set([id]));
  };

  return (
    <div className="flex flex-col w-full border border-gray-200 px-2.5 py-2 rounded-lg">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-gray-800 font-bold text-sm">{option.name}</span>
        <div className="flex gap-2 items-center">
          {selected.size > 0 && minReached && (
            <span className="font-medium text-green-600 text-xs bg-green-100 px-2 py-1 rounded-full">
              Seleccionado{" "}
              {isMulti && `(${selected.size}/${option.maxChoices})`}
            </span>
          )}

          {isRequired && !minReached && (
            <span className="text-gray-500 text-xs bg-neutral-100 px-2 py-1 rounded-full">
              Obligatorio {isMulti && `(${selected.size}/${option.minChoices})`}
            </span>
          )}

          <IoIosArrowDown
            className={`transition-transform ${isExpanded ? "rotate-180" : "rotate-0"} p-1 h-6 w-6 rounded-full bg-neutral-200 fill-gray-600`}
          />
        </div>
      </div>

      {isExpanded && (
        <>
          <span className="text-gray-600 text-xs mb-3">
            {isMulti
              ? `Selecciona hasta ${option.maxChoices} opciones`
              : "Selecciona una opción"}
          </span>

          <div className="flex flex-col gap-3">
            {option.choices.map((choice) => (
              <MenuItemChoice
                key={choice.id}
                choice={choice}
                type={isMulti ? "checkbox" : "radio"}
                checked={selected.has(choice.id)}
                disabled={!selected.has(choice.id) && maxReached}
                onChange={() =>
                  isMulti ? toggleChoice(choice.id) : selectChoice(choice.id)
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const MenuItemModal = ({
  item,
  isOpen,
  onClose,
}: {
  item: MenuItemDomain;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [count, setCount] = useState(1);
  const [notes, setNotes] = useState("");
  const [optionSelections, setOptionSelections] = useState<
    Map<number, Set<number>>
  >(new Map());

  const canAddToCart = OPTIONS.some((option) => {
    if (!option.isRequired && option.minChoices === 0) return false;
    const selected = optionSelections.get(option.id) || new Set();
    return selected.size < Math.max(option.minChoices, 1);
  });

  const additionalPrice = Array.from(optionSelections.entries()).reduce(
    (total, [optionId, selectedIds]) => {
      const option = OPTIONS.find((o) => o.id === optionId);
      if (!option) return total;

      const choicePrice = Array.from(selectedIds).reduce((sum, choiceId) => {
        const choice = option.choices.find((c) => c.id === choiceId);
        return sum + (choice?.price || 0);
      }, 0);

      return total + choicePrice;
    },
    0,
  );

  // TODO: shouldn't need Number() here if types are correct
  const price = DISCOUNTED_PRICE ?? item.price;
  const totalPrice = (Number(price) + additionalPrice) * count;

  useEffect(() => {
    if (!isOpen) return;
    setCount(1);
    setNotes("");
    setOptionSelections(new Map());
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <span className="text-gray-800 font-bold text-xl">{item.name}</span>
        <div className="flex justify-between items-start relative">
          <IoClose size={24} className="cursor-pointer" onClick={onClose} />
        </div>
      </div>

      <div className="w-4xl flex p-4 gap-4 max-h-[85vh]">
        <div className="w-96 flex flex-col gap-5">
          <img
            src={getFallbackImage(item.name, item.image)}
            alt={item.name}
            className="object-cover bg-gray-200 shadow-md aspect-square"
          />

          <div className="flex justify-between items-start gap-4">
            <p className="text-gray-600 text-sm">{item.description}</p>

            <div className="flex flex-col items-start text-nowrap leading-none">
              {(DISCOUNTED_PRICE && (
                <div className="flex flex-col gap-1 items-end">
                  <div className="font-bold text-xl text-gray-800">
                    {formatPrice(DISCOUNTED_PRICE)}
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="text-sm font-bold bg-red-100 px-2 py-0.5 rounded-lg text-red-500">
                      -{calculateDiscount(item.price, DISCOUNTED_PRICE)}%
                    </div>
                    <div className="text-sm text-gray-500 line-through">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                </div>
              )) || (
                <div className="font-bold text-gray-800">
                  {formatPrice(item.price)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-0 gap-4">
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-4 pr-2">
            {OPTIONS.map((option) => (
              <MenuItemOption
                key={option.id}
                option={option}
                selected={optionSelections.get(option.id) || new Set()}
                onSelectionChange={(selected) => {
                  const newSelections = new Map(optionSelections);
                  newSelections.set(option.id, selected);
                  setOptionSelections(newSelections);
                }}
              />
            ))}

            <div className="flex flex-col w-full">
              <span className="text-gray-800 font-bold">
                Notas para este producto
              </span>
              <span className="text-gray-600 text-xs mb-4">
                El local intentará seguirlas cuando lo prepare.
              </span>
              <Textarea
                maxCharacters={250}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Escribe las instrucciones que necesites."
              />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex items-center bg-neutral-200 text-sm rounded-lg py-2.5 px-4 gap-6">
              <button
                onClick={() => setCount(Math.max(1, count - 1))}
                className="cursor-pointer"
              >
                <FaMinus
                  className={`transition-colors ${count > 1 ? "fill-gray-700" : "fill-gray-400"}`}
                />
              </button>
              <span className="text-gray-800 font-semibold">{count}</span>
              <button
                onClick={() => setCount(count + 1)}
                className="cursor-pointer"
              >
                <FaPlus className="fill-gray-700" />
              </button>
            </div>

            <button
              disabled={canAddToCart}
              className="disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer disabled:cursor-default flex-1 text-sm rounded-lg py-2.5 transition-colors bg-red-500 hover:bg-red-700 text-white font-semibold"
              onClick={() => onClose()}
            >
              Agregar {formatPrice(totalPrice)}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
