import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"
import {Slot} from "@radix-ui/react-slot";

const bodyVariants = cva(
    'text-200',
    {
        variants: {
            size: {
                lg: "text-body-lg",
                md: "text-body-md",
                sm: "text-body-sm",
            },
            weight: {
                normal: "font-normal",
                medium: "font-medium",
                semibold: "font-semibold",
                bold: "font-bold",
            },
        },
        defaultVariants: {
            size: "md",
            weight: "normal"
        },
    }
)

const ContentBody = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof Slot> &
    VariantProps<typeof bodyVariants>
>(({weight, size, className, ...props}, ref) => (
    <div
        ref={ref}
        className={`${bodyVariants({size, weight,className})}`}
        {...props}
    />
))
ContentBody.displayName = Slot.displayName

export {ContentBody}
