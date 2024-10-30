import React, { ReactNode, MouseEvent } from "react";
import clsx from "clsx";

interface ButtonProps {
  variant?: "outline" | "empty" | "default";
  size?: "large" | "medium" | "small";
  children: ReactNode;
  href?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "medium",
  children,
  href,
  onClick,
}) => {
  const baseStyles =
    "relative flex items-center justify-center rounded-full font-semibold transition duration-300";
  const variantStyles = {
    outline:
      "border border-primary text-primary dark:text-dark-primary dark:border-dark-primary hover:bg-primary/10 dark:hover:bg-dark-primary/10",
    empty:
      "text-primary dark:text-dark-primary hover:bg-primary/10 dark:hover:bg-dark-primary/10",
    default:
      "bg-primary text-white dark:bg-dark-primary dark:text-text-dark hover:scale-105 active:scale-95",
  };
  const sizeStyles = {
    large: "h-12 px-8 text-lg",
    medium: "h-9 px-6 text-sm",
    small: "h-7 px-4 text-xs",
  };

  const classes = clsx(
    baseStyles,
    variantStyles[variant] || variantStyles.default,
    sizeStyles[size] || sizeStyles.medium
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;