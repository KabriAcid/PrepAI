import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    const inputElement = (
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-spiritual-500">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className,
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-spiritual-500">
            {rightIcon}
          </span>
        )}
      </div>
    );

    if (!label) {
      return inputElement;
    }

    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className="block text-sm font-medium text-spiritual-700">
          {label}
        </label>
        {inputElement}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
export default Input;
