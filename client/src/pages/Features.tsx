import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/MarketingNav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { featuresRegistry } from "@/config/featuresRegistry";
import { motion } from "framer-motion";
import { Link } from "wouter";
import * as Icons from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

// Helper function to get icon component
const getIcon = (iconName?: string) => {
  if (!iconName) return Icons.Sparkles;
  const IconComponent = (Icons as any)[iconName];
  return IconComponent || Icons.Sparkles;
};

export default function Features() {
  return (
    <>
      <MarketingNav />
      <PageTransition>
        <div className="min-h-screen bg-black text-white">
          {/* Hero Section */}
          <section className="container mx-auto px-4 pt-32 pb-16 min-[320px]:px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Powerful Features for Modern Horse Management
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10">
                Everything you need to manage your horses efficiently, all in
                one place
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Icons.CheckCircle2 className="w-5 h-5 text-green-400" />
                  {featuresRegistry.length} Feature Categories
                </span>
                <span className="flex items-center gap-2">
                  <Icons.Sparkles className="w-5 h-5 text-purple-400" />
                  {featuresRegistry.reduce((acc, cat) => acc + cat.features.length, 0)}+ Features
                </span>
              </div>
            </motion.div>
          </section>

          {/* Features by Category */}
          <section className="container mx-auto px-4 pb-20 min-[320px]:px-4 space-y-24">
            {featuresRegistry.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={categoryVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Category Header */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {category.category}
                  </h2>
                  <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    {category.description}
                  </p>
                </div>

                {/* Features Grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="grid grid-cols-1 min-[640px]:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {category.features.map((feature, featureIndex) => {
                    const Icon = getIcon(feature.icon);
                    return (
                      <motion.div
                        key={featureIndex}
                        variants={itemVariants}
                        whileHover={{ scale: 1.03, y: -5 }}
                        className="group relative"
                      >
                        {/* Glow Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-75 blur transition duration-500"></div>

                        {/* Glass Card */}
                        <div className="relative h-full p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
                          {/* Icon */}
                          <div className="mb-4 relative w-12 h-12 flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all"></div>
                            <Icon className="relative w-6 h-6 text-indigo-400 group-hover:text-purple-400 transition-colors" />
                          </div>

                          {/* Content */}
                          <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            {feature.description}
                          </p>

                          {/* Accent Line */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            ))}
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-4 pb-20 min-[320px]:px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative max-w-4xl mx-auto"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl opacity-50 blur-2xl"></div>

              {/* Glass Card */}
              <div className="relative p-12 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/20">
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Ready to Get Started?
                  </h2>
                  <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                    Join thousands of horse owners who trust EquiProfile for
                    their equine management needs.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/register">
                      <Button
                        size="lg"
                        className="text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0"
                      >
                        Get Started Free
                      </Button>
                    </Link>
                    <Link href="/pricing">
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-lg bg-white/5 border-white/20 hover:bg-white/10 text-white"
                      >
                        View Pricing
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
