import type { ReactNode } from 'react';

interface CheckoutFormFieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  description?: string;
  error?: string;
  children: ReactNode;
}

export function CheckoutFormField({
  label,
  htmlFor,
  required,
  description,
  error,
  children,
}: CheckoutFormFieldProps) {
  const isOptional = required === false;

  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-moss-900">
        {label}
        {isOptional && (
          <span className="ml-2 text-xs font-normal text-moss-500">
            Opcional
          </span>
        )}
      </label>
      {description && <p className="text-xs text-moss-500">{description}</p>}
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-xs font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
