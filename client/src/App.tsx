import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import {
  SkipToContent,
  useKeyboardNavigation,
} from "./components/AccessibilityHelpers";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { UpgradeModal } from "./components/UpgradeModal";
import { useUpgradeModal } from "./hooks/useUpgradeModal";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SalesChatWidget } from "./components/SalesChatWidget";
import { CookieConsent } from "./components/CookieConsent";
import "./i18n/config";

// Marketing Pages (Public)
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// App Pages (Protected)
import Dashboard from "./pages/Dashboard";
import Horses from "./pages/Horses";
import HorseForm from "./pages/HorseForm";
import HorseDetail from "./pages/HorseDetail";
import Health from "./pages/Health";
import Training from "./pages/Training";
import Feeding from "./pages/Feeding";
import Weather from "./pages/Weather";
import Documents from "./pages/Documents";
import Tasks from "./pages/Tasks";
import Contacts from "./pages/Contacts";
import Admin from "./pages/Admin";
import QAChecklist from "./pages/QAChecklist";
import Stable from "./pages/Stable";
import Messages from "./pages/Messages";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Calendar from "./pages/Calendar";
import AIChat from "./pages/AIChat";
import TrainingTemplates from "./pages/TrainingTemplates";
import BreedingManagement from "./pages/BreedingManagement";
import LessonScheduling from "./pages/LessonScheduling";
import ClientPortal from "./pages/ClientPortal";
import Settings from "./pages/Settings";
import BillingPage from "./pages/BillingPage";

// Additional Health & Management Pages
import Appointments from "./pages/Appointments";
import NutritionLogs from "./pages/NutritionLogs";
import NutritionPlans from "./pages/NutritionPlans";
import Hoofcare from "./pages/Hoofcare";
import Pedigree from "./pages/Pedigree";
import Xrays from "./pages/Xrays";
import Treatments from "./pages/Treatments";
import Vaccinations from "./pages/Vaccinations";
import DentalCare from "./pages/DentalCare";
import Dewormings from "./pages/Dewormings";
import Tags from "./pages/Tags";

function Router() {
  useKeyboardNavigation();
  useScrollToTop();
  const upgradeModal = useUpgradeModal();

  return (
    <>
      <SkipToContent />
      <UpgradeModal
        open={upgradeModal.isOpen}
        onClose={upgradeModal.close}
        reason={upgradeModal.reason}
        message={upgradeModal.message}
      />
      <main id="main-content">
        <Switch>
          {/* Marketing Pages (Public) */}
          <Route path="/" component={Home} />
          <Route path="/features" component={Features} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/terms" component={TermsPage} />
          <Route path="/privacy" component={PrivacyPage} />

          {/* Auth Pages */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />

          {/* App Pages (Protected - require auth) */}
          <Route path="/dashboard">
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Route>

          {/* Horse management */}
          <Route path="/horses">
            <ProtectedRoute>
              <Horses />
            </ProtectedRoute>
          </Route>
          <Route path="/horses/new">
            <ProtectedRoute>
              <HorseForm />
            </ProtectedRoute>
          </Route>
          <Route path="/horses/:id/edit">
            <ProtectedRoute>
              <HorseForm />
            </ProtectedRoute>
          </Route>
          <Route path="/horses/:id">
            <ProtectedRoute>
              <HorseDetail />
            </ProtectedRoute>
          </Route>

          {/* Health records */}
          <Route path="/health">
            <ProtectedRoute>
              <Health />
            </ProtectedRoute>
          </Route>
          <Route path="/vaccinations">
            <ProtectedRoute>
              <Vaccinations />
            </ProtectedRoute>
          </Route>
          <Route path="/dental">
            <ProtectedRoute>
              <DentalCare />
            </ProtectedRoute>
          </Route>
          <Route path="/hoofcare">
            <ProtectedRoute>
              <Hoofcare />
            </ProtectedRoute>
          </Route>
          <Route path="/dewormings">
            <ProtectedRoute>
              <Dewormings />
            </ProtectedRoute>
          </Route>
          <Route path="/treatments">
            <ProtectedRoute>
              <Treatments />
            </ProtectedRoute>
          </Route>
          <Route path="/xrays">
            <ProtectedRoute>
              <Xrays />
            </ProtectedRoute>
          </Route>

          {/* Pedigree */}
          <Route path="/pedigree">
            <ProtectedRoute>
              <Pedigree />
            </ProtectedRoute>
          </Route>

          {/* Training */}
          <Route path="/training">
            <ProtectedRoute>
              <Training />
            </ProtectedRoute>
          </Route>
          <Route path="/training-templates">
            <ProtectedRoute>
              <TrainingTemplates />
            </ProtectedRoute>
          </Route>

          {/* Breeding Management */}
          <Route path="/breeding">
            <ProtectedRoute>
              <BreedingManagement />
            </ProtectedRoute>
          </Route>

          {/* Lesson Scheduling */}
          <Route path="/lessons">
            <ProtectedRoute>
              <LessonScheduling />
            </ProtectedRoute>
          </Route>

          {/* Feeding plans */}
          <Route path="/feeding">
            <ProtectedRoute>
              <Feeding />
            </ProtectedRoute>
          </Route>
          <Route path="/nutrition-plans">
            <ProtectedRoute>
              <NutritionPlans />
            </ProtectedRoute>
          </Route>
          <Route path="/nutrition-logs">
            <ProtectedRoute>
              <NutritionLogs />
            </ProtectedRoute>
          </Route>

          {/* Weather */}
          <Route path="/weather">
            <ProtectedRoute>
              <Weather />
            </ProtectedRoute>
          </Route>

          {/* Documents */}
          <Route path="/documents">
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          </Route>

          {/* Tasks */}
          <Route path="/tasks">
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          </Route>

          {/* Contacts */}
          <Route path="/contacts">
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          </Route>

          {/* Stable Management */}
          <Route path="/stable">
            <ProtectedRoute>
              <Stable />
            </ProtectedRoute>
          </Route>

          {/* Messaging */}
          <Route path="/messages">
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          </Route>

          {/* Analytics */}
          <Route path="/analytics">
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          </Route>

          {/* Reports */}
          <Route path="/reports">
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          </Route>

          {/* Calendar */}
          <Route path="/calendar">
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          </Route>
          <Route path="/appointments">
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          </Route>

          {/* Tags */}
          <Route path="/tags">
            <ProtectedRoute>
              <Tags />
            </ProtectedRoute>
          </Route>

          {/* Settings */}
          <Route path="/settings">
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          </Route>

          {/* Billing */}
          <Route path="/billing">
            <ProtectedRoute>
              <BillingPage />
            </ProtectedRoute>
          </Route>

          {/* AI Chat */}
          <Route path="/ai-chat">
            <ProtectedRoute>
              <AIChat />
            </ProtectedRoute>
          </Route>

          {/* Client Portal */}
          <Route path="/client/:clientId" component={ClientPortal} />

          {/* Admin panel - accessible to any user with admin session unlocked */}
          <Route path="/admin">
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          </Route>

          {/* QA Checklist - admin-unlocked users only */}
          <Route path="/qa-check">
            <ProtectedRoute>
              <QAChecklist />
            </ProtectedRoute>
          </Route>

          {/* 404 */}
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
          <SalesChatWidget />
          <CookieConsent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
