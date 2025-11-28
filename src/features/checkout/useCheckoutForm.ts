'use client';

import { useCallback, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type FieldPath,
  type Resolver,
  useForm,
  type UseFormReturn,
} from 'react-hook-form';

import {
  CHECKOUT_STEPS,
  createEmptyCheckoutState,
  type CheckoutState,
  type CheckoutStep,
} from '@/lib/checkout';

import { checkoutFormSchema, type CheckoutFormValues } from './schema';

const STEP_FIELDS: Record<CheckoutStep, FieldPath<CheckoutFormValues>[]> = {
  customer: [
    'customer.name',
    'customer.email',
    'customer.phone',
    'customer.cpf',
  ],
  address: [
    'address.cep',
    'address.street',
    'address.number',
    'address.complement',
    'address.district',
    'address.city',
    'address.state',
  ],
  payment: [
    'payment.method',
    'payment.cardholderName',
    'payment.cardLastDigits',
  ],
  review: [],
};

export type ReviewStatus = 'idle' | 'loading' | 'success';

const STEP_INDEX: Record<CheckoutStep, number> = CHECKOUT_STEPS.reduce(
  (acc, step, index) => ({ ...acc, [step]: index }),
  {} as Record<CheckoutStep, number>,
);

const DEFAULT_VALUES = createEmptyCheckoutState();

const mergeDefaults = (
  initial?: Partial<CheckoutState>,
): CheckoutFormValues => ({
  customer: {
    name: initial?.customer?.name ?? DEFAULT_VALUES.customer.name,
    email: initial?.customer?.email ?? DEFAULT_VALUES.customer.email,
    phone: initial?.customer?.phone ?? DEFAULT_VALUES.customer.phone,
    cpf: initial?.customer?.cpf ?? DEFAULT_VALUES.customer.cpf ?? '',
  },
  address: {
    cep: initial?.address?.cep ?? DEFAULT_VALUES.address.cep,
    street: initial?.address?.street ?? DEFAULT_VALUES.address.street,
    number: initial?.address?.number ?? DEFAULT_VALUES.address.number,
    complement:
      initial?.address?.complement ?? DEFAULT_VALUES.address.complement ?? '',
    district: initial?.address?.district ?? DEFAULT_VALUES.address.district,
    city: initial?.address?.city ?? DEFAULT_VALUES.address.city,
    state: initial?.address?.state ?? DEFAULT_VALUES.address.state,
  },
  payment: {
    method: initial?.payment?.method ?? DEFAULT_VALUES.payment.method,
    cardholderName:
      initial?.payment?.cardholderName ??
      DEFAULT_VALUES.payment.cardholderName ??
      '',
    cardLastDigits:
      initial?.payment?.cardLastDigits ??
      DEFAULT_VALUES.payment.cardLastDigits ??
      '',
  },
});

export type CheckoutFormApi = {
  form: UseFormReturn<CheckoutFormValues>;
  currentStep: CheckoutStep;
  isFirstStep: boolean;
  isLastStep: boolean;
  stepIndex: number;
  goToStep: (step: CheckoutStep) => void;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  reviewStatus: ReviewStatus;
  confirmOrder: (action: () => Promise<void>) => Promise<void>;
  resetReviewStatus: () => void;
};

export function useCheckoutForm(
  initialState?: Partial<CheckoutState>,
): CheckoutFormApi {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('customer');
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>('idle');

  const resolver = zodResolver(
    checkoutFormSchema,
  ) as unknown as Resolver<CheckoutFormValues>;

  const form = useForm<CheckoutFormValues>({
    resolver,
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: mergeDefaults(initialState),
  });

  const goToStep = useCallback((step: CheckoutStep) => {
    if (CHECKOUT_STEPS.includes(step)) {
      setCurrentStep(step);
    }
  }, []);

  const handleNext = useCallback(async () => {
    const currentIndex = STEP_INDEX[currentStep];
    const fields = STEP_FIELDS[currentStep];
    const isValid = fields.length
      ? await form.trigger(fields, { shouldFocus: true })
      : true;

    if (!isValid) {
      return;
    }

    const nextStep = CHECKOUT_STEPS[currentIndex + 1];
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  }, [currentStep, form]);

  const handleBack = useCallback(() => {
    const currentIndex = STEP_INDEX[currentStep];
    const previousStep = CHECKOUT_STEPS[currentIndex - 1];
    if (previousStep) {
      setCurrentStep(previousStep);
    }
  }, [currentStep]);

  const confirmOrder = useCallback(
    async (action: () => Promise<void>) => {
      if (reviewStatus === 'loading') {
        return;
      }

      const isValid = await form.trigger(undefined, { shouldFocus: true });
      if (!isValid) {
        setCurrentStep('customer');
        return;
      }

      setReviewStatus('loading');
      try {
        await action();
        setReviewStatus('success');
      } catch (error) {
        setReviewStatus('idle');
        throw error;
      }
    },
    [form, reviewStatus],
  );

  const resetReviewStatus = useCallback(() => setReviewStatus('idle'), []);

  const api = useMemo<CheckoutFormApi>(() => {
    const stepIndex = STEP_INDEX[currentStep];
    return {
      form,
      currentStep,
      isFirstStep: stepIndex === 0,
      isLastStep: currentStep === 'review',
      stepIndex,
      goToStep,
      handleNext,
      handleBack,
      reviewStatus,
      confirmOrder,
      resetReviewStatus,
    };
  }, [
    confirmOrder,
    currentStep,
    form,
    goToStep,
    handleBack,
    handleNext,
    resetReviewStatus,
    reviewStatus,
  ]);

  return api;
}
