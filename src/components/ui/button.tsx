import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-brand-600 text-white shadow-card hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-dune',
        secondary:
          'border border-border/80 bg-secondary text-secondary-foreground hover:border-brand-200 hover:bg-secondary/70 hover:text-foreground',
        outline:
          'border border-border/90 bg-card/60 text-foreground hover:border-brand-200 hover:bg-muted/30',
        ghost: 'text-muted-foreground hover:bg-muted/30 hover:text-foreground',
      },
      size: {
        default: 'px-6 py-3',
        icon: 'h-10 w-10',
        sm: 'px-4 py-2 text-xs',
        lg: 'px-8 py-3 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';
