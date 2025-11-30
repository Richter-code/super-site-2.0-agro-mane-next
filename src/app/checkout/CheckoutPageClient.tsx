'use client';

import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from 'react';

import { CheckoutAddressForm } from '@/components/checkout/CheckoutAddressForm';
import { CheckoutCustomerForm } from '@/components/checkout/CheckoutCustomerForm';
import { CheckoutPaymentForm } from '@/components/checkout/CheckoutPaymentForm';
import { CheckoutReviewSection } from '@/components/checkout/CheckoutReviewSection';
import { CheckoutStepsHeader } from '@/components/checkout/CheckoutStepsHeader';
import { CartSummary } from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';
import { CHECKOUT_STEPS, type CheckoutStep } from '@/lib/checkout';
import { useCheckoutForm } from '@/features/checkout/useCheckoutForm';
import { useCart } from '@/features/cart/CartProvider';

const STEP_COPY: Record<
  CheckoutStep,
  { title: string; description: string; cta: string }
> = {
  customer: {
    title: 'Dados do cliente',
    description: 'Quem recebe e como podemos avisar sobre o pedido.',
    cta: 'Continuar para endereço',
  },
  address: {
    title: 'Endereço de entrega',
    description: 'Onde entregaremos seus produtos fresquinhos.',
    cta: 'Avançar para pagamento',
  },
  payment: {
    title: 'Pagamento',
    description: 'Selecione o método preferido (cartão, Pix ou boleto).',
    cta: 'Revisar pedido',
  },
  review: {
    title: 'Revisão final',
    description: 'Confirme os dados antes de finalizar.',
    cta: 'Confirmar pedido',
  },
};

type CheckoutPageClientProps = {
  stripeEnabled: boolean;
};

