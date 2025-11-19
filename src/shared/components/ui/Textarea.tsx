import { TextareaHTMLAttributes, useEffect, useRef, useState } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxCharacters?: number;
  value?: string;
}

export const Textarea = ({
  maxCharacters,
  value = "",
  ...props
}: TextareaProps) => {
  const charCount = String(value).length;
  const isAtLimit = maxCharacters && charCount >= maxCharacters;
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="rounded-lg border border-gray-300 flex flex-col w-full px-4 pt-6 pb-4 text-sm">
      <textarea
        ref={ref}
        value={value}
        maxLength={maxCharacters}
        rows={1}
        className={`w-full resize-none focus:outline-none transition-all placeholder:text-gray-400`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      <div className="relative w-full h-0.5 mt-2 mb-1 overflow-hidden">
        <div className="absolute top-px w-full h-px bg-gray-300" />
        <div
          className={`h-full w-full top-0 ${isAtLimit ? "bg-red-500" : "bg-gray-800"} transition-all duration-200 ${
            isFocused
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full"
          }`}
        />
      </div>

      {maxCharacters && (
        <span
          className={`text-xs text-right ${
            isAtLimit ? "text-red-500" : "text-gray-600"
          }`}
        >
          {charCount}/{maxCharacters}
        </span>
      )}
    </div>
  );
};
