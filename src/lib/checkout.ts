export type CheckoutStep = 'customer' | 'address' | 'payment' | 'review';

export type CheckoutCustomer = {
  name: string;
  email: string;
  phone: string;
  cpf?: string;
};

export type CheckoutAddress = {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
};

export type CheckoutPaymentMethod = 'card' | 'pix' | 'boleto';

export type CheckoutPaymentInfo = {
  method: CheckoutPaymentMethod;
  cardholderName?: string;
  cardLastDigits?: string;
};

export type CheckoutState = {
  step: CheckoutStep;
  customer: CheckoutCustomer;
  address: CheckoutAddress;
  payment: CheckoutPaymentInfo;
};

export const CHECKOUT_STEPS: CheckoutStep[] = [
  'customer',
  'address',
  'payment',
  'review',
];

export function createEmptyCheckoutState(): CheckoutState {
  return {
    step: 'customer',
    customer: {
      name: '',
      email: '',
      phone: '',
      cpf: '',
    },
    address: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      district: '',
      city: '',
      state: '',
    },
    payment: {
      method: 'card',
      cardholderName: '',
      cardLastDigits: '',
    },
  };
}
