import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
      return (
      <textarea
          className={cn(
              "flex min-h-16 w-full border border-gray-100 text-body-lg rounded px-3 py-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-200 data-[error=true]:border-danger-200 focus-not-error focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              className
          )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
