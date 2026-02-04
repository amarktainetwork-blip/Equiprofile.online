import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/lib/trpc";
import { Plus, Trophy, Edit, Trash2, Download } from "lucide-react";
import { toast } from "sonner";
import { useRealtimeModule } from "@/hooks/useRealtime";

type CompetitionRecord = {
  id: number;
  horseId: number;
  competitionName: string;
  venue: string | null;
  date: string;
  discipline: string | null;
  level: string | null;
  class: string | null;
  placement: string | null;
  score: string | null;
  notes: string | null;
  cost: number | null;
  winnings: number | null;
};

function CompetitionsContent() {
  const [filters, setFilters] = useState({
    horseId: undefined as number | undefined,
    startDate: "",
    endDate: "",
    discipline: "",
  });

  const { data: competitionRecords, isLoading } = trpc.competitions.list.useQuery({
    horseId: filters.horseId,
  });
  const { data: horses } = trpc.horses.list.useQuery();
  
  const [localCompetitions, setLocalCompetitions] = useState(competitionRecords || []);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<CompetitionRecord | null>(null);
  
  const [formData, setFormData] = useState({
    horseId: "",
    competitionName: "",
    date: "",
    venue: "",
    discipline: "",
    level: "",
    class: "",
    placement: "",
    score: "",
    cost: "",
    winnings: "",
    notes: "",
  });

  // Real-time updates
  useRealtimeModule('competitions', (action, data) => {
    switch (action) {
      case 'created':
        setLocalCompetitions(prev => [data, ...prev]);
        toast.success('Competition record created');
        break;
      case 'updated':
        setLocalCompetitions(prev => 
          prev.map(r => r.id === data.id ? { ...r, ...data } : r)
        );
        toast.success('Competition record updated');
        break;
      case 'deleted':
        setLocalCompetitions(prev => prev.filter(r => r.id !== data.id));
        toast.success('Competition record deleted');
        break;
    }
  });

  useEffect(() => {
    if (competitionRecords) setLocalCompetitions(competitionRecords);
  }, [competitionRecords]);

  const createMutation = trpc.competitions.create.useMutation({
    onSuccess: () => {
      setIsCreateOpen(false);
      resetForm();
      toast.success("Competition record created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create competition record");
    },
  });

  const exportQuery = trpc.competitions.exportCSV.useQuery(undefined, {
    enabled: false,
  });

  const handleExportCSV = async () => {
    try {
      const result = await exportQuery.refetch();
      if (result.data) {
        const blob = new Blob([result.data.csv], { type: result.data.mimeType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = result.data.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.success("CSV exported successfully");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to export CSV");
    }
  };

  const resetForm = () => {
    setFormData({
      horseId: "",
      competitionName: "",
      date: "",
      venue: "",
      discipline: "",
      level: "",
      class: "",
      placement: "",
      score: "",
      cost: "",
      winnings: "",
      notes: "",
    });
    setEditingRecord(null);
  };

  const handleSubmit = () => {
    if (!formData.horseId || !formData.competitionName || !formData.date) {
      toast.error("Please fill in all required fields (Horse, Competition Name, Date)");
      return;
    }

    if (editingRecord) {
      toast.error("Edit functionality not yet available. Backend update endpoint needs to be implemented.");
      return;
    }

    const costInPence = formData.cost ? Math.round(parseFloat(formData.cost) * 100) : undefined;
    const winningsInPence = formData.winnings ? Math.round(parseFloat(formData.winnings) * 100) : undefined;

    const data = {
      horseId: parseInt(formData.horseId),
      competitionName: formData.competitionName,
      date: formData.date,
      venue: formData.venue || undefined,
      discipline: formData.discipline || undefined,
      level: formData.level || undefined,
      class: formData.class || undefined,
      placement: formData.placement || undefined,
      score: formData.score || undefined,
      cost: costInPence,
      winnings: winningsInPence,
      notes: formData.notes || undefined,
    };

    createMutation.mutate(data);
  };

  const handleEdit = (record: CompetitionRecord) => {
    toast.info("Edit functionality coming soon. Backend update endpoint needs to be implemented.");
    // When backend is ready, uncomment below:
    // setEditingRecord(record);
    // setFormData({
    //   horseId: record.horseId.toString(),
    //   competitionName: record.competitionName,
    //   date: record.date?.split('T')[0] || "",
    //   venue: record.venue || "",
    //   discipline: record.discipline || "",
    //   level: record.level || "",
    //   class: record.class || "",
    //   placement: record.placement || "",
    //   score: record.score || "",
    //   cost: record.cost ? (record.cost / 100).toFixed(2) : "",
    //   winnings: record.winnings ? (record.winnings / 100).toFixed(2) : "",
    //   notes: record.notes || "",
    // });
    // setIsCreateOpen(true);
  };

  const handleDelete = async (id: number) => {
    toast.info("Delete functionality coming soon. Backend delete endpoint needs to be implemented.");
  };

  const getHorseName = (horseId: number) => {
    const horse = horses?.find(h => h.id === horseId);
    return horse?.name || "Unknown";
  };

  const getPlacementBadge = (placement: string | null) => {
    if (!placement) return null;
    
    const placementLower = placement.toLowerCase();
    let className = "bg-gray-500";
    
    if (placementLower.includes("1st") || placementLower === "1") {
      className = "bg-yellow-500 text-black";
    } else if (placementLower.includes("2nd") || placementLower === "2") {
      className = "bg-gray-400 text-black";
    } else if (placementLower.includes("3rd") || placementLower === "3") {
      className = "bg-orange-500 text-white";
    }
    
    return (
      <Badge className={className}>
        {placement}
      </Badge>
    );
  };

  const formatCurrency = (pence: number | null) => {
    if (!pence) return "-";
    return `£${(pence / 100).toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Filter competitions locally based on date range and discipline
  const filteredCompetitions = localCompetitions.filter(comp => {
    if (filters.startDate && comp.date < filters.startDate) return false;
    if (filters.endDate && comp.date > filters.endDate) return false;
    if (filters.discipline && (!comp.discipline || !comp.discipline.toLowerCase().includes(filters.discipline.toLowerCase()))) return false;
    return true;
  });

  // Calculate statistics
  const totalCompetitions = filteredCompetitions.length;
  const firstPlaceCount = filteredCompetitions.filter(c => 
    c.placement && (c.placement.toLowerCase().includes("1st") || c.placement === "1")
  ).length;
  const winRate = totalCompetitions > 0 ? ((firstPlaceCount / totalCompetitions) * 100).toFixed(1) : "0.0";
  const totalWinnings = filteredCompetitions.reduce((sum, c) => sum + (c.winnings || 0), 0);
  
  const bestPlacement = filteredCompetitions
    .filter(c => c.placement)
    .sort((a, b) => {
      const getPlacementNumber = (p: string) => {
        const match = p.match(/\d+/);
        return match ? parseInt(match[0]) : 999;
      };
      return getPlacementNumber(a.placement!) - getPlacementNumber(b.placement!);
    })[0]?.placement || "N/A";

  if (isLoading) {
    return <div>Loading competition records...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-600" />
            Competitions
          </h1>
          <p className="text-muted-foreground mt-1">
            Track competition results and performance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Dialog open={isCreateOpen} onOpenChange={(open) => {
            setIsCreateOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Competition
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingRecord ? "Edit Competition Record" : "Add Competition Record"}</DialogTitle>
                <DialogDescription>
                  {editingRecord ? "Update competition record details" : "Record a new competition result"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="horse">Horse *</Label>
                    <Select value={formData.horseId} onValueChange={(value) => setFormData({ ...formData, horseId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select horse" />
                      </SelectTrigger>
                      <SelectContent>
                        {horses?.map((horse) => (
                          <SelectItem key={horse.id} value={horse.id.toString()}>
                            {horse.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="competitionName">Competition Name *</Label>
                  <Input
                    id="competitionName"
                    value={formData.competitionName}
                    onChange={(e) => setFormData({ ...formData, competitionName: e.target.value })}
                    placeholder="Name of the competition"
                  />
                </div>
                
                <div>
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="Competition venue or location"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discipline">Discipline</Label>
                    <Input
                      id="discipline"
                      value={formData.discipline}
                      onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                      placeholder="e.g., dressage, show jumping, eventing"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="level">Level</Label>
                    <Input
                      id="level"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      placeholder="e.g., novice, intermediate, advanced"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="class">Class</Label>
                  <Input
                    id="class"
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    placeholder="Specific class or event name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="placement">Placement</Label>
                    <Input
                      id="placement"
                      value={formData.placement}
                      onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                      placeholder="e.g., 1st, 2nd, 3rd, 4th"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="score">Score</Label>
                    <Input
                      id="score"
                      value={formData.score}
                      onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                      placeholder="Score or time"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cost">Entry Fee (£)</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      value={formData.cost}
                      onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="winnings">Winnings (£)</Label>
                    <Input
                      id="winnings"
                      type="number"
                      step="0.01"
                      value={formData.winnings}
                      onChange={(e) => setFormData({ ...formData, winnings: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Additional notes about the competition..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsCreateOpen(false);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? "Saving..." : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Competitions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCompetitions}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {winRate}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {firstPlaceCount} first place
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Winnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalWinnings)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Best Placement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {bestPlacement}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="filterHorse">Horse</Label>
              <Select 
                value={filters.horseId?.toString() || ""} 
                onValueChange={(value) => setFilters({ ...filters, horseId: value ? parseInt(value) : undefined })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All horses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All horses</SelectItem>
                  {horses?.map((horse) => (
                    <SelectItem key={horse.id} value={horse.id.toString()}>
                      {horse.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="filterDiscipline">Discipline</Label>
              <Input
                id="filterDiscipline"
                value={filters.discipline}
                onChange={(e) => setFilters({ ...filters, discipline: e.target.value })}
                placeholder="Filter by discipline"
              />
            </div>
            
            <div>
              <Label htmlFor="filterStartDate">Start Date</Label>
              <Input
                id="filterStartDate"
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="filterEndDate">End Date</Label>
              <Input
                id="filterEndDate"
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Competition Records</CardTitle>
          <CardDescription>All competition results</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredCompetitions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No competition records found. Click "Add Competition" to create your first record.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Horse</TableHead>
                    <TableHead>Competition Name</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Discipline</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Placement</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Winnings</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompetitions.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(record.date)}
                      </TableCell>
                      <TableCell className="font-medium">{getHorseName(record.horseId)}</TableCell>
                      <TableCell>{record.competitionName}</TableCell>
                      <TableCell>{record.venue || "-"}</TableCell>
                      <TableCell className="capitalize">{record.discipline || "-"}</TableCell>
                      <TableCell className="capitalize">{record.level || "-"}</TableCell>
                      <TableCell>{getPlacementBadge(record.placement) || "-"}</TableCell>
                      <TableCell>{record.score || "-"}</TableCell>
                      <TableCell className="text-right font-semibold text-green-600">
                        {formatCurrency(record.winnings)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(record)}
                            className="opacity-50"
                            title="Coming soon - Backend update endpoint needed"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(record.id)}
                            className="opacity-50"
                            title="Coming soon - Backend delete endpoint needed"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function Competitions() {
  return (
    <DashboardLayout>
      <CompetitionsContent />
    </DashboardLayout>
  );
}
