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
import { Checkbox } from "@/components/ui/checkbox";
import { getLoginUrl, isOAuthAvailable } from "@/const";
import { Link, useLocation } from "wouter";
import { useState, FormEvent } from "react";
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { PageTransition } from "@/components/PageTransition";
import { MarketingNav } from "@/components/MarketingNav";
import { Footer } from "@/components/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthSplitLayout } from "@/components/AuthSplitLayout";
import { motion } from "framer-motion";

/**
 * Register page
 *
 * Supports both OAuth (if configured) and email/password registration.
 */
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const oauthEnabled = isOAuthAvailable();

  // Redirect if already authenticated
  if (isAuthenticated) {
    setLocation("/dashboard");
    return null;
  }

  const handleOAuthRegister = () => {
    const loginUrl = getLoginUrl();
    if (!loginUrl) {
      setError("OAuth is not configured");
      return;
    }
    setIsLoading(true);
    window.location.href = loginUrl;
  };

  const handleEmailRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!acceptTerms) {
      setError("Please accept the Terms of Service and Privacy Policy");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 12) {
      setError("Password must be at least 12 characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        setIsLoading(false);
        return;
      }

      // Redirect to dashboard on success
      window.location.href = "/dashboard";
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <MarketingNav />
      <PageTransition>
        <AuthSplitLayout>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back button */}
            <Link href="/">
              <a className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                Back to home
              </a>
            </Link>

            {/* Dark Glass Form Card */}
              <Card className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Create an account
                  </CardTitle>
                  <CardDescription className="text-center text-gray-400">
                    Get started with EquiProfile today
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert
                        variant="destructive"
                        className="bg-red-950/50 border-red-500/50 backdrop-blur-sm"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription className="text-red-200">
                          {error}
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}

                  <form onSubmit={handleEmailRegister} className="space-y-4">
                    {/* Name field */}
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <Label htmlFor="name" className="text-white">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/10 focus:border-white/20 focus:scale-[1.01] transition-all duration-200"
                      />
                    </motion.div>

                    {/* Email field */}
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/10 focus:border-white/20 focus:scale-[1.01] transition-all duration-200"
                      />
                    </motion.div>

                    {/* Password field */}
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <Label htmlFor="password" className="text-white">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/10 focus:border-white/20 focus:scale-[1.01] transition-all duration-200"
                      />
                      <p className="text-xs text-gray-500">
                        At least 8 characters
                      </p>
                    </motion.div>

                    {/* Confirm Password field */}
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <Label htmlFor="confirm-password" className="text-white">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                        required
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/10 focus:border-white/20 focus:scale-[1.01] transition-all duration-200"
                      />
                    </motion.div>

                    {/* Terms acceptance */}
                    <motion.div
                      className="flex items-start gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <Checkbox
                        id="terms"
                        className="mt-1 border-white/20 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-indigo-500 data-[state=checked]:to-cyan-500"
                        checked={acceptTerms}
                        onCheckedChange={(checked) =>
                          setAcceptTerms(checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm font-normal cursor-pointer leading-relaxed text-gray-300"
                      >
                        I agree to the{" "}
                        <Link href="/terms">
                          <a className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent hover:from-indigo-300 hover:to-cyan-300 transition-all duration-200">
                            Terms of Service
                          </a>
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy">
                          <a className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent hover:from-indigo-300 hover:to-cyan-300 transition-all duration-200">
                            Privacy Policy
                          </a>
                        </Link>
                      </Label>
                    </motion.div>

                    {/* Create account button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white border-0 shadow-lg shadow-indigo-500/20 transition-all duration-200"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          "Create account"
                        )}
                      </Button>
                    </motion.div>
                  </form>

                  {/* OAuth option if available */}
                  {oauthEnabled && (
                    <>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-black/40 px-2 text-gray-400">
                            Or continue with
                          </span>
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                          onClick={handleOAuthRegister}
                          disabled={isLoading}
                        >
                          OAuth Sign Up
                        </Button>
                      </motion.div>
                    </>
                  )}

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-black/40 px-2 text-gray-400">Or</span>
                    </div>
                  </div>

                  {/* Login link */}
                  <motion.div
                    className="text-center text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    <span className="text-gray-400">
                      Already have an account?{" "}
                    </span>
                    <Link href="/login">
                      <a className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-medium hover:from-indigo-300 hover:to-cyan-300 transition-all duration-200">
                        Sign in
                      </a>
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>

              {/* Note */}
              <p className="text-xs text-center text-gray-500 mt-4">
                {oauthEnabled
                  ? "Secure authentication with OAuth or email/password"
                  : "Secure email/password authentication"}
              </p>
              <p className="text-xs text-center text-gray-500 mt-2">
                Start your{" "}
                <strong className="text-gray-400">7-day free trial</strong> - no
                credit card required
              </p>
            </motion.div>
        </AuthSplitLayout>
      </PageTransition>
      <Footer />
    </>
  );
}
