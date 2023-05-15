import React, { ChangeEvent } from "react";

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  type: string;
  placeholder: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  setValue,
  type,
  placeholder,
  className,
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      className={`${className} outline-none w-full border-none rounded-sm px-4 focus:ring-sky-500 focus:ring-1 placeholder:italic placeholder:text-slate-400`}
    />
  );
};

export default Input;
