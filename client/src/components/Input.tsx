import React from 'react';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  required?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  name,
  id,
  required = false,
  className = '',
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      name={name}
      id={id}
      required={required}
      className={`w-full box-border h-[40px] p-[8px] rounded-[8px] appearance-none shadow-sm 
                  bg-gray-700 bg-opacity-80 border border-gray-600 
                  placeholder-current text-current
                  focus:outline-none focus:ring-0 
                  focus:shadow-[0_0_10px_2px_rgba(255,255,150,0.7)]
                  transition duration-200 ${className}`}
      style={{ minWidth: '0' }}
    />
  );
};
