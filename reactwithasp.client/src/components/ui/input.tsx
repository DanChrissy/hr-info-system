import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: any;
  containerClass?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, containerClass, ...props }, ref) => {
    return (
      <div className={cn('flex items-center justify-between rounded-md border relative', containerClass)}>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
          )}
          ref={ref}
          {...props}
        />
        {icon && <div className="absolute right-4 cursor-pointer">{icon}</div>}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
