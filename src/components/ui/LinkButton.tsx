// src/components/ui/LinkButton.tsx
import React from "react";

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "default" | "outline" | "link";
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, variant = "default", ...props }) => {
  const baseStyle = "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
  const styles = {
    default: "text-white bg-indigo-600 hover:bg-indigo-700",
    outline: "text-indigo-700 bg-white border-indigo-700 hover:bg-indigo-50",
    link: "text-indigo-600 hover:text-indigo-500",
  };

  return (
    <a className={`${baseStyle} ${styles[variant]}`} {...props}>
      {children}
    </a>
  );
};

export default LinkButton;
