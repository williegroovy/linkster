import { Stripe, loadStripe } from '@stripe/stripe-js';
import { env } from "~/env";

const createStripeClient = () => loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const globalForStripe = globalThis as unknown as {
   stripe: Promise<Stripe | null> | undefined;
};

export const stripe = globalForStripe.stripe ?? createStripeClient();

if (env.NODE_ENV !== "production") globalForStripe.stripe = stripe;
