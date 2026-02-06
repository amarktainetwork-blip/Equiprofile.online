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
  Clock,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

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
    { value: 5000, label: "Active Users", suffix: "+" },
    { value: 15000, label: "Horses Managed", suffix: "+" },
    { value: 99.9, label: "Uptime", suffix: "%" },
    { value: 4.9, label: "User Rating", suffix: "/5" },
  ];

  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const observers = stats.map((stat, index) => {
      const element = document.getElementById(`stat-${index}`);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Animate the stat
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
              setAnimatedStats((prev) => {
                const newStats = [...prev];
                newStats[index] = current;
                return newStats;
              });
            }, duration / steps);

            // Disconnect after animating this specific stat
            observer.disconnect();
          }
        },
        { threshold: 0.5 },
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []); // Only run once on mount

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <MarketingNav />
      <PageTransition>
        <div className="min-h-screen overflow-hidden">
          {/* Hero Section with Video Background */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="video-background"
                poster="/assets/hero-poster.jpg"
              >
                {/* Fallback: We'll use a gradient background if video doesn't load */}
                <source src="/videos/horses-background.mp4" type="video/mp4" />
              </video>
              <div className="video-overlay" />

              {/* Animated gradient overlay as fallback */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent animate-gradient"
                style={{ opacity: 0.95 }}
              />

              {/* Floating particles */}
              <div
                className="absolute top-20 left-10 w-64 h-64 particle animate-float"
                style={{ animationDelay: "0s" }}
              />
              <div
                className="absolute bottom-20 right-10 w-96 h-96 particle animate-float"
                style={{ animationDelay: "2s" }}
              />
              <div
                className="absolute top-1/3 right-1/4 w-32 h-32 particle animate-float"
                style={{ animationDelay: "4s" }}
              />
            </div>

            <div className="container relative z-10 pt-24 pb-16">
              <div className="max-w-6xl mx-auto">
                {/* Hero Content */}
                <div
                  className="text-center mb-12"
                  style={{ animation: "fadeInUp 0.8s ease-out" }}
                >
                  <Badge className="mb-6 inline-flex items-center gap-2 px-6 py-2 text-base glass-strong animate-pulse-glow">
                    <Sparkles className="w-5 h-5" />
                    14-Day Free Trial • No Credit Card Required
                  </Badge>

                  <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-8 text-white drop-shadow-2xl">
                    Professional Horse
                    <br />
                    Management Made{" "}
                    <span className="relative inline-block">
                      <span className="relative z-10">Simple</span>
                      <span className="absolute bottom-2 left-0 w-full h-4 bg-white/30 -rotate-1 rounded" />
                    </span>
                  </h1>

                  <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-12 leading-relaxed max-w-4xl mx-auto drop-shadow-lg font-light">
                    The ultimate digital platform for horse owners, trainers,
                    and equestrian professionals. Track health, manage training,
                    and provide exceptional care—all in one beautiful place.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                    <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                      <Button
                        size="lg"
                        className="text-xl px-10 py-7 bg-white text-primary hover:bg-white/90 shadow-2xl hover:scale-105 transition-all duration-300 group"
                      >
                        {isAuthenticated
                          ? "Go to Dashboard"
                          : "Start Free Trial"}
                        <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/features">
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-xl px-10 py-7 glass-strong text-white border-white/30 hover:bg-white/20 shadow-xl group"
                      >
                        <PlayCircle className="w-6 h-6 mr-2" />
                        Watch Demo
                      </Button>
                    </Link>
                  </div>

                  <div className="flex flex-wrap justify-center items-center gap-8 text-white/90">
                    <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                      <Check className="w-5 h-5" />
                      <span className="text-base">No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                      <Check className="w-5 h-5" />
                      <span className="text-base">Cancel anytime</span>
                    </div>
                    <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                      <Check className="w-5 h-5" />
                      <span className="text-base">Free support included</span>
                    </div>
                    <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
                      <Shield className="w-5 h-5" />
                      <span className="text-base">Bank-level security</span>
                    </div>
                  </div>
                </div>

                {/* Hero Feature Cards */}
                <div
                  className="grid md:grid-cols-3 gap-6 mt-16"
                  style={{ animation: "fadeInUp 0.8s ease-out 0.3s both" }}
                >
                  <Card className="glass-strong hover-3d border-white/20 backdrop-blur-xl">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                          <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold">5K+</div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Active professionals worldwide
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="glass-strong hover-3d border-white/20 backdrop-blur-xl">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold">15K+</div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Horses managed daily
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="glass-strong hover-3d border-white/20 backdrop-blur-xl">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold">4.9★</div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Average user rating
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-white/50 rounded-full" />
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-20 bg-gradient-to-br from-muted/50 to-background">
            <div className="container">
              <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      id={`stat-${index}`}
                      className="text-center"
                    >
                      <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                        {animatedStats[index].toFixed(
                          stat.value % 1 === 0 ? 0 : 1,
                        )}
                        {stat.suffix}
                      </div>
                      <div className="text-base md:text-lg text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 lg:py-32 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl" />

            <div className="container relative z-10">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-20">
                  <Badge
                    className="mb-6 text-base px-6 py-2"
                    variant="secondary"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Powerful Features
                  </Badge>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    Everything You Need for{" "}
                    <span className="text-gradient">Complete Care</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                    From health tracking to AI-powered insights, EquiProfile
                    provides all the tools you need to keep your horses healthy,
                    happy, and performing at their absolute best.
                  </p>
                </div>
              </ScrollReveal>

              <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <StaggerItem key={index}>
                    <Card className="h-full card-hover group border-2 hover:border-primary/50 transition-all duration-300">
                      <CardHeader>
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl mb-3">
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
                ))}
              </Stagger>

              <ScrollReveal delay={0.3}>
                <div className="text-center mt-16">
                  <Link href="/features">
                    <Button
                      size="lg"
                      className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all group"
                    >
                      Explore All Features
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-24 lg:py-32 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
            <div className="container relative z-10">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <Badge
                    className="mb-6 text-base px-6 py-2"
                    variant="secondary"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Testimonials
                  </Badge>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    Loved by Equestrians Worldwide
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Join thousands of satisfied horse owners and professionals
                  </p>
                </div>
              </ScrollReveal>

              {/* Testimonial Carousel */}
              <div className="max-w-4xl mx-auto">
                <Card className="p-8 md:p-12 border-2 shadow-2xl">
                  <div className="flex gap-2 mb-6 justify-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <CardDescription className="text-xl md:text-2xl leading-relaxed text-center mb-8 text-foreground">
                    "{testimonials[activeTestimonial].content}"
                  </CardDescription>

                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold">
                      {testimonials[activeTestimonial].avatar}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-lg">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-muted-foreground">
                        {testimonials[activeTestimonial].role}
                      </div>
                    </div>
                  </div>

                  {/* Dots indicator */}
                  <div className="flex gap-2 justify-center mt-8">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === activeTestimonial
                            ? "bg-primary w-8"
                            : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                        }`}
                      />
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Pricing CTA */}
          <section className="py-24 lg:py-32">
            <div className="container">
              <ScrollReveal>
                <Card className="p-10 md:p-16 lg:p-20 bg-gradient-to-br from-primary via-primary to-accent text-white border-0 shadow-2xl relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                  <div className="text-center max-w-4xl mx-auto relative z-10">
                    <Badge className="mb-8 inline-flex items-center gap-2 px-6 py-3 text-base bg-white/20 text-white border-white/30">
                      <Clock className="w-5 h-5" />
                      Limited Time Offer
                    </Badge>

                    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                      Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl md:text-2xl text-white/95 mb-12 leading-relaxed">
                      Start with a 14-day free trial. Plans start at just
                      $9/month. No credit card required to get started. Cancel
                      anytime.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      <Link href="/pricing">
                        <Button
                          size="lg"
                          className="text-xl px-10 py-7 bg-white text-primary hover:bg-white/90 shadow-xl hover:scale-105 transition-all"
                        >
                          View Pricing Plans
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button
                          size="lg"
                          variant="outline"
                          className="text-xl px-10 py-7 border-white/30 text-white hover:bg-white/10"
                        >
                          Start Free Trial
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-24 lg:py-32 bg-gradient-to-br from-background via-muted/30 to-background">
            <div className="container">
              <ScrollReveal>
                <div className="text-center max-w-4xl mx-auto">
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                    Ready to Transform Your Horse Care?
                  </h2>
                  <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
                    Join thousands of horse owners who trust EquiProfile to
                    manage their equine companions. Start your free trial
                    today—no credit card required.
                  </p>
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="text-xl px-12 py-8 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all group"
                    >
                      Start Your Free Trial Now
                      <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <div className="mt-12 flex flex-wrap justify-center gap-12 text-sm text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Shield className="w-8 h-8 text-primary" />
                      <span>Secure & Encrypted</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-8 h-8 text-primary" />
                      <span>5000+ Users</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Award className="w-8 h-8 text-primary" />
                      <span>Award Winning</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Clock className="w-8 h-8 text-primary" />
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-16 lg:py-20 border-t bg-card">
            <div className="container">
              <div className="grid md:grid-cols-4 gap-12 mb-12">
                <div className="md:col-span-2">
                  <div className="text-3xl font-bold font-serif mb-6">
                    <span className="text-gradient">EquiProfile</span>
                  </div>
                  <p className="text-muted-foreground text-base mb-6 max-w-md">
                    Professional horse management platform for the modern
                    equestrian. Trusted by thousands of horse owners worldwide.
                  </p>
                  <div className="flex gap-4">
                    <Badge variant="secondary" className="px-4 py-2">
                      <Shield className="w-4 h-4 mr-2" />
                      Secure
                    </Badge>
                    <Badge variant="secondary" className="px-4 py-2">
                      <Award className="w-4 h-4 mr-2" />
                      Award Winning
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-6">Product</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>
                      <Link href="/features">
                        <a className="hover:text-foreground transition-colors hover:underline">
                          Features
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing">
                        <a className="hover:text-foreground transition-colors hover:underline">
                          Pricing
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard">
                        <a className="hover:text-foreground transition-colors hover:underline">
                          Dashboard
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/about">
                        <a className="hover:text-foreground transition-colors hover:underline">
                          About Us
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-6">Support</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>
                      <Link href="/contact">
                        <a className="hover:text-foreground transition-colors hover:underline">
                          Contact
                        </a>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-foreground transition-colors hover:underline"
                      >
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-foreground transition-colors hover:underline"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="hover:text-foreground transition-colors hover:underline"
                      >
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                <p>
                  © {new Date().getFullYear()} EquiProfile. Part of{" "}
                  <a
                    href="https://www.amarktai.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-semibold hover:text-primary transition-colors underline"
                    aria-label="Amarktai Network (opens in new tab)"
                  >
                    Amarktai Network
                  </a>
                  . All rights reserved.
                </p>
                <div className="flex gap-6">
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </a>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms
                  </a>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Cookies
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </PageTransition>
    </>
  );
}
