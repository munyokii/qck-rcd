import React, { forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, className, ...props }, ref) => {
    return (
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-medium">{label}</span>
        </label>
        <label
          className={twMerge(
            clsx(
              "input input-bordered flex items-center gap-2 transition-all duration-200",
              {
                "input-error": error,
                "focus-within:input-primary": !error,
              },
              className
            )
          )}
        >
          {icon && <span className="opacity-70">{icon}</span>}
          <input
            ref={ref}
            className="grow bg-transparent outline-none"
            {...props}
          />
        </label>
        {error && (
          <label className="label">
            <span className="label-text-alt text-error">{error.message}</span>
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;