export function CheckoutPageClient({ stripeEnabled }: CheckoutPageClientProps) {
  const items = useCart((state) => state.items);
  const subtotal = useCart((state) => state.subtotal);
  const stepContainerRef = useRef<HTMLDivElement>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const cartIsEmpty = items.length === 0;

  const {
    form,
    currentStep,
    goToStep,
    handleNext,
    handleBack,
    isFirstStep,
    reviewStatus,
    confirmOrder,
    resetReviewStatus,
  } = useCheckoutForm();

  useEffect(() => {
    if (stepContainerRef.current) {
      stepContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep !== 'review') {
      if (reviewStatus !== 'idle') {
        resetReviewStatus();
      }
      if (checkoutError) {
        setCheckoutError(null);
      }
    }
  }, [checkoutError, currentStep, reviewStatus, resetReviewStatus]);

  const handleStepChange = (nextStep: CheckoutStep) => {
    const targetIndex = CHECKOUT_STEPS.indexOf(nextStep);
    const currentIndex = CHECKOUT_STEPS.indexOf(currentStep);
    if (targetIndex <= currentIndex) {
      goToStep(nextStep);
    }
  };

  const handlePrimaryAction = async () => {
    if (currentStep === 'review') {
      return;
    }
    setIsAdvancing(true);
    try {
      await handleNext();
    } finally {
      setIsAdvancing(false);
    }
  };

  const handleSubmitCheckout = useCallback(async () => {
    if (!stripeEnabled) {
      setCheckoutError(
        'Checkout em modo sandbox – nenhum pagamento real será processado neste ambiente.',
      );
      return;
    }

    try {
      await confirmOrder(async () => {
        setCheckoutError(null);
        const values = form.getValues();
        const payload = {
          customer: values.customer,
          address: values.address,
          payment: values.payment,
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        };

        const response = await fetch('/api/checkout/create-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const parsed = (await response.json().catch(() => ({}))) as {
          url?: string;
          error?: string;
        };
        if (!response.ok) {
          throw new Error(
            parsed.error ?? 'Não foi possível iniciar o pagamento.',
          );
        }

        if (!parsed.url) {
          throw new Error('Stripe não retornou a URL de checkout.');
        }

        window.location.href = parsed.url;
      });
    } catch (error) {
      console.error('Erro ao iniciar pagamento', error);
      setCheckoutError(
        error instanceof Error
          ? error.message
          : 'Não foi possível iniciar o pagamento.',
      );
    }
  }, [confirmOrder, form, items, stripeEnabled]);

  const handleStepSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentStep === 'review') {
      void handleSubmitCheckout();
    } else {
      void handlePrimaryAction();
    }
  };

  if (cartIsEmpty) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-moss-100 bg-white/90 p-10 text-center text-moss-600">
        <p className="text-2xl font-semibold text-moss-900">
          Seu carrinho está vazio
        </p>
        <p className="max-w-md text-sm">
          Adicione produtos para avançar no checkout.
        </p>
        <Button asChild size="lg" className="focus-ring">
          <Link href="/produtos">Explorar produtos</Link>
        </Button>
      </div>
    );
  }

  const currentCopy = STEP_COPY[currentStep];
  const shouldShowAsideSummary = currentStep !== 'review';
  const primaryLabel = currentCopy.cta;
  const stripeDisabled = !stripeEnabled;
  const primaryDisabled = isAdvancing || (stripeDisabled && currentStep === 'review');

  return (
    <div
      className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
      role="region"
      aria-live="polite"
    >
      <div className="space-y-8" ref={stepContainerRef}>
        {stripeDisabled && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            Checkout em modo sandbox – nenhum pagamento real será processado neste ambiente.
          </div>
        )}
        <CheckoutStepsHeader
          currentStep={currentStep}
          onStepChange={handleStepChange}
        />

        <StepCard
          title={currentCopy.title}
          description={currentCopy.description}
        >
          {checkoutError && (
            <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
              <p>{checkoutError}</p>
              <p className="mt-1 text-xs text-destructive/80">
                Revise a conexão ou tente novamente em instantes. Nenhuma cobrança foi realizada.
              </p>
            </div>
          )}
          <form onSubmit={handleStepSubmit} className="space-y-6">
            {renderStep({
              step: currentStep,
              form,
              reviewStatus,
              onEditStep: goToStep,
              onSubmitCheckout: handleSubmitCheckout,
              errorMessage: checkoutError,
            })}

            {currentStep !== 'review' && (
              <div className="mt-4 flex flex-wrap gap-3">
                {!isFirstStep && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBack}
                    className="focus-ring"
                  >
                    Voltar
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={isAdvancing}
                  className="focus-ring"
                >
                  {isAdvancing ? 'Processando...' : primaryLabel}
                </Button>
              </div>
            )}
          </form>
        </StepCard>
      </div>

      {shouldShowAsideSummary && (
        <CartSummary
          subtotal={subtotal}
          ctaLabel={
            stripeDisabled
              ? 'Pagamento desativado'
              : isAdvancing
                ? 'Validando...'
                : primaryLabel
          }
          onCheckout={handlePrimaryAction}
          ctaDisabled={primaryDisabled || stripeDisabled}
          headingLevel="h2"
          ctaAriaLabel="Avançar para a próxima etapa do checkout"
        />
      )}
    </div>
  );
}

type CheckoutFormApi = ReturnType<typeof useCheckoutForm>;

function renderStep({
  step,
  form,
  reviewStatus,
  onEditStep,
  onSubmitCheckout,
  errorMessage,
}: {
  step: CheckoutStep;
  form: CheckoutFormApi['form'];
  reviewStatus: CheckoutFormApi['reviewStatus'];
  onEditStep: (step: CheckoutStep) => void;
  onSubmitCheckout: () => Promise<void>;
  errorMessage: string | null;
}) {
  switch (step) {
    case 'customer':
      return <CheckoutCustomerForm form={form} />;
    case 'address':
      return <CheckoutAddressForm form={form} />;
    case 'payment':
      return <CheckoutPaymentForm form={form} />;
    case 'review':
      return (
        <CheckoutReviewSection
          values={form.getValues()}
          status={reviewStatus}
          onConfirm={onSubmitCheckout}
          onEditStep={onEditStep}
          errorMessage={errorMessage}
        />
      );
    default:
      return null;
  }
}

function StepCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      className="space-y-6 rounded-3xl border border-sand-100 bg-white/95 p-6 shadow-card"
      aria-label={title}
    >
      <div>
        <h2 className="text-2xl font-semibold text-moss-900">{title}</h2>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-moss-500">
          {description}
        </p>
      </div>
      <div>{children}</div>
    </section>
  );
}
