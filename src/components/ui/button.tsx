import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import LoadingIcon from "./loading-icon";

const buttonVariants = cva(
    "flex items-center justify-center rounded font-medium transition-colors focus-visible:outline-none group focus-visible:ring-1 focus-visible:ring-ring disabled:bg-surface-200 disabled:text-300 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                solid: "text-white",
                translucent: "",
                outline: "border bg-white",
                subtle: "",
            },
            shade: {
                primary: "",
                success: "",
                danger: "",
                gray: "",
                info: "",
                warning: "",
                accent: "",
            },
            size: {
                default: "h-10 gap-2 text-label-lg px-4",
                sm: "h-8 px-3 gap-1 text-label-md",
                lg: "h-12 gap-2 text-label-lg px-6",
                icon: "h-10 w-10",
            },
        },
        compoundVariants: [
            {
                variant: "solid",
                shade: "primary",
                className: "bg-primary hover:bg-primary-600",
            },
            {
                variant: "solid",
                shade: "success",
                className: "bg-success hover:bg-success-600",
            },
            {
                variant: "solid",
                shade: "info",
                className: "bg-info hover:bg-info-600",
            },
            {
                variant: "solid",
                shade: "danger",
                className: "bg-danger hover:bg-danger-600",
            },
            {
                variant: "solid",
                shade: "gray",
                className: "bg-gray !text-100 hover:bg-gray-600",
            },
            {
                variant: "solid",
                shade: "warning",
                className: "bg-warning hover:bg-warning-600",
            },
            {
                variant: "solid",
                shade: "accent",
                className: "bg-accent hover:bg-accent-600",
            },
            {
                variant: "translucent",
                shade: "primary",
                className: "bg-primary-translucent text-primary hover:bg-primary-100",
            },
            {
                variant: "translucent",
                shade: "success",
                className: "bg-success-translucent text-success hover:bg-success-100",
            },
            {
                variant: "translucent",
                shade: "danger",
                className: "bg-danger-translucent text-danger hover:bg-danger-100",
            },
            {
                variant: "translucent",
                shade: "gray",
                className: "bg-gray-translucent text-100 hover:bg-gray-100",
            },
            {
                variant: "translucent",
                shade: "info",
                className: "bg-info-translucent text-info hover:bg-info-100",
            },
            {
                variant: "translucent",
                shade: "warning",
                className: "bg-warning-translucent text-warning hover:bg-warning-100",
            },
            {
                variant: "translucent",
                shade: "accent",
                className: "bg-accent-translucent text-accent hover:bg-accent-100",
            },
            {
                variant: "outline",
                shade: "primary",
                className: "border-primary text-primary hover:bg-primary-translucent",
            },
            {
                variant: "outline",
                shade: "success",
                className: "border-success text-success hover:bg-success-translucent",
            },
            {
                variant: "outline",
                shade: "danger",
                className: "border-danger text-danger hover:bg-danger-translucent",
            },
            {
                variant: "outline",
                shade: "gray",
                className: "border-gray text-100 hover:bg-gray-translucent",
            },
            {
                variant: "outline",
                shade: "info",
                className: "border-info text-info hover:bg-info-translucent",
            },
            {
                variant: "outline",
                shade: "warning",
                className: "border-warning text-warning hover:bg-warning-translucent",
            },
            {
                variant: "outline",
                shade: "accent",
                className: "border-accent text-accent hover:bg-accent-translucent",
            },
            {
                variant: "subtle",
                shade: "primary",
                className: "text-primary hover:bg-primary-translucent",
            },
            {
                variant: "subtle",
                shade: "success",
                className: "text-success hover:bg-success-translucent",
            },
            {
                variant: "subtle",
                shade: "danger",
                className: "text-danger hover:bg-danger-translucent",
            },
            {
                variant: "subtle",
                shade: "gray",
                className: "text-100 hover:bg-gray-translucent",
            },
            {
                variant: "subtle",
                shade: "info",
                className: "text-info hover:bg-info-translucent",
            },
            {
                variant: "subtle",
                shade: "warning",
                className: "text-warning hover:bg-warning-translucent",
            },
            {
                variant: "subtle",
                shade: "accent",
                className: "text-accent hover:bg-accent-translucent",
            },
        ],
        defaultVariants: {
            variant: "solid",
            shade: "primary",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, shade, size, asChild = false, isLoading = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={`${buttonVariants({ variant, shade, size, className })}`}
                ref={ref}
                {...props}
            >
                {isLoading && <LoadingIcon />}
                {props.children}
            </Comp>
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
