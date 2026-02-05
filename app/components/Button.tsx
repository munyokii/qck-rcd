import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent" | "neutral" | "ghost" | "link" | "error" | "success" | "warning";
  outline?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "wide" | "block";
  href?: string;
}

export default function Button({
  children,
  variant,
  outline = false,
  size,
  className = "",
  href,
  ...props
}: ButtonProps) {
  
  // 1. Map variants to full strings so Tailwind sees them
  const variantClasses: Record<string, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    neutral: "btn-neutral",
    ghost: "btn-ghost",
    link: "btn-link",
    error: "btn-error",
    success: "btn-success",
    warning: "btn-warning",
  };

  // 2. Map sizes to full strings
  const sizeClasses: Record<string, string> = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
    wide: "btn-wide",
    block: "btn-block",
  };

  // 3. Construct the class string safely
  const classes = `btn ${variant ? variantClasses[variant] : ""} ${outline ? "btn-outline" : ""} ${size ? sizeClasses[size] : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} role="button">
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}