import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsOverview } from "@/components/StatsOverview";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Heart,
  Calendar,
  CloudSun,
  Plus,
  ChevronRight,
  AlertCircle,
  Clock,
  Activity,
  Stethoscope,
  Dumbbell,
  Apple,
  CalendarDays,
  Brain,
  FileText,
  Baby,
  Home,
  DollarSign,
  BarChart3,
  Settings,
  Users,
  MessageSquare,
  Shield,
  Syringe,
  Pill,
  Scissors,
  XCircle,
  GitBranch,
  Tag,
  Sparkles,
  BookOpen,
} from "lucide-react";

// Module categories with all features
const moduleCategories = [
  {
    id: "horses",
    name: "Horses",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    modules: [
      { name: "All Horses", href: "/horses", icon: Heart },
      { name: "Add Horse", href: "/horses/new", icon: Plus },
      { name: "Pedigree", href: "/pedigree", icon: GitBranch },
    ],
  },
  {
    id: "health",
    name: "Health",
    icon: Stethoscope,
    color: "from-blue-500 to-cyan-600",
    modules: [
      { name: "Health Hub", href: "/health", icon: Stethoscope },
      { name: "Vaccinations", href: "/vaccinations", icon: Syringe },
      { name: "Dental Care", href: "/dental", icon: Scissors },
      { name: "Hoof Care", href: "/hoofcare", icon: Activity },
      { name: "Dewormings", href: "/dewormings", icon: Pill },
      { name: "Treatments", href: "/treatments", icon: Heart },
      { name: "X-Rays", href: "/xrays", icon: XCircle },
    ],
  },
  {
    id: "training",
    name: "Training",
    icon: Dumbbell,
    color: "from-green-500 to-emerald-600",
    modules: [
      { name: "Training Log", href: "/training", icon: Dumbbell },
      { name: "Templates", href: "/training-templates", icon: BookOpen },
      { name: "Lessons", href: "/lessons", icon: Users },
    ],
  },
  {
    id: "nutrition",
    name: "Nutrition",
    icon: Apple,
    color: "from-orange-500 to-amber-600",
    modules: [
      { name: "Feeding Plans", href: "/feeding", icon: Apple },
      { name: "Nutrition Plans", href: "/nutrition-plans", icon: FileText },
      { name: "Nutrition Logs", href: "/nutrition-logs", icon: BookOpen },
    ],
  },
  {
    id: "schedule",
    name: "Schedule",
    icon: CalendarDays,
    color: "from-purple-500 to-violet-600",
    modules: [
      { name: "Calendar", href: "/calendar", icon: Calendar },
      { name: "Appointments", href: "/appointments", icon: Clock },
      { name: "Tasks", href: "/tasks", icon: Activity },
    ],
  },
  {
    id: "ai",
    name: "AI Tools",
    icon: Brain,
    color: "from-indigo-500 to-blue-600",
    modules: [
      { name: "AI Assistant", href: "/ai-chat", icon: Brain },
      { name: "Weather", href: "/weather", icon: CloudSun },
    ],
  },
  {
    id: "documents",
    name: "Documents",
    icon: FileText,
    color: "from-slate-500 to-gray-600",
    modules: [{ name: "Document Vault", href: "/documents", icon: FileText }],
  },
  {
    id: "breeding",
    name: "Breeding",
    icon: Baby,
    color: "from-pink-500 to-rose-600",
    modules: [{ name: "Breeding Manager", href: "/breeding", icon: Baby }],
  },
  {
    id: "stable",
    name: "Stable",
    icon: Home,
    color: "from-yellow-500 to-orange-600",
    modules: [
      { name: "Stable Management", href: "/stable", icon: Home },
      { name: "Contacts", href: "/contacts", icon: Users },
      { name: "Client Portal", href: "/client/:clientId", icon: Shield },
      { name: "Messages", href: "/messages", icon: MessageSquare },
    ],
  },
  {
    id: "financial",
    name: "Financial",
    icon: DollarSign,
    color: "from-emerald-500 to-teal-600",
    modules: [{ name: "Billing", href: "/billing", icon: DollarSign }],
  },
  {
    id: "reports",
    name: "Reports",
    icon: BarChart3,
    color: "from-cyan-500 to-blue-600",
    modules: [
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
      { name: "Reports", href: "/reports", icon: FileText },
      { name: "Tags", href: "/tags", icon: Tag },
    ],
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    color: "from-gray-500 to-slate-600",
    modules: [
      { name: "Settings", href: "/settings", icon: Settings },
      { name: "Admin", href: "/admin", icon: Shield },
    ],
  },
];

