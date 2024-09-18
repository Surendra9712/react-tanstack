import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import {CheckIcon, MinusIcon} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "flex peer bg-surface-100 h-6 w-6 shrink-0 outline-none rounded border border-gray-100 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent data-[state=indeterminate]:bg-accent data-[state=indeterminate]:text-white data-[state=checked]:border-accent data-[state=checked]:text-white",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex justify-center items-center w-full h-full")}
    >
      {props.checked === true ? (
          <CheckIcon className="w-4 h-4" />
      ) : props.checked === 'indeterminate' ? (
          <MinusIcon className="w-4 h-4" />
      ) : null}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
