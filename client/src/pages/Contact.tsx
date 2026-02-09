import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MarketingNav } from "@/components/MarketingNav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { PageBanner } from "@/components/PageBanner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { marketingAssets } from "@/config/marketingAssets";
import { Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent successfully!", {
      description: "We'll get back to you as soon as possible.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <MarketingNav />
      <PageTransition>
        <div className="min-h-screen bg-black">
          {/* Page Banner */}
          <PageBanner
            title="Get in Touch"
            subtitle="Have a question or need help? We're here for you. Send us a message and we'll respond as soon as possible."
            imageSrc="/images/gallery/21.jpg"
          />

          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Contact Form with Dark Glass */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-2"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10 pointer-events-none" />
                  <div className="relative p-8">
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      Send us a message
                    </h2>
                    <p className="text-gray-400 mb-8">
                      Fill out the form below and we'll get back to you within
                      24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="name" className="text-white">
                            Name <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.5 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="email" className="text-white">
                            Email <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isSubmitting}
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                          />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="subject" className="text-white">
                          Subject <span className="text-red-400">*</span>
                        </Label>
                        <Input
                          id="subject"
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                        className="space-y-2"
                      >
                        <Label htmlFor="message" className="text-white">
                          Message <span className="text-red-400">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your inquiry..."
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-indigo-500/50 focus:ring-indigo-500/20 resize-none"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                      >
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white border-0 font-semibold shadow-lg shadow-indigo-500/50 transition-all duration-300"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </motion.div>
                    </form>
                  </div>
                </div>
              </motion.div>

              {/* Contact Information Cards */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md p-6 hover:border-indigo-500/50 transition-colors duration-300 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30">
                      <Mail className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-white">Email</h3>
                      <p className="text-sm text-gray-400 mb-2">
                        Send us an email anytime
                      </p>
                      <a
                        href="mailto:support@equiprofile.online"
                        className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        support@equiprofile.online
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md p-6 hover:border-green-500/50 transition-colors duration-300 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
                      <MessageCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-white">
                        WhatsApp
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        Chat with us instantly
                      </p>
                      <a
                        href="https://wa.me/447347258089"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-colors text-sm font-medium"
                      >
                        <MessageCircle className="w-4 h-4" />
                        +44 7347 258089
                      </a>
                      <p className="text-xs text-gray-500 mt-2">
                        Quick response via WhatsApp
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md p-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/20 pointer-events-none" />
                  <div className="relative">
                    <h3 className="font-semibold mb-2 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                      Response Time
                    </h3>
                    <p className="text-sm text-gray-400">
                      We typically respond to all inquiries within 24 hours
                      during business days. For urgent matters, contact us via
                      WhatsApp for faster support.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}
