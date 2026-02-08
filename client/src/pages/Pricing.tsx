import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Loader2, Clock, XCircle } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { marketingAssets } from "@/config/marketingAssets";
import { MarketingNav } from "@/components/MarketingNav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { PageBanner } from "@/components/PageBanner";

const YEARLY_SAVINGS_PERCENTAGE = 17;
const BASIC_MONTHLY_PRICE = "10.00";
const BASIC_YEARLY_PRICE = "100.00";
const STABLE_MONTHLY_PRICE = "30.00";
const STABLE_YEARLY_PRICE = "300.00";

export default function Pricing() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const { data: pricing } = trpc.billing.getPricing.useQuery();
  const { data: subscriptionStatus } = trpc.billing.getStatus.useQuery(
    undefined,
    {
      enabled: !!user,
    },
  );
  const createCheckout = trpc.billing.createCheckout.useMutation();
  const createPortal = trpc.billing.createPortal.useMutation();

  // Check for URL parameters (success/cancelled)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      toast.success("Subscription activated!", {
        description:
          "Welcome to EquiProfile Pro. Your subscription is now active.",
      });
    } else if (params.get("cancelled") === "true") {
      toast.error("Checkout cancelled", {
        description: "No charges were made. You can try again anytime.",
      });
    }
  }, []);

  const handleSubscribe = async (plan: "monthly" | "yearly") => {
    if (!user) {
      setLocation("/");
      toast.error("Authentication required", {
        description: "Please sign in to subscribe.",
      });
      return;
    }

    setLoadingPlan(plan);
    try {
      const result = await createCheckout.mutateAsync({ plan });
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "Failed to create checkout session",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleManageBilling = async () => {
    try {
      const result = await createPortal.mutateAsync();
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "Failed to open billing portal",
      });
    }
  };

  const features = {
    free: [
      "7-day free trial",
      "Up to 3 horses",
      "Basic health records",
      "Training session logging",
      "1GB document storage",
      "Email support",
    ],
    pro: [
      "Unlimited horses",
      "Complete health tracking",
      "Advanced training logs",
      "Competition results",
      "10GB document storage",
      "AI weather analysis (50/day)",
      "Email reminders",
      "Mobile app access",
      "Export to CSV/PDF",
    ],
    stable: [
      "Everything in Pro, plus:",
      "Unlimited horses",
      "Unlimited team members",
      "Role-based permissions",
      "Stable management",
      "100GB document storage",
      "Unlimited AI weather",
      "Advanced analytics",
      "Priority email support",
      "Phone support",
      "Dedicated account manager (yearly)",
    ],
  };

  const isCurrentPlan = (plan: string) => {
    if (!subscriptionStatus) return false;
    if (plan === "trial") return subscriptionStatus.status === "trial";
    if (plan === "pro")
      return (
        subscriptionStatus.plan === "monthly" ||
        subscriptionStatus.plan === "yearly"
      );
    if (plan === "stable")
      return (
        (subscriptionStatus.plan as string) === "stable_monthly" ||
        (subscriptionStatus.plan as string) === "stable_yearly"
      );
    return false;
  };

  const hasActiveSubscription = subscriptionStatus?.status === "active";

  const getProPlanPrice = () => {
    if (billingPeriod === "monthly") {
      return pricing?.monthly?.amount
        ? (pricing.monthly.amount / 100).toFixed(2)
        : BASIC_MONTHLY_PRICE;
    }
    return pricing?.yearly?.amount
      ? (pricing.yearly.amount / 100).toFixed(2)
      : BASIC_YEARLY_PRICE;
  };

  const pricingPlans = [
    {
      name: "Free Trial",
      plan: "trial",
      description: "Perfect for getting started",
      price: "0",
      period: "/7 days",
      features: features.free,
      image: marketingAssets.pricing.planBasic,
      popular: false,
    },
    {
      name: "Pro",
      plan: "pro",
      description: "For individual horse owners",
      price: getProPlanPrice(),
      period: billingPeriod === "monthly" ? "/month" : "/year",
      yearlyPrice: pricing?.yearly?.amount
        ? (pricing.yearly.amount / 100).toFixed(2)
        : BASIC_YEARLY_PRICE,
      monthlySavings: true,
      features: features.pro,
      image: marketingAssets.pricing.planPro,
      popular: true,
    },
    {
      name: "Stable",
      plan: "stable",
      description: "For professional operations",
      price:
        billingPeriod === "monthly"
          ? STABLE_MONTHLY_PRICE
          : STABLE_YEARLY_PRICE,
      period: billingPeriod === "monthly" ? "/month" : "/year",
      yearlyPrice: STABLE_YEARLY_PRICE,
      monthlySavings: true,
      features: features.stable,
      image: marketingAssets.pricing.planEnterprise,
      popular: false,
    },
  ];

  return (
    <>
      <MarketingNav />
      <PageTransition>
        <PageBanner
          title="Pricing"
          subtitle="Professional equine management for every need"
          imageSrc="/images/riding-lesson.jpg"
          imagePosition="center"
        />
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
          <div className="container mx-auto px-4 py-16">
            {/* Top 3 Blocks - What's included, Free trial, Cancel anytime */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 hover:border-white/30 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">What's Included</h3>
                  <p className="text-gray-400 text-sm">
                    All plans include unlimited updates, priority support, and access to all core features
                  </p>
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 hover:border-white/30 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">7-Day Free Trial</h3>
                  <p className="text-gray-400 text-sm">
                    Try EquiProfile risk-free with full access to Pro features for 7 days
                  </p>
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 hover:border-white/30 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center mb-4">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Cancel Anytime</h3>
                  <p className="text-gray-400 text-sm">
                    No long-term contracts. Cancel or change your plan anytime with no hidden fees
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Billing Period Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">
                Choose Your{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
                  Perfect Plan
                </span>
              </h2>

              {/* Billing Period Toggle */}
              <motion.div
                className="mt-8 inline-flex items-center gap-4 bg-black/40 backdrop-blur-md rounded-full p-2 border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <button
                  onClick={() => setBillingPeriod("monthly")}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    billingPeriod === "monthly"
                      ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod("yearly")}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    billingPeriod === "yearly"
                      ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Yearly
                  <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                    Save {YEARLY_SAVINGS_PERCENTAGE}%
                  </span>
                </button>
              </motion.div>
            </motion.div>

            {/* Current Subscription Alert */}
            {hasActiveSubscription && subscriptionStatus && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Alert className="mb-8 max-w-3xl mx-auto bg-black/40 backdrop-blur-md border-white/10 text-white">
                  <AlertDescription className="flex items-center justify-between">
                    <span>
                      Your current plan:{" "}
                      <strong className="capitalize text-cyan-400">
                        {subscriptionStatus.plan}
                      </strong>
                      {subscriptionStatus.status === "active" && " (Active)"}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleManageBilling}
                      className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white border-0 hover:from-indigo-600 hover:to-cyan-600"
                    >
                      Manage Billing
                    </Button>
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((planData, index) => {
                const isCurrentPlanActive = isCurrentPlan(planData.plan);

                return (
                  <motion.div
                    key={planData.plan}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="relative flex"
                  >
                    {planData.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                          Most Popular
                        </span>
                      </div>
                    )}

                    {/* Card uses flex column for equal-height layout:
                        - Card and CardContent use flex-grow to expand
                        - CardFooter uses mt-auto to stick to bottom
                        This ensures all cards have same height with footer aligned */}
                    <Card
                      className={`
                    flex flex-col w-full bg-black/40 backdrop-blur-md border-white/10 
                    hover:border-white/30 transition-all duration-300
                    ${planData.popular ? "border-2 border-indigo-500/50 shadow-xl shadow-indigo-500/20" : ""}
                    ${isCurrentPlanActive ? "ring-2 ring-cyan-400/50" : ""}
                    overflow-hidden group
                  `}
                    >
                      {/* Image */}
                      <div className="h-40 overflow-hidden bg-gradient-to-br from-indigo-900/20 to-cyan-900/20 relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <img
                          src={planData.image}
                          alt={planData.name}
                          className="w-full h-full object-contain p-8 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                        />
                      </div>

                      <CardHeader>
                        <CardTitle className="text-white text-2xl">
                          {planData.name}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {planData.description}
                        </CardDescription>
                        <div className="mt-4">
                          <span className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
                            £{planData.price}
                          </span>
                          <span className="text-gray-400 text-lg">
                            {planData.period}
                          </span>
                        </div>
                        {planData.monthlySavings &&
                          billingPeriod === "yearly" && (
                            <p className="text-sm text-gray-400 mt-2">
                              <span className="text-green-400 font-semibold">
                                Save {YEARLY_SAVINGS_PERCENTAGE}% with yearly
                                billing
                              </span>
                            </p>
                          )}
                      </CardHeader>

                      <CardContent className="flex-grow">
                        <ul className="space-y-3">
                          {planData.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-300">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>

                      <CardFooter className="flex-col gap-2 mt-auto">
                        {isCurrentPlanActive ? (
                          <>
                            <Button
                              className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white border-0"
                              disabled
                            >
                              Current Plan
                            </Button>
                            {planData.plan === "pro" && (
                              <Button
                                className="w-full bg-black/60 backdrop-blur-sm border border-white/20 text-white hover:bg-white/10"
                                onClick={handleManageBilling}
                              >
                                Manage Subscription
                              </Button>
                            )}
                          </>
                        ) : planData.plan === "trial" ? (
                          <Button
                            className="w-full bg-black/60 backdrop-blur-sm border border-white/20 text-white hover:bg-white/10"
                            onClick={() => setLocation("/dashboard")}
                          >
                            Get Started
                          </Button>
                        ) : planData.plan === "pro" ? (
                          <Button
                            className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white border-0 hover:from-indigo-600 hover:to-cyan-600 shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
                            onClick={() => handleSubscribe(billingPeriod)}
                            disabled={loadingPlan === billingPeriod}
                          >
                            {loadingPlan === billingPeriod ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                Subscribe{" "}
                                {billingPeriod === "monthly"
                                  ? "Monthly"
                                  : "Yearly"}
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button 
                            className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white border-0 hover:from-indigo-600 hover:to-cyan-600 shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
                            onClick={() => handleSubscribe(billingPeriod)}
                            disabled={loadingPlan === billingPeriod}
                          >
                            {loadingPlan === billingPeriod ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                Subscribe{" "}
                                {billingPeriod === "monthly"
                                  ? "Monthly"
                                  : "Yearly"}
                              </>
                            )}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* FAQ Section */}
            <motion.div
              className="mt-24 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-white">
                Frequently Asked{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
                  Questions
                </span>
              </h2>
              <div className="max-w-3xl mx-auto text-left grid md:grid-cols-2 gap-6">
                {[
                  {
                    question: "Can I cancel anytime?",
                    answer:
                      "Yes! You can cancel your subscription at any time. Your access continues until the end of your billing period.",
                  },
                  {
                    question: "What happens after the free trial?",
                    answer:
                      "Your account becomes read-only. You can upgrade to a paid plan anytime to regain full access.",
                  },
                  {
                    question: "Can I switch plans?",
                    answer:
                      "Yes! You can upgrade or downgrade your plan at any time. Changes are prorated automatically.",
                  },
                  {
                    question: "What payment methods do you accept?",
                    answer:
                      "We accept all major credit cards via Stripe. Your payment information is securely processed and never stored on our servers.",
                  },
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-6 hover:border-white/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="font-semibold mb-2 text-white">
                      {faq.question}
                    </h3>
                    <p className="text-gray-400 text-sm">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
