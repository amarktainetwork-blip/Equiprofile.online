import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/MarketingNav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { PageBanner } from "@/components/PageBanner";
import { marketingAssets } from "@/config/marketingAssets";
import { Heart, Target, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
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

          {/* Page Banner */}
          <PageBanner
            title="About EquiProfile"
            subtitle="We're on a mission to revolutionize horse management with technology that empowers horse owners, trainers, and equestrian professionals."
            imageSrc="/images/hero-horse.jpg"
          />

          <div className="relative z-10 py-16">
            {/* Our Story Section */}
            <section className="container mx-auto px-4 mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                <AnimatedSection>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20" />
                    <img
                      src="/images/gallery/11.jpg"
                      alt="Our Story"
                      className="relative z-10 w-full h-full object-cover"
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
                        trainers, and stable managers worldwide. We're proud to
                        be part of the equestrian community and committed to
                        continuously improving our platform based on your
                        feedback.
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
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
                          To provide horse owners and equestrian professionals
                          with a comprehensive, easy-to-use platform that
                          centralizes horse management, improves care quality,
                          and enhances the bond between horses and their
                          caretakers.
                        </p>
                        <p className="text-lg text-gray-300">
                          We believe that better data leads to better decisions,
                          and better decisions lead to happier, healthier
                          horses. That's why we've built EquiProfile—to give you
                          the tools and insights you need to provide exceptional
                          care.
                        </p>
                      </div>
                      <div className="relative aspect-square rounded-2xl overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 p-4 hover:border-white/20 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20" />
                        <img
                          src="/images/gallery/19.jpg"
                          alt="Our Mission"
                          className="relative z-10 w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </section>

            {/* Feature CTA Block - Replace Values */}
            <section className="container mx-auto px-4 mb-20">
              <AnimatedSection>
                <div className="relative max-w-4xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-cyan-600/30 rounded-3xl blur-3xl" />
                  <div className="relative backdrop-blur-md bg-white/5 border-2 border-white/20 rounded-3xl p-8 md:p-12 hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_60px_rgba(99,102,241,0.4)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                        <img
                          src="/images/gallery/17.jpg"
                          alt="AI-Powered Analytics"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 mb-4">
                          <Sparkles className="w-5 h-5 text-indigo-400" />
                          <span className="text-indigo-300 font-medium">
                            Powered by AI
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-white">
                          Smart Training Insights
                        </h3>
                        <p className="text-lg text-gray-300 mb-6">
                          Get AI-powered analytics on your horse's training
                          progress, health patterns, and performance trends.
                          Make data-driven decisions for optimal care.
                        </p>
                        <Link href="/features">
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white group"
                          >
                            Explore Features
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </section>

            {/* Final CTA Section */}
            <section className="container mx-auto px-4">
              <AnimatedSection>
                <div className="relative max-w-4xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-3xl blur-3xl" />
                  <div className="relative backdrop-blur-md bg-white/5 border-2 border-white/20 rounded-3xl p-8 md:p-12 hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_60px_rgba(99,102,241,0.4)]">
                    <div className="text-center">
                      <Heart className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
                      <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-white">
                        Join Our Community
                      </h2>
                      <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Thousands of equestrians trust EquiProfile to manage
                        their horses. Start your free trial today and experience
                        the difference.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white"
                          >
                            Start Free Trial
                          </Button>
                        </Link>
                        <Link href="/contact">
                          <Button
                            size="lg"
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10"
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
      <Footer />
    </>
  );
}
