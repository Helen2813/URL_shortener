import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`
        w-full h-[40px] rounded-lg 
        bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 
        font-semibold 
        shadow-lg 
        hover:from-purple-500 hover:to-blue-500 
        focus:outline-none focus:ring-2 focus:ring-yellow-300 
        transition duration-300 
        !bg-gradient-to-r !shadow-lg  
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
