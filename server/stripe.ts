import Stripe from "stripe";
import { ENV } from "./_core/env";
import { TRPCError } from "@trpc/server";

// Check if Stripe is enabled
function checkStripeEnabled() {
  if (!ENV.enableStripe) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "Billing is disabled",
    });
  }
}

// Initialize Stripe with API key from environment
export function getStripe(): Stripe | null {
  if (!ENV.enableStripe) {
    console.warn("[Stripe] Billing feature is disabled");
    return null;
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("[Stripe] Secret key not configured");
    return null;
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-01-28.clover",
    typescript: true,
  });
}

// Pricing configuration (should match Stripe dashboard)
// This is the SINGLE SOURCE OF TRUTH for all pricing
export const PRICING_PLANS = {
  trial: {
    name: "Free Trial",
    horses: 1,
    price: 0,
    currency: "gbp",
    interval: "trial",
    duration: 7, // days
    features: [
      "7-day free trial",
      "1 horse only",
      "ALL features enabled",
      "Basic health records",
      "Training session logging",
      "Secure storage",
      "Email support",
    ],
  },
  pro: {
    name: "Pro",
    horses: 5,
    monthly: {
      priceId: process.env.STRIPE_MONTHLY_PRICE_ID || "",
      amount: 799, // £7.99 in pence
      currency: "gbp",
      interval: "month" as const,
    },
    yearly: {
      priceId: process.env.STRIPE_YEARLY_PRICE_ID || "",
      amount: 7990, // £79.90 in pence (equivalent to ~£6.66/month)
      currency: "gbp",
      interval: "year" as const,
    },
    features: [
      "Up to 5 horses",
      "Complete health tracking",
      "Advanced training logs",
      "Competition results",
      "Secure storage",
      "AI weather analysis (50/day)",
      "Email reminders",
      "Export to CSV/PDF",
    ],
  },
  stable: {
    name: "Stable",
    horses: 20,
    monthly: {
      priceId: process.env.STRIPE_STABLE_MONTHLY_PRICE_ID || "",
      amount: 3000, // £30.00 in pence
      currency: "gbp",
      interval: "month" as const,
    },
    yearly: {
      priceId: process.env.STRIPE_STABLE_YEARLY_PRICE_ID || "",
      amount: 30000, // £300.00 in pence (equivalent to £25/month)
      currency: "gbp",
      interval: "year" as const,
    },
    features: [
      "Everything in Pro, plus:",
      "Up to 20 horses",
      "Unlimited team members",
      "Role-based permissions",
      "Stable management",
      "Secure storage",
      "Unlimited AI weather",
      "Advanced analytics",
      "Priority email support",
      "WhatsApp support",
    ],
  },
} as const;

// Legacy export for backward compatibility
export const STRIPE_PRICING = {
  monthly: PRICING_PLANS.pro.monthly,
  yearly: PRICING_PLANS.pro.yearly,
};

// Create checkout session
export async function createCheckoutSession(
  userId: number,
  userEmail: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string,
  customerId?: string,
): Promise<{ sessionId: string; url: string } | null> {
  checkStripeEnabled();

  const stripe = getStripe();
  if (!stripe) return null;

  try {
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId.toString(),
      },
      customer_email: customerId ? undefined : userEmail,
      allow_promotion_codes: true,
    };

    if (customerId) {
      sessionParams.customer = customerId;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return {
      sessionId: session.id,
      url: session.url!,
    };
  } catch (error) {
    console.error("[Stripe] Failed to create checkout session:", error);
    return null;
  }
}

// Create customer portal session
export async function createPortalSession(
  customerId: string,
  returnUrl: string,
): Promise<string | null> {
  checkStripeEnabled();

  const stripe = getStripe();
  if (!stripe) return null;

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return session.url;
  } catch (error) {
    console.error("[Stripe] Failed to create portal session:", error);
    return null;
  }
}

// Get subscription details
export async function getSubscription(
  subscriptionId: string,
): Promise<Stripe.Subscription | null> {
  const stripe = getStripe();
  if (!stripe) return null;

  try {
    return await stripe.subscriptions.retrieve(subscriptionId);
  } catch (error) {
    console.error("[Stripe] Failed to retrieve subscription:", error);
    return null;
  }
}

// Cancel subscription at period end
export async function cancelSubscription(
  subscriptionId: string,
): Promise<boolean> {
  const stripe = getStripe();
  if (!stripe) return false;

  try {
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    return true;
  } catch (error) {
    console.error("[Stripe] Failed to cancel subscription:", error);
    return false;
  }
}

// Reactivate cancelled subscription
export async function reactivateSubscription(
  subscriptionId: string,
): Promise<boolean> {
  const stripe = getStripe();
  if (!stripe) return false;

  try {
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });
    return true;
  } catch (error) {
    console.error("[Stripe] Failed to reactivate subscription:", error);
    return false;
  }
}
