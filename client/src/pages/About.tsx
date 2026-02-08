import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/MarketingNav";
import { PageTransition } from "@/components/PageTransition";
import { marketingAssets } from "@/config/marketingAssets";
import { Heart, Target, Users, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const values = [
  {
    icon: Heart,
    title: "Horse-First Philosophy",
    description:
      "Every feature we build is designed with the well-being and care of horses as our top priority.",
  },
  {
    icon: Target,
    title: "Simplicity & Efficiency",
    description:
      "We believe powerful software should be intuitive. No complicated workflows or endless training required.",
  },
  {
    icon: Users,
    title: "Community-Driven",
    description:
      "We listen to our users and actively incorporate feedback to continuously improve the platform.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "We leverage cutting-edge technology like AI to provide insights and automation that save you time.",
  },
];

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUpVariants}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <>
      <MarketingNav />
      <PageTransition>
        <div className="min-h-screen bg-black relative overflow-hidden">
          {/* Background Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-black to-cyan-950/30 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 pt-24 pb-16">
            {/* Hero Section */}
            <section className="container mx-auto px-4 mb-20">
              <AnimatedSection>
                <div className="text-center max-w-3xl mx-auto">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 text-white">
                    About <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">EquiProfile</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-300">
                    We're on a mission to revolutionize horse management with
                    technology that empowers horse owners, trainers, and
                    equestrian professionals.
                  </p>
                </div>
              </AnimatedSection>
            </section>

            {/* Mission Section */}
            <section className="container mx-auto px-4 mb-20">
              <AnimatedSection>
                <div className="relative max-w-6xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-3xl blur-3xl" />
                  <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_50px_rgba(99,102,241,0.3)] group">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                          Our Mission
                        </h2>
                        <p className="text-lg text-gray-300 mb-6">
                          To provide horse owners and equestrian professionals with a
                          comprehensive, easy-to-use platform that centralizes horse
                          management, improves care quality, and enhances the bond
                          between horses and their caretakers.
                        </p>
                        <p className="text-lg text-gray-300">
                          We believe that better data leads to better decisions, and
                          better decisions lead to happier, healthier horses. That's
                          why we've built EquiProfile—to give you the tools and
                          insights you need to provide exceptional care.
                        </p>
                      </div>
                      <div className="relative aspect-square rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 p-4 hover:border-white/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20" />
                        <img 
                          src={marketingAssets.about.mission} 
                          alt="Our Mission"
                          className="relative z-10 w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </section>

            {/* Story Section */}
            <section className="container mx-auto px-4 mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <AnimatedSection>
                  <div className="relative aspect-square rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 p-4 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20" />
                    <img 
                      src={marketingAssets.about.team} 
                      alt="Our Team"
                      className="relative z-10 w-full h-full object-contain"
                    />
                  </div>
                </AnimatedSection>

                <AnimatedSection>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      Our Story
                    </h2>
                    <div className="space-y-4 text-gray-300">
                      <p>
                        EquiProfile was born from a simple frustration: managing
                        horse information shouldn't be complicated. As horse
                        owners ourselves, we experienced firsthand the challenge
                        of juggling paper records, spreadsheets, and multiple
                        apps.
                      </p>
                      <p>
                        We knew there had to be a better way—a single platform
                        that could handle everything from health records to
                        training logs, from feeding schedules to competition
                        results. So we built it.
                      </p>
                      <p>
                        Today, EquiProfile serves thousands of horse owners,
                        trainers, and stable managers worldwide. We're proud to be
                        part of the equestrian community and committed to
                        continuously improving our platform based on your
                        feedback.
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </section>

            {/* Values Section */}
            <section className="container mx-auto px-4 mb-20">
              <AnimatedSection>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold font-serif bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                    Our Values
                  </h2>
                  <div className="flex justify-center">
                    <div className="relative w-64 h-64 rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 p-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20" />
                      <img 
                        src={marketingAssets.about.values} 
                        alt="Our Values"
                        className="relative z-10 w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
              >
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUpVariants}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 h-full text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                      <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-cyan-400 mb-4 group-hover:from-indigo-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                        <value.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white">
                        {value.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4">
              <AnimatedSection>
                <div className="relative max-w-4xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
                  <div className="relative backdrop-blur-md bg-white/5 border-2 border-white/20 rounded-3xl p-8 md:p-12 hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_60px_rgba(99,102,241,0.4)]">
                    <div className="text-center max-w-2xl mx-auto">
                      <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        Join Our Community
                      </h2>
                      <p className="text-lg text-gray-300 mb-8">
                        Be part of a growing community of horse enthusiasts who are
                        transforming the way they manage their equine companions.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/register">
                          <Button 
                            size="lg" 
                            className="text-lg bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 border-0 shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all duration-300 w-full sm:w-auto"
                          >
                            Get Started Free
                          </Button>
                        </Link>
                        <Link href="/contact">
                          <Button 
                            size="lg" 
                            variant="outline" 
                            className="text-lg border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto"
                          >
                            Contact Us
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </section>
          </div>
        </div>
      </PageTransition>
    </>
  );
}
