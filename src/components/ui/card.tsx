import * as React from "react"

import { cn } from "@/lib/utils"
import {Title} from "@radix-ui/react-toast";
import {cva, VariantProps} from "class-variance-authority";

const descriptionVariants = cva(
    "",
    {
      variants: {
        variant:{
          100:"text-100",
          200:'text-200',
          300:"text-300",
          primary:"text-primary",
          info:"text-info",
          success:"text-success",
          warning:"text-warning",
          danger:"text-danger",
          accent:"text-accent"
        },
        size: {
          lg: "text-body-lg",
          md: "text-body-md",
          sm: "text-body-sm",
        },
      },
      defaultVariants: {
        size: "lg",
        variant: 200,
      },
    }
);

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement>,VariantProps<typeof descriptionVariants>{}

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg bg-card",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col md:px-6 p-4", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <Title
    ref={ref}
    className={`text-title-lg font-semibold text-100 ${className}`}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className,size,variant, ...props }, ref) => {
  return <p
    ref={ref}
    className={descriptionVariants({size,variant,className})}
    {...props}
  />
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("md:px-6 p-4", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center px-6 py-4", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
