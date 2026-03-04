import { Heart, Activity, Calendar, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTranslation } from "react-i18next";

interface StatsOverviewProps {
  totalHorses?: number;
  trainingHours?: number;
  upcomingEvents?: number;
  healthReminders?: number;
}

export function StatsOverview({
  totalHorses = 0,
  trainingHours = 0,
  upcomingEvents = 0,
  healthReminders = 0,
}: StatsOverviewProps) {
  const { t } = useTranslation();

  const stats = [
    {
      title: t("dashboard.stats.totalHorses"),
      value: totalHorses,
      icon: Heart,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: t("dashboard.stats.trainingHours"),
      value: `${trainingHours}h`,
      icon: Activity,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900",
    },
    {
      title: t("dashboard.stats.upcomingEvents"),
      value: upcomingEvents,
      icon: Calendar,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: t("dashboard.stats.healthReminders"),
      value: healthReminders,
      icon: Bell,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
              <CardTitle className="text-xs font-medium leading-tight">
                {stat.title}
              </CardTitle>
              <div className={`p-1.5 rounded-lg ${stat.bgColor} shrink-0`}>
                <Icon className={`h-3.5 w-3.5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {stat.value === 0 ? "No data yet" : "This month"}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
