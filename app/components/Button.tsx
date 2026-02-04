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
  const classes = `btn ${variant ? `btn-${variant}` : ""} ${outline ? "btn-outline" : ""} ${size ? `btn-${size}` : ""} ${className}`;

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