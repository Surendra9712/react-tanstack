import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
      return (
      <input
        type={type}
        className={cn(
            "flex h-10 w-full border file:border-0 text-body-lg rounded px-3 py-1 transition-colors file:bg-transparent file:text-sm file:font-medium placeholder:text-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[error=true]:border-danger-200 border-gray-200 focus-not-error read-only:pointer-events-none",
            className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
