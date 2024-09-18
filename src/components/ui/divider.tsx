import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cn } from "@/lib/utils"


const HorizontalDivider = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("h-px bg-gray-100", className)}
    {...props}
  />
))
HorizontalDivider.displayName = DropdownMenuPrimitive.Separator.displayName

const VerticalDivider = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
        ref={ref}
        className={cn("h-full w-px bg-gray-100", className)}
        {...props}
    />
))
VerticalDivider.displayName = DropdownMenuPrimitive.Separator.displayName

export {
  HorizontalDivider,VerticalDivider
}
