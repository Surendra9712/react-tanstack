import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"
import {Slot} from "@radix-ui/react-slot";

const titleVariants = cva(
    '',
    {
        variants: {
            size: {
                lg: "text-title-lg",
                md: "text-title-md",
                sm: "text-title-sm",
            },
            weight: {
                normal: "font-normal",
                medium: "font-medium",
                semibold: "font-semibold",
                bold: "font-bold",
            },
        },
        defaultVariants: {
            size: "lg",
            weight: "semibold"
        },
    }
)

const Title = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof titleVariants>
>(({weight, size, className, ...props}, ref) => (
    <p
        ref={ref}
        className={`${titleVariants({size, weight,className})}`}
        {...props}
    />
))
Title.displayName = Slot.displayName

export {Title}
