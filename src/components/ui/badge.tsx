import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";

const badgeVariants = cva(
    "inline-flex items-center h-6 px-2 text-label-sm rounded font-medium",
    {
        variants: {
            translucent: {
                primary: "bg-primary-translucent text-primary",
                info: "bg-info-translucent text-info",
                success: "bg-success-translucent text-success",
                danger: "bg-danger-translucent text-danger",
                gray: "bg-gray-translucent text-black",
                warning: "bg-warning-translucent text-warning",
            },
            solid: {
                primary: "bg-primary text-white",
                info: "bg-info text-white",
                success: "bg-success text-white",
                danger: "bg-danger text-white",
                gray: "bg-gray text-black",
                warning: "bg-warning text-white",
            },
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {
    asChild?: boolean;
    variantType?: "translucent" | "solid";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({
         className,
         translucent = "primary",
         solid = "primary",
         variantType = "translucent",
         asChild = false,
         ...props
     }, ref) => {
        const Comp = asChild ? Slot : "div";
        return (
            <Comp
                className={variantType === "solid"
                    ? badgeVariants({solid, className})
                    : badgeVariants({translucent, className})}
                ref={ref}
                {...props}
            >
                {props.children}
            </Comp>
        );
    }
);
Badge.displayName = "Badge";

export {Badge, badgeVariants};
