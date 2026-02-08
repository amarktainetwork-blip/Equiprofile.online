import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MarketingNav } from "@/components/MarketingNav";
import { PageTransition } from "@/components/PageTransition";
import { ScrollReveal, Stagger, StaggerItem } from "@/components/ScrollReveal";
import { Link } from "wouter";
import {
  Heart,
  Calendar,
  CloudSun,
  FileText,
  Check,
  ChevronRight,
  Sparkles,
  Activity,
  Utensils,
  Star,
  Shield,
  Zap,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  PlayCircle,
  ChevronLeft,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { marketingAssets } from "@/config/marketingAssets";
import { motion } from "framer-motion";

const TESTIMONIAL_ROTATION_INTERVAL = 6000;

function formatStatValue(value: number, suffix: string): string {
  if (suffix === "★" || suffix === "%") {
    return value.toFixed(1);
  }
  return Math.floor(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const features = [
    {
      icon: marketingAssets.features.iconSpeed,
      title: "Lightning Fast Performance",
      description:
        "Experience blazing-fast load times and real-time updates. Our optimized infrastructure ensures your data is always accessible instantly.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      icon: marketingAssets.features.iconAnalytics,
      title: "Advanced Analytics",
      description:
        "Gain deep insights with powerful analytics and reporting tools. Track progress, identify trends, and make data-driven decisions.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: marketingAssets.features.iconAutomation,
      title: "Smart Automation",
      description:
        "Automate routine tasks and workflows. Set up intelligent reminders, notifications, and scheduled actions effortlessly.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: marketingAssets.features.iconSecurity,
      title: "Enterprise Security",
      description:
        "Bank-level encryption and security protocols. Your data is protected with industry-leading security measures and compliance.",
      gradient: "from-red-500 to-pink-500",
    },
    {
      icon: marketingAssets.features.iconIntegrations,
      title: "Seamless Integrations",
      description:
        "Connect with your favorite tools and services. Our extensive integration library makes your workflow seamless.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: marketingAssets.features.iconSupport,
      title: "24/7 Expert Support",
      description:
        "Get help when you need it. Our dedicated support team is available around the clock to assist you.",
      gradient: "from-violet-500 to-purple-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Professional Dressage Rider",
      content:
        "EquiProfile has completely revolutionized how I manage my horses. The health tracking and intelligent reminders have been absolutely invaluable for maintaining peak performance!",
      rating: 5,
      avatar: "ST",
    },
    {
      name: "Michael Chen",
      role: "Stable Manager - 25+ Horses",
      content:
        "Managing a large stable used to be overwhelming. EquiProfile makes it simple, organized, and efficient. The time savings alone have been incredible. Highly recommend!",
      rating: 5,
      avatar: "MC",
    },
    {
      name: "Emma Rodriguez",
      role: "Eventing Trainer & Coach",
      content:
        "The training logs and analytics are phenomenal. I can see progress clearly, identify areas for improvement, and share detailed updates with clients easily. Game-changing!",
      rating: 5,
      avatar: "ER",
    },
  ];

  const stats = [
    { value: 2500, label: "Active Users", suffix: "+" },
    { value: 8000, label: "Horses", suffix: "+" },
    { value: 99.9, label: "Uptime", suffix: "%" },
    { value: 4.8, label: "Rating", suffix: "★" },
  ];

  const pricingTiers = [
    {
      name: "Hobby",
      price: "$9",
      period: "/month",
      description: "Perfect for individual horse owners",
      features: [
        "Up to 3 horses",
        "Health & vaccination tracking",
        "Basic training logs",
        "Document storage (1GB)",
        "Mobile app access",
        "Email support",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Ideal for trainers and small stables",
      features: [
        "Up to 15 horses",
        "Advanced analytics",
        "Custom training templates",
        "Document storage (10GB)",
        "Priority support",
        "Client portal access",
        "Calendar integration",
        "Automated reminders",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large stables and organizations",
      features: [
        "Unlimited horses",
        "White-label options",
        "API access",
        "Unlimited storage",
        "24/7 phone support",
        "Custom integrations",
        "Multi-location support",
        "Dedicated account manager",
      ],
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: "How does the 14-day free trial work?",
      answer:
        "Start using EquiProfile immediately with full access to all features. No credit card required. After 14 days, choose a plan that fits your needs or continue with our free tier for up to 1 horse.",
    },
    {
      question: "Can I manage multiple horses?",
      answer:
        "Absolutely! Our plans support anywhere from 3 horses on the Hobby plan to unlimited horses on the Enterprise plan. Each horse gets its own complete profile with health records, training logs, and more.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes! We use bank-level encryption (AES-256) for all data. Your information is stored securely in the cloud with automatic backups. We're GDPR compliant and never share your data with third parties.",
    },
    {
      question: "Can I access EquiProfile on mobile?",
      answer:
        "Yes! EquiProfile works seamlessly on all devices - desktop, tablet, and mobile. Our responsive design ensures you have full access to your horses' information anywhere, anytime.",
    },
    {
      question: "What happens if I cancel my subscription?",
      answer:
        "You can cancel anytime. Your data remains accessible in read-only mode for 30 days, giving you time to export everything. We also offer a free tier to keep managing one horse if you'd like to continue.",
    },
    {
      question: "Do you offer training or onboarding?",
      answer:
        "Yes! All new users get access to our comprehensive video tutorials and help center. Professional and Enterprise plans include personalized onboarding sessions with our team.",
    },
  ];

  const [animatedStats, setAnimatedStats] = useState(
    stats.map(() => ({ current: 0, hasAnimated: false })),
  );
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat, index) => {
              setAnimatedStats((prev) => {
                if (prev[index].hasAnimated) return prev;

                const duration = 2000;
                const steps = 60;
                const increment = stat.value / steps;
                let current = 0;

                const interval = setInterval(() => {
                  current += increment;
                  if (current >= stat.value) {
                    current = stat.value;
                    clearInterval(interval);
                  }
                  setAnimatedStats((prevStats) => {
                    const newStats = [...prevStats];
                    newStats[index] = { current, hasAnimated: true };
                    return newStats;
                  });
                }, duration / steps);

                return prev;
              });
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, TESTIMONIAL_ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <>
      <MarketingNav />
      <PageTransition>
        <div className="min-h-screen overflow-hidden bg-black">
          {/* Hero Section with Video Background */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={marketingAssets.hero.video} type="video/mp4" />
              </video>
              {/* Black Transparent Overlay */}
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Hero Content */}
            <div className="container relative z-10 pt-24 pb-16 px-4">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <Badge className="mb-6 inline-flex items-center gap-2 px-6 py-2 text-base bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20">
                    <Sparkles className="w-5 h-5" />
                    14-Day Free Trial • No Credit Card Required
                  </Badge>
                  
                  <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6 text-white drop-shadow-2xl">
                    Professional Horse
                    <br />
                    Management Made{" "}
                    <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      Simple
                    </span>
                  </h1>
                  
                  <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-10 leading-relaxed max-w-4xl mx-auto drop-shadow-lg">
                    The ultimate digital platform for horse owners, trainers,
                    and equestrian professionals. Track health, manage
                    training, and provide exceptional care—all in one
                    beautiful place.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                      <Button
                        size="lg"
                        className="text-lg px-10 py-6 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white shadow-2xl hover:scale-105 transition-transform group border-0"
                      >
                        {isAuthenticated
                          ? "Go to Dashboard"
                          : "Start Free Trial"}
                        <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-10 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-md shadow-xl hover:scale-105 transition-transform group"
                      asChild
                    >
                      <Link href="/features">
                        <PlayCircle className="w-6 h-6 mr-2" />
                        Watch Demo
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Animated Stats Section */}
          <section
            ref={statsRef}
            className="py-20 bg-gray-900 relative overflow-hidden"
          >
            <div className="container px-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="text-center p-8 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                          {formatStatValue(
                            animatedStats[index].current,
                            stat.suffix,
                          )}
                          {stat.suffix}
                        </div>
                        <div className="text-sm md:text-base text-white/70 font-medium">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-24 bg-black relative">
            <div className="container px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <Badge className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <Zap className="w-4 h-4" />
                  Powerful Features
                </Badge>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                  Everything You Need to Manage
                  <br />
                  <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    Your Equestrian Life
                  </span>
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  From health tracking to training logs, EquiProfile provides
                  comprehensive tools for modern horse management.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 group cursor-pointer">
                      <CardHeader>
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
                        >
                          <img src={feature.icon} alt="" className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-2xl mb-2 text-white">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base leading-relaxed text-white/70">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Carousel */}
          <section className="py-24 bg-gray-900 relative overflow-hidden">
            <div className="container px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <Badge className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <Users className="w-4 h-4" />
                  Testimonials
                </Badge>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                  Loved by Horse Owners
                  <br />
                  <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    Around the World
                  </span>
                </h2>
              </motion.div>
              
              <div className="max-w-4xl mx-auto relative">
                <Card className="bg-white/5 backdrop-blur-md border-white/10 p-8 md:p-12">
                  <CardContent className="p-0">
                    <div className="mb-6 flex gap-1">
                      {[...Array(testimonials[activeTestimonial].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                          />
                        ),
                      )}
                    </div>
                    <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 text-white">
                      "{testimonials[activeTestimonial].content}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                        {testimonials[activeTestimonial].avatar}
                      </div>
                      <div>
                        <div className="font-bold text-lg text-white">
                          {testimonials[activeTestimonial].name}
                        </div>
                        <div className="text-white/70">
                          {testimonials[activeTestimonial].role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-center gap-3 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeTestimonial
                          ? "bg-gradient-to-r from-indigo-500 to-cyan-500 w-12"
                          : "bg-white/30 w-2"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() =>
                    setActiveTestimonial(
                      (prev) =>
                        (prev - 1 + testimonials.length) % testimonials.length,
                    )
                  }
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 text-white"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setActiveTestimonial(
                      (prev) => (prev + 1) % testimonials.length,
                    )
                  }
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 rounded-full bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 text-white"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </section>

          {/* Pricing Comparison */}
          <section className="py-24 bg-black relative">
            <div className="container px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <Badge className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <TrendingUp className="w-4 h-4" />
                  Simple Pricing
                </Badge>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                  Choose Your Perfect Plan
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  Start with a 14-day free trial. No credit card required.
                  Cancel anytime.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {pricingTiers.map((tier, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      className={`h-full relative overflow-hidden ${
                        tier.highlighted
                          ? "bg-white/10 backdrop-blur-md border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 scale-105"
                          : "bg-white/5 backdrop-blur-md border-white/10"
                      } hover:scale-105 transition-all duration-300`}
                    >
                      {tier.highlighted && (
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                          POPULAR
                        </div>
                      )}
                      <CardHeader className="pb-8">
                        <CardTitle className="text-2xl mb-2 text-white">
                          {tier.name}
                        </CardTitle>
                        <div className="mb-4">
                          <span className="text-5xl font-bold text-white">
                            {tier.price}
                          </span>
                          <span className="text-white/70">
                            {tier.period}
                          </span>
                        </div>
                        <CardDescription className="text-base text-white/70">
                          {tier.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4 mb-8">
                          {tier.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-white/90">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`w-full ${
                            tier.highlighted
                              ? "bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white border-0"
                              : "bg-white/10 hover:bg-white/20 text-white border-white/30"
                          }`}
                          size="lg"
                          asChild
                        >
                          <Link href="/register">
                            Get Started
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-24 bg-gray-900">
            <div className="container px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <Badge className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border-white/20 text-white">
                  <Shield className="w-4 h-4" />
                  FAQ
                </Badge>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  Everything you need to know about EquiProfile.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-white/5 backdrop-blur-md border-white/10 rounded-lg px-6 py-2 hover:bg-white/10 transition-all"
                    >
                      <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline text-white">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-white/70 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600" />
            <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10" />
            <div className="container px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center bg-black/20 backdrop-blur-md border border-white/20 p-12 md:p-16 rounded-3xl"
              >
                <Award className="w-20 h-20 text-white mx-auto mb-8" />
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Ready to Transform Your
                  <br />
                  Horse Management?
                </h2>
                <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
                  Join thousands of equestrians who trust EquiProfile to care
                  for their horses. Start your free 14-day trial today—no
                  credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    size="lg"
                    className="text-lg px-12 py-7 bg-white text-indigo-600 hover:bg-white/90 shadow-2xl hover:scale-105 transition-transform group border-0"
                    asChild
                  >
                    <Link href="/register">
                      Start Free Trial
                      <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-12 py-7 bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-md shadow-xl hover:scale-105 transition-transform"
                    asChild
                  >
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </div>
                <div className="mt-12 flex items-center justify-center gap-8 text-white/80 text-sm flex-wrap">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>No credit card</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>14-day trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </PageTransition>
    </>
  );
}
