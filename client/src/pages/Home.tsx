import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Heart,
      title: "Comprehensive Health Records",
      description: "Meticulous tracking of vaccinations, veterinary visits, medications, and complete medical histories with intelligent reminders.",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Activity,
      title: "Advanced Training Analytics",
      description: "Sophisticated session planning, progress logging, and performance analysis with data-driven insights.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Utensils,
      title: "Premium Nutrition Management",
      description: "Create custom feeding plans with nutrition tracking, meal reminders, and dietary optimization.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Calendar,
      title: "Intelligent Scheduling",
      description: "Never miss appointments with integrated scheduling, automated notifications, and smart calendar management.",
      gradient: "from-purple-500 to-violet-500"
    },
    {
      icon: CloudSun,
      title: "AI Weather Analysis",
      description: "Get intelligent riding recommendations based on real-time weather conditions with geolocation support.",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: FileText,
      title: "Secure Document Vault",
      description: "Securely store all important papers, records, and certificates in one encrypted, accessible place.",
      gradient: "from-slate-500 to-gray-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Dressage Rider",
      content: "EquiProfile has completely transformed how I manage my horses. The health tracking and reminders have been invaluable!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Stable Manager",
      content: "Managing 20+ horses used to be overwhelming. EquiProfile makes it simple and organized. Highly recommend!",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Eventing Trainer",
      content: "The training logs and analytics are fantastic. I can see progress clearly and share updates with clients easily.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "5,000+", label: "Active Users" },
    { value: "15,000+", label: "Horses Managed" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9/5", label: "User Rating" },
  ];

  return (
    <>
      <MarketingNav />
      <PageTransition>
        <div className="min-h-screen">
          {/* Hero Section with Premium Design */}
          <section className="relative pt-24 lg:pt-32 pb-20 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
            {/* Animated gradient background */}
            <div className="absolute inset-0">
              {/* Primary gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/95 to-slate-800" />
              
              {/* Animated shapes */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" 
                   style={{ animationDuration: '8s' }} />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" 
                   style={{ animationDuration: '10s', animationDelay: '2s' }} />
              
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10"
                   style={{
                     backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                     backgroundSize: '40px 40px'
                   }} />
              
              {/* Image overlay for texture */}
              <img 
                src="/images/hero-horse.jpg" 
                alt="Professional equestrian management" 
                className="w-full h-full object-cover opacity-5 mix-blend-overlay"
                loading="eager"
              />
            </div>
            
            <div className="container relative z-20">
              <div className="max-w-4xl mx-auto text-center">
                {/* Premium badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Badge className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span className="text-sm font-medium">Premium Equestrian Management Platform</span>
                  </Badge>
                </motion.div>
                
                {/* Main heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white"
                >
                  Elevate Your
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Equestrian Excellence
                  </span>
                </motion.h1>
                
                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-3xl mx-auto"
                >
                  The sophisticated digital companion for discerning horse owners. 
                  Comprehensive health tracking, training management, and premium care coordination.
                </motion.p>
                
                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                >
                  <Link href={isAuthenticated ? "/dashboard" : "/register"}>
                    <Button size="lg" className="text-lg px-8 py-6 bg-white text-gray-900 hover:bg-gray-100">
                      {isAuthenticated ? "Enter Dashboard" : "Begin Your 14-Day Trial"}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/features">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                    >
                      Discover Features
                    </Button>
                  </Link>
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-300"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>No Credit Card Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Full Access Trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Cancel Anytime</span>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-2 bg-white/50 rounded-full"
                />
              </div>
            </motion.div>
          </section>

          {/* Stats Section */}
          <section className="py-12 border-y bg-muted/30">
            <div className="container">
              <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm md:text-base text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 lg:py-32">
            <div className="container">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <Badge className="mb-4" variant="secondary">Features</Badge>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Everything You Need for{" "}
                    <span className="text-gradient">Complete Care</span>
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    From health tracking to AI-powered insights, EquiProfile provides all the tools 
                    you need to keep your horses healthy, happy, and performing their best.
                  </p>
                </div>
              </ScrollReveal>

              <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <StaggerItem key={index}>
                    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 h-full">
                      <CardHeader>
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                          <feature.icon className="w-7 h-7 text-white" />
                        </div>
                        <CardTitle className="text-xl font-serif">{feature.title}</CardTitle>
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
                <div className="text-center mt-12">
                  <Link href="/features">
                    <Button size="lg" variant="outline">
                      View All Features
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 lg:py-32 bg-muted/30">
            <div className="container">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <Badge className="mb-4" variant="secondary">Testimonials</Badge>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    Loved by Horse Owners Worldwide
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    See what our community has to say about EquiProfile
                  </p>
                </div>
              </ScrollReveal>

              <Stagger className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <StaggerItem key={index}>
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                          ))}
                        </div>
                        <CardDescription className="text-base leading-relaxed">
                          "{testimonial.content}"
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>

          {/* Pricing CTA */}
          <section className="py-20 lg:py-32">
            <div className="container">
              <ScrollReveal>
                <Card className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2">
                  <div className="text-center max-w-3xl mx-auto">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                      Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                      Start with a 14-day free trial. Plans start at just $9/month. 
                      No credit card required to get started.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link href="/pricing">
                        <Button size="lg" className="text-lg w-full sm:w-auto">
                          View Pricing
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button size="lg" variant="outline" className="text-lg w-full sm:w-auto">
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
          <section className="py-20 lg:py-32 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
            <div className="container">
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                    Ready to Transform Your Horse Care?
                  </h2>
                  <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                    Join thousands of horse owners who trust EquiProfile to manage their equine companions. 
                    Start your free trial today—no credit card required.
                  </p>
                  <Link href="/register">
                    <Button size="lg" className="bg-background text-foreground hover:bg-background/90 text-lg">
                      Start Your Free Trial
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 lg:py-16 border-t bg-card">
            <div className="container">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                  <div className="text-2xl font-bold font-serif mb-4">
                    <span className="text-gradient">EquiProfile</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Professional horse management for the modern equestrian.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Product</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/features"><a className="hover:text-foreground transition-colors">Features</a></Link></li>
                    <li><Link href="/pricing"><a className="hover:text-foreground transition-colors">Pricing</a></Link></li>
                    <li><Link href="/dashboard"><a className="hover:text-foreground transition-colors">Dashboard</a></Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/about"><a className="hover:text-foreground transition-colors">About</a></Link></li>
                    <li><Link href="/contact"><a className="hover:text-foreground transition-colors">Contact</a></Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t pt-8 text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} EquiProfile. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </PageTransition>
    </>
  );
}
