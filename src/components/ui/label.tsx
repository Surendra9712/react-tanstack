import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  '',
    {
      variants:{
        size: {
          default: "text-label-lg",
          sm: "text-label-sm",
          lg: "text-label-lg",
          md: "text-label-md",
        },
          weight:{
            normal:"font-normal",
            medium:"font-medium",
            semibold:"font-semibold",
            bold:"font-bold",
          },
      },
      defaultVariants: {
        size: "default",
          weight:"normal"
      },
    }
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ weight,size,className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={`${labelVariants({size,weight})} ${className}`}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