function ModuleCard({
  category,
  index,
}: {
  category: (typeof moduleCategories)[0];
  index: number;
}) {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="group hover:shadow-lg transition-all duration-300 border-muted/50 bg-card/50 backdrop-blur-sm h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="font-serif text-lg">
                {category.name}
              </CardTitle>
              <CardDescription className="text-xs">
                {category.modules.length} module
                {category.modules.length > 1 ? "s" : ""}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          {category.modules.map((module) => {
            const ModuleIcon = module.icon;
            return (
              <Link key={module.href} href={module.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto py-2 px-3 hover:bg-muted/50 transition-colors"
                >
                  <ModuleIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{module.name}</span>
                  <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const { data: stats } = trpc.user.getDashboardStats.useQuery();
  const { data: subscription } = trpc.user.getSubscriptionStatus.useQuery();

  const getSubscriptionBadge = () => {
    if (!subscription) return null;
    switch (subscription.status) {
      case "trial":
        const trialDays = subscription.trialEndsAt
          ? Math.ceil(
              (new Date(subscription.trialEndsAt).getTime() - Date.now()) /
                (1000 * 60 * 60 * 24),
            )
          : 0;
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          >
            {trialDays} days left in trial
          </Badge>
        );
      case "active":
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
          >
            Active Subscription
          </Badge>
        );
      case "overdue":
        return <Badge variant="destructive">Payment Overdue</Badge>;
      case "expired":
        return <Badge variant="destructive">Subscription Expired</Badge>;
      default:
        return null;
    }
  };

  // Quick action buttons for most common tasks
  const quickActions = [
    {
      label: "Add Horse",
      href: "/horses/new",
      icon: Plus,
      color: "from-rose-500 to-pink-600",
    },
    {
      label: "Log Training",
      href: "/training",
      icon: Dumbbell,
      color: "from-green-500 to-emerald-600",
    },
    {
      label: "Schedule",
      href: "/calendar",
      icon: Calendar,
      color: "from-purple-500 to-violet-600",
    },
    {
      label: "AI Chat",
      href: "/ai-chat",
      icon: Sparkles,
      color: "from-indigo-500 to-blue-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Welcome back, {user?.name?.split(" ")[0] || "Rider"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Your comprehensive equestrian management hub
          </p>
        </div>
        <div className="flex items-center gap-3">{getSubscriptionBadge()}</div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <StatsOverview
          totalHorses={stats?.horseCount || 0}
          trainingHours={0}
          upcomingEvents={stats?.upcomingSessionCount || 0}
          healthReminders={stats?.reminderCount || 0}
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-muted/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-serif">Quick Actions</CardTitle>
            <CardDescription>Common tasks to get you started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickActions.map((action, idx) => {
                const ActionIcon = action.icon;
                return (
                  <Link key={action.href} href={action.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-20 flex flex-col items-center justify-center gap-2 hover:bg-muted/50"
                      >
                        <div
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}
                        >
                          <ActionIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-medium">
                          {action.label}
                        </span>
                      </Button>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Module Navigation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              All Modules
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Access all 20+ features to manage your equestrian operations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {moduleCategories.map((category, index) => (
            <ModuleCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>

      {/* Footer Help */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="border-muted/50 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Need Help?</h3>
                  <p className="text-sm text-muted-foreground">
                    Try our AI assistant for instant guidance
                  </p>
                </div>
              </div>
              <Link href="/ai-chat">
                <Button>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Open AI Chat
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}
