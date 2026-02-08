import { Button } from "@/components/ui/button";
import { MarketingNav } from "@/components/MarketingNav";
import { PageTransition } from "@/components/PageTransition";
import { marketingAssets } from "@/config/marketingAssets";
import { motion } from "framer-motion";
import { Link } from "wouter";

const features = [
  {
    icon: marketingAssets.features.iconSpeed,
    title: "Lightning Fast Performance",
    description:
      "Experience blazing-fast load times and instant synchronization across all your devices. Built for speed and reliability.",
  },
  {
    icon: marketingAssets.features.iconAnalytics,
    title: "Advanced Analytics & Insights",
    description:
      "Get deep insights into your horse's health, training progress, and performance with powerful analytics tools.",
  },
  {
    icon: marketingAssets.features.iconAutomation,
    title: "Smart Automation & Reminders",
    description:
      "Never miss important tasks with intelligent automation. Set up custom reminders for vet visits, training, and more.",
  },
  {
    icon: marketingAssets.features.iconSecurity,
    title: "Bank-Level Security",
    description:
      "Your data is protected with enterprise-grade encryption and security protocols. Your information stays safe and private.",
  },
  {
    icon: marketingAssets.features.iconIntegrations,
    title: "Seamless Integrations",
    description:
      "Connect with your favorite tools and services. Export data, sync calendars, and integrate with third-party apps effortlessly.",
  },
  {
    icon: marketingAssets.features.iconSupport,
    title: "24/7 Premium Support",
    description:
      "Get help whenever you need it with our dedicated support team. Available around the clock to assist you.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
            </motion.div>
          </section>

          {/* Features Grid */}
          <section className="container mx-auto px-4 pb-20 min-[320px]:px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 min-[640px]:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500"></div>

                  {/* Glass Card */}
                  <div className="relative h-full p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    {/* Icon */}
                    <div className="mb-6 relative w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl blur-lg"></div>
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="relative w-12 h-12 object-contain filter brightness-110"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
    </>
  );
}
