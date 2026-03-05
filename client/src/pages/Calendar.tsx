import { useState } from "react";
import { useTranslation } from "react-i18next";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
  Pencil,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const EVENT_TYPE_COLORS: Record<string, string> = {
  training: "bg-blue-500",
  competition: "bg-green-500",
  veterinary: "bg-purple-500",
  farrier: "bg-yellow-500",
  lesson: "bg-red-500",
  meeting: "bg-gray-500",
  other: "bg-indigo-500",
};

const EVENT_TYPE_LABELS: Record<string, string> = {
  training: "Training",
  competition: "Competition",
  veterinary: "Veterinary",
  farrier: "Farrier",
  lesson: "Lesson",
  meeting: "Meeting",
  other: "Other",
};

type EventType = keyof typeof EVENT_TYPE_LABELS;

interface EditEventState {
  id: number;
  title: string;
  eventType: EventType;
  startDate: string;
  location: string;
}

export default function CalendarPage() {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<EditEventState | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    eventType: "other" as EventType,
    startDate: new Date().toISOString().slice(0, 10),
    location: "",
  });

  const monthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const monthEnd = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  const { data: events = [], refetch } = trpc.calendar.getEvents.useQuery({
    startDate: monthStart.toISOString(),
    endDate: monthEnd.toISOString(),
  });

  const createEvent = trpc.calendar.createEvent.useMutation({
    onSuccess: () => {
      toast.success("Event created");
      setIsAddDialogOpen(false);
      setNewEvent({
        title: "",
        eventType: "other",
        startDate: new Date().toISOString().slice(0, 10),
        location: "",
      });
      refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const deleteEvent = trpc.calendar.deleteEvent.useMutation({
    onSuccess: () => {
      toast.success("Event deleted");
      refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const updateEvent = trpc.calendar.updateEvent.useMutation({
    onSuccess: () => {
      toast.success("Event updated");
      setEditEvent(null);
      refetch();
    },
    onError: (error) => toast.error(error.message),
  });

  const handleEditClick = (event: any) => {
    setEditEvent({
      id: event.id,
      title: event.title,
      eventType: (event.eventType as EventType) || "other",
      startDate: new Date(event.startDate).toISOString().slice(0, 10),
      location: event.location || "",
    });
  };

  const handleUpdateEvent = () => {
    if (!editEvent || !editEvent.title.trim()) {
      toast.error("Please enter an event title");
      return;
    }
    updateEvent.mutate({
      id: editEvent.id,
      title: editEvent.title,
      startDate: new Date(editEvent.startDate).toISOString(),
      location: editEvent.location || undefined,
    });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const navigateMonth = (direction: number) => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + direction,
        1,
      ),
    );
  };

  const getEventsForDay = (day: number) => {
    return events.filter((e: any) => {
      const d = new Date(e.startDate);
      return (
        d.getDate() === day &&
        d.getMonth() === currentDate.getMonth() &&
        d.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const upcomingEvents = events
    .filter((e: any) => new Date(e.startDate) >= new Date())
    .sort(
      (a: any, b: any) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    )
    .slice(0, 5);

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) {
      toast.error("Please enter an event title");
      return;
    }
    createEvent.mutate({
      title: newEvent.title,
      eventType: newEvent.eventType as
        | "training"
        | "competition"
        | "veterinary"
        | "farrier"
        | "lesson"
        | "meeting"
        | "other",
      startDate: new Date(newEvent.startDate).toISOString(),
      location: newEvent.location || undefined,
      isAllDay: true,
    });
  };

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t("nav.calendar")}</h1>
            <p className="text-muted-foreground">
              Schedule and manage all your equestrian activities
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth(-1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                >
                  Today
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateMonth(1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center font-medium text-xs text-muted-foreground p-2"
                >
                  {day}
                </div>
              ))}

              {/* Empty cells before first day */}
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`empty-${i}`} className="min-h-[80px] p-1" />
              ))}

              {/* Calendar days */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const today = new Date();
                const isToday =
                  day === today.getDate() &&
                  currentDate.getMonth() === today.getMonth() &&
                  currentDate.getFullYear() === today.getFullYear();
                const dayEvents = getEventsForDay(day);

                return (
                  <div
                    key={day}
                    className={`min-h-[80px] p-1 border rounded-lg ${
                      isToday ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <div
                      className={`text-xs mb-1 font-medium ${
                        isToday ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {day}
                    </div>
                    <div className="space-y-0.5">
                      {dayEvents.slice(0, 2).map((event: any) => (
                        <div
                          key={event.id}
                          className={`text-[10px] px-1 py-0.5 rounded text-white truncate ${
                            EVENT_TYPE_COLORS[event.eventType] || "bg-gray-500"
                          }`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[10px] text-muted-foreground">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(EVENT_TYPE_LABELS).map(([type, label]) => (
                <div key={type} className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full ${EVENT_TYPE_COLORS[type]}`}
                  />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No upcoming events</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Add events to your calendar to stay organized
                </p>
                <Button
                  className="mt-4"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map((event: any) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full shrink-0 ${
                          EVENT_TYPE_COLORS[event.eventType] || "bg-gray-500"
                        }`}
                      />
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.startDate).toLocaleDateString(
                            "en-GB",
                            {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                            },
                          )}
                          {event.location && ` · ${event.location}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {EVENT_TYPE_LABELS[event.eventType] || event.eventType}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground"
                        onClick={() => handleEditClick(event)}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground"
                        onClick={() => deleteEvent.mutate({ id: event.id })}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                placeholder="Event title"
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={newEvent.eventType}
                onValueChange={(v) =>
                  setNewEvent({
                    ...newEvent,
                    eventType: v as typeof newEvent.eventType,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(EVENT_TYPE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={newEvent.startDate}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Location (optional)</Label>
              <Input
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                placeholder="e.g. Main arena"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEvent} disabled={createEvent.isPending}>
              {createEvent.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Event"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog
        open={!!editEvent}
        onOpenChange={(open) => !open && setEditEvent(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          {editEvent && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={editEvent.title}
                  onChange={(e) =>
                    setEditEvent({ ...editEvent, title: e.target.value })
                  }
                  placeholder="Event title"
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={editEvent.startDate}
                  onChange={(e) =>
                    setEditEvent({ ...editEvent, startDate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Location (optional)</Label>
                <Input
                  value={editEvent.location}
                  onChange={(e) =>
                    setEditEvent({ ...editEvent, location: e.target.value })
                  }
                  placeholder="e.g. Main arena"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditEvent(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateEvent}
              disabled={updateEvent.isPending}
            >
              {updateEvent.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
