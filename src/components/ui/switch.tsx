"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const switchRootVariants = cva(
  "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      side: {
        right:
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        both: "bg-primary",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

const switchThumbVariants = cva(
  "pointer-events-none block size-4 rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-px",
  {
    variants: {
      side: {
        right:
          "dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground",
        both: "bg-primary-foreground",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

function Switch({
  className,
  side,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchRootVariants> &
  VariantProps<typeof switchThumbVariants>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchRootVariants({ side, className }))}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(switchThumbVariants({ side }))}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
