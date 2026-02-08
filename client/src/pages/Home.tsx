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
      icon: Heart,
      title: "Complete Health Records",
      description:
        "Track vaccinations, vet visits, medications, and comprehensive medical history with intelligent automated reminders and alerts.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Activity,
      title: "Advanced Training Management",
      description:
        "Plan training sessions, log detailed progress, and track performance metrics with AI-powered analytics and insights.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Utensils,
      title: "Smart Feeding Schedules",
      description:
        "Create custom feeding plans with precision nutrition tracking, meal reminders, and dietary recommendations.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Calendar,
      title: "Integrated Calendar & Events",
      description:
        "Never miss appointments with smart scheduling, automatic notifications, and seamless calendar integration.",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: CloudSun,
      title: "AI Weather Intelligence",
      description:
        "Get real-time weather analysis and intelligent riding recommendations based on current and forecasted conditions.",
      color: "from-amber-500 to-yellow-500",
    },
    {
      icon: FileText,
      title: "Secure Document Vault",
      description:
        "Store all important papers, records, certificates, and documents in one encrypted, easily accessible location.",
      color: "from-indigo-500 to-blue-500",
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
        <div className="min-h-screen overflow-hidden">
          {/* Hero Section with Video Background */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="video-background"
                poster="/assets/hero-poster.jpg"
              >
                <source src="/videos/horses-background.mp4" type="video/mp4" />
              </video>
              <div className="video-overlay" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-accent/95" />
              <div
                className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"
                style={{ animationDelay: "0s" }}
              />
              <div
                className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
                style={{ animationDelay: "2s" }}
              />
              <div
                className="absolute top-1/3 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float"
                style={{ animationDelay: "4s" }}
              />
            </div>

            <div className="container relative z-10 pt-24 pb-16 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center fade-in-up">
                  <Badge className="mb-6 inline-flex items-center gap-2 px-6 py-2 text-base glass-strong pulse-glow">
                    <Sparkles className="w-5 h-5" />
                    14-Day Free Trial • No Credit Card Required
                  </Badge>
                  <div className="glass p-8 md:p-12 rounded-3xl mb-8">
                    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6 text-white drop-shadow-2xl">
                      Professional Horse
                      <br />
                      Management Made{" "}
                      <span className="relative inline-block">
                        <span className="relative z-10">Simple</span>
                        <span className="absolute bottom-2 left-0 w-full h-4 bg-white/30 -rotate-1 rounded" />
                      </span>
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-8 leading-relaxed max-w-4xl mx-auto drop-shadow-lg font-light">
                      The ultimate digital platform for horse owners, trainers,
                      and equestrian professionals. Track health, manage
                      training, and provide exceptional care—all in one
                      beautiful place.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                      <Button
                        size="lg"
                        className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90 shadow-2xl hover-lift group"
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
                      className="text-lg px-10 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm shadow-xl hover-lift group"
                      asChild
                    >
                      <Link href="/features">
                        <PlayCircle className="w-6 h-6 mr-2" />
                        Watch Demo
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Animated Stats Section */}
          <section
            ref={statsRef}
            className="py-20 bg-gradient-to-br from-background to-muted/30 relative overflow-hidden"
          >
            <div className="container px-4">
              <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                  {stats.map((stat, index) => (
                    <Card
                      key={index}
                      className="text-center p-8 glass-strong hover-lift hover-3d border-none"
                    >
                      <CardContent className="p-0">
                        <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                          {formatStatValue(
                            animatedStats[index].current,
                            stat.suffix,
                          )}
                          {stat.suffix}
                        </div>
                        <div className="text-sm md:text-base text-muted-foreground font-medium">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-24 bg-background relative">
            <div className="container px-4">
              <ScrollReveal className="text-center mb-16">
                <Badge className="mb-4 inline-flex items-center gap-2 px-4 py-2">
                  <Zap className="w-4 h-4" />
                  Powerful Features
                </Badge>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Everything You Need to Manage
                  <br />
                  <span className="text-primary">Your Equestrian Life</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  From health tracking to training logs, EquiProfile provides
                  comprehensive tools for modern horse management.
                </p>
              </ScrollReveal>
              <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <StaggerItem key={index}>
                      <Card className="h-full glass hover-lift hover-3d group cursor-pointer transition-all duration-300 border-none">
                        <CardHeader>
                          <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
                          >
                            <Icon className="w-full h-full text-white" />
                          </div>
                          <CardTitle className="text-2xl mb-2">
                            {feature.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base leading-relaxed">
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          </section>

          {/* Testimonials Carousel */}
          <section className="py-24 bg-gradient-to-br from-muted/50 to-background relative overflow-hidden">
            <div className="container px-4">
              <ScrollReveal className="text-center mb-16">
                <Badge className="mb-4 inline-flex items-center gap-2 px-4 py-2">
                  <Users className="w-4 h-4" />
                  Testimonials
                </Badge>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Loved by Horse Owners
                  <br />
                  <span className="text-primary">Around the World</span>
                </h2>
              </ScrollReveal>
              <div className="max-w-4xl mx-auto relative">
                <Card className="glass-strong p-8 md:p-12 border-none">
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
                    <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 text-foreground">
                      "{testimonials[activeTestimonial].content}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                        {testimonials[activeTestimonial].avatar}
                      </div>
                      <div>
                        <div className="font-bold text-lg">
                          {testimonials[activeTestimonial].name}
                        </div>
                        <div className="text-muted-foreground">
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
                      className={`carousel-dot ${
                        index === activeTestimonial
                          ? "bg-primary w-12"
                          : "bg-muted-foreground/30"
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
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 rounded-full glass-strong hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
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
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 rounded-full glass-strong hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </section>

          {/* Pricing Comparison */}
          <section className="py-24 bg-background relative">
            <div className="container px-4">
              <ScrollReveal className="text-center mb-16">
                <Badge className="mb-4 inline-flex items-center gap-2 px-4 py-2">
                  <TrendingUp className="w-4 h-4" />
                  Simple Pricing
                </Badge>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Choose Your Perfect Plan
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Start with a 14-day free trial. No credit card required.
                  Cancel anytime.
                </p>
              </ScrollReveal>
              <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {pricingTiers.map((tier, index) => (
                  <StaggerItem key={index}>
                    <Card
                      className={`h-full relative overflow-hidden ${
                        tier.highlighted
                          ? "glass-strong border-2 border-primary shadow-2xl hover-lift hover-3d"
                          : "glass hover-lift border-none"
                      }`}
                    >
                      {tier.highlighted && (
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-bold rounded-bl-lg">
                          POPULAR
                        </div>
                      )}
                      <CardHeader className="pb-8">
                        <CardTitle className="text-2xl mb-2">
                          {tier.name}
                        </CardTitle>
                        <div className="mb-4">
                          <span className="text-5xl font-bold">
                            {tier.price}
                          </span>
                          <span className="text-muted-foreground">
                            {tier.period}
                          </span>
                        </div>
                        <CardDescription className="text-base">
                          {tier.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4 mb-8">
                          {tier.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`w-full ${
                            tier.highlighted
                              ? "bg-primary hover:bg-primary/90"
                              : ""
                          }`}
                          variant={tier.highlighted ? "default" : "outline"}
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
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-24 bg-gradient-to-br from-muted/50 to-background">
            <div className="container px-4">
              <ScrollReveal className="text-center mb-16">
                <Badge className="mb-4 inline-flex items-center gap-2 px-4 py-2">
                  <Shield className="w-4 h-4" />
                  FAQ
                </Badge>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Everything you need to know about EquiProfile.
                </p>
              </ScrollReveal>
              <ScrollReveal>
                <div className="max-w-4xl mx-auto">
                  <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="glass border-none rounded-lg px-6 py-2"
                      >
                        <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent" />
            <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10" />
            <div
              className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "3s" }}
            />
            <div className="container px-4 relative z-10">
              <ScrollReveal>
                <div className="max-w-4xl mx-auto text-center glass-dark p-12 md:p-16 rounded-3xl">
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
                      className="text-lg px-12 py-7 bg-white text-primary hover:bg-white/90 shadow-2xl hover-lift group"
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
                      className="text-lg px-12 py-7 bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm shadow-xl hover-lift"
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
                </div>
              </ScrollReveal>
            </div>
          </section>
        </div>
      </PageTransition>
    </>
  );
}
