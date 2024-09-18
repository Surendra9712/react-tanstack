import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

const iconVariants = cva(
    "flex justify-center items-center",
    {
        variants: {
            variant: {
                primary: "bg-primary-translucent text-primary",
                info: "bg-info-translucent text-info",
                success: "bg-success-translucent text-success",
                warning: "bg-warning-translucent text-warning",
                danger: "bg-danger-translucent text-danger",
                gray: "bg-gray-50 text-gray-700",
            },
            size: {
                md: "h-10 w-10",
                sm: "h-8 w-8",
                lg: "h-12 w-12",
            },
            rounded: {
                full: "rounded-full",
                md: "rounded-md",
                lg: "rounded-lg"
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            rounded: "full",
        },
    }
);

export interface IconProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof iconVariants> {
}

const CircularIcon = React.forwardRef<
    HTMLDivElement,
    IconProps
>(({rounded, size, variant, className, ...props}, ref) => (
    <div
        ref={ref}
        className={cn(iconVariants({rounded, size, variant, className}))}
        {...props}
    >{props.children}</div>
))
export {
    CircularIcon
}
