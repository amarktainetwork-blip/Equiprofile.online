import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SkipToContent, useKeyboardNavigation } from "./components/AccessibilityHelpers";
import "./i18n/config";

// Marketing Pages (Public)
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

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
import Admin from "./pages/Admin";
import Stable from "./pages/Stable";
import Messages from "./pages/Messages";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Calendar from "./pages/Calendar";
import AIChat from "./pages/AIChat";
import Settings from "./pages/Settings";

function Router() {
  useKeyboardNavigation();
  
  return (
    <>
      <SkipToContent />
      <main id="main-content">
        <Switch>
          {/* Marketing Pages (Public) */}
          <Route path="/" component={Home} />
          <Route path="/features" component={Features} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          
          {/* Auth Pages */}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          
          {/* App Pages (Protected - require auth) */}
          <Route path="/dashboard" component={Dashboard} />
          
          {/* Horse management */}
          <Route path="/horses" component={Horses} />
          <Route path="/horses/new" component={HorseForm} />
          <Route path="/horses/:id/edit" component={HorseForm} />
          <Route path="/horses/:id" component={HorseDetail} />
          
          {/* Health records */}
          <Route path="/health" component={Health} />
          
          {/* Training */}
          <Route path="/training" component={Training} />
          
          {/* Feeding plans */}
          <Route path="/feeding" component={Feeding} />
          
          {/* Weather */}
          <Route path="/weather" component={Weather} />
          
          {/* Documents */}
          <Route path="/documents" component={Documents} />
          
          {/* Stable Management */}
          <Route path="/stable" component={Stable} />
          
          {/* Messaging */}
          <Route path="/messages" component={Messages} />
          
          {/* Analytics */}
          <Route path="/analytics" component={Analytics} />
          
          {/* Reports */}
          <Route path="/reports" component={Reports} />
          
          {/* Calendar */}
          <Route path="/calendar" component={Calendar} />
          
          {/* Settings */}
          <Route path="/settings" component={Settings} />
          
          {/* AI Chat */}
          <Route path="/ai-chat" component={AIChat} />
          
          {/* Admin panel - requires admin role */}
          <Route path="/admin" component={Admin} />
          
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
      <ThemeProvider defaultTheme="system" switchable={true}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
