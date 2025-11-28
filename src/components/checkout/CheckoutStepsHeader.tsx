'use client';

import { CHECKOUT_STEPS, type CheckoutStep } from '@/lib/checkout';
import { cn } from '@/lib/utils';

const STEP_LABELS: Record<CheckoutStep, { title: string; subtitle: string }> = {
  customer: { title: 'Dados', subtitle: 'Quem compra' },
  address: { title: 'Endereço', subtitle: 'Entrega' },
  payment: { title: 'Pagamento', subtitle: 'Preferência' },
  review: { title: 'Revisão', subtitle: 'Confirmação' },
};

type CheckoutStepsHeaderProps = {
  currentStep: CheckoutStep;
  onStepChange?: (step: CheckoutStep) => void;
};

export function CheckoutStepsHeader({
  currentStep,
  onStepChange,
}: CheckoutStepsHeaderProps) {
  const currentIndex = CHECKOUT_STEPS.indexOf(currentStep);

  return (
    <ol
      className="flex flex-wrap items-center gap-4"
      aria-label="Progresso do checkout"
    >
      {CHECKOUT_STEPS.map((step, index) => {
        const isActive = step === currentStep;
        const isComplete = index < currentIndex;
        const { title, subtitle } = STEP_LABELS[step];
        const canNavigate = Boolean(onStepChange) && index <= currentIndex;

        return (
          <li key={step} className="flex-1 min-w-[150px]">
            <button
              type="button"
              disabled={!canNavigate}
              onClick={canNavigate ? () => onStepChange?.(step) : undefined}
              aria-current={isActive ? 'step' : undefined}
              className={cn(
                'flex h-14 w-full items-center gap-3 rounded-2xl border px-4 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400',
                isActive && 'border-brand-400 bg-brand-50/80 shadow-card',
                isComplete && !isActive && 'border-brand-300 bg-white',
                !isActive &&
                  !isComplete &&
                  'border-sand-200 bg-white/90 text-moss-500',
                !canNavigate && 'cursor-default',
              )}
            >
              <span
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold',
                  isActive || isComplete
                    ? 'bg-brand-600 text-white'
                    : 'bg-sand-100 text-moss-500',
                )}
              >
                {index + 1}
              </span>
              <span className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-moss-500">
                  {subtitle}
                </span>
                <span className="text-sm font-semibold text-moss-900">
                  {title}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
