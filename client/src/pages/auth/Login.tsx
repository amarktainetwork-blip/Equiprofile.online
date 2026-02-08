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
 * Login page
 *
 * Supports both OAuth (if configured) and email/password authentication.
 * Desktop: 50/50 split screen layout
 * Mobile: Full-screen background with glass overlay
 */
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const oauthEnabled = isOAuthAvailable();

  // Redirect if already authenticated
  if (isAuthenticated) {
    setLocation("/dashboard");
    return null;
  }

  const handleOAuthLogin = () => {
    const loginUrl = getLoginUrl();
    if (!loginUrl) {
      setError("OAuth is not configured");
      return;
    }
    setIsLoading(true);
    window.location.href = loginUrl;
  };

  const handleEmailLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
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

            {/* Login Form Card */}
            <Card className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
              <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Welcome back
                </CardTitle>
                <CardDescription className="text-center text-gray-400">
                  Sign in to your EquiProfile account
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

                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    {/* Email field */}
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
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
                      transition={{ duration: 0.4, delay: 0.3 }}
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
                    </motion.div>

                    {/* Remember me & Forgot password */}
                    <motion.div
                      className="flex items-center justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(checked) =>
                            setRememberMe(checked as boolean)
                          }
                          className="border-white/20 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-600"
                        />
                        <Label
                          htmlFor="remember"
                          className="text-sm font-normal cursor-pointer text-gray-300"
                        >
                          Remember me
                        </Label>
                      </div>
                      <Link href="/forgot-password">
                        <a className="text-sm bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all duration-200">
                          Forgot password?
                        </a>
                      </Link>
                    </motion.div>

                    {/* Sign in button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-blue-500/20 transition-all duration-200"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          "Sign in"
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
                          onClick={handleOAuthLogin}
                          disabled={isLoading}
                        >
                          OAuth Sign In
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

                  {/* Register link */}
                  <motion.div
                    className="text-center text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <span className="text-gray-400">
                      Don't have an account?{" "}
                    </span>
                    <Link href="/register">
                      <a className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium hover:from-blue-300 hover:to-purple-300 transition-all duration-200">
                        Create account
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
            </motion.div>
        </AuthSplitLayout>
      </PageTransition>
      <Footer />
    </>
  );
}
