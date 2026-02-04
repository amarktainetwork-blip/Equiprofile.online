import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Plus, TrendingUp, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRealtimeModule } from "@/hooks/useRealtime";

function IncomeContent() {
  const [filters, setFilters] = useState({
    horseId: undefined as number | undefined,
    startDate: "",
    endDate: "",
    source: undefined as string | undefined,
  });

  const { data: incomeRecords, isLoading } = trpc.income.list.useQuery(filters);
  const { data: stats } = trpc.income.getStats.useQuery(filters);
  const { data: horses } = trpc.horses.list.useQuery();
  
  const [localIncome, setLocalIncome] = useState(incomeRecords || []);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    horseId: "",
    incomeDate: "",
    source: "lesson",
    description: "",
    amount: "",
    paymentMethod: "",
    reference: "",
    taxable: true,
    category: "",
    notes: "",
  });

  // Real-time updates
  useRealtimeModule('income', (action, data) => {
    switch (action) {
      case 'created':
        setLocalIncome(prev => [data, ...prev]);
        toast.success('Income record created');
        break;
      case 'updated':
        setLocalIncome(prev => 
          prev.map(r => r.id === data.id ? { ...r, ...data } : r)
        );
        toast.success('Income record updated');
        break;
      case 'deleted':
        setLocalIncome(prev => prev.filter(r => r.id !== data.id));
        toast.success('Income record deleted');
        break;
    }
  });

  useEffect(() => {
    if (incomeRecords) setLocalIncome(incomeRecords);
  }, [incomeRecords]);

  const createMutation = trpc.income.create.useMutation({
    onSuccess: () => {
      setIsCreateOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create income record");
    },
  });

  const updateMutation = trpc.income.update.useMutation({
    onSuccess: () => {
      setIsCreateOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update income record");
    },
  });

  const deleteMutation = trpc.income.delete.useMutation({
    onError: (error) => {
      toast.error(error.message || "Failed to delete income record");
    },
  });

  const resetForm = () => {
    setFormData({
      horseId: "",
      incomeDate: "",
      source: "lesson",
      description: "",
      amount: "",
      paymentMethod: "",
      reference: "",
      taxable: true,
      category: "",
      notes: "",
    });
    setEditingRecord(null);
  };

  const handleSubmit = () => {
    if (!formData.incomeDate || !formData.source || !formData.amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    const amountInPence = Math.round(parseFloat(formData.amount) * 100);

    const data = {
      horseId: formData.horseId ? parseInt(formData.horseId) : undefined,
      incomeDate: formData.incomeDate,
      source: formData.source as any,
      description: formData.description || undefined,
      amount: amountInPence,
      paymentMethod: formData.paymentMethod ? formData.paymentMethod as any : undefined,
      reference: formData.reference || undefined,
      taxable: formData.taxable,
      category: formData.category || undefined,
      notes: formData.notes || undefined,
    };

    if (editingRecord) {
      updateMutation.mutate({ id: editingRecord.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    setFormData({
      horseId: record.horseId?.toString() || "",
      incomeDate: record.incomeDate?.split('T')[0] || "",
      source: record.source || "lesson",
      description: record.description || "",
      amount: record.amount ? (record.amount / 100).toFixed(2) : "",
      paymentMethod: record.paymentMethod || "",
      reference: record.reference || "",
      taxable: record.taxable ?? true,
      category: record.category || "",
      notes: record.notes || "",
    });
    setIsCreateOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this income record?")) return;
    deleteMutation.mutate({ id });
  };

  const getHorseName = (horseId: number | null) => {
    if (!horseId) return "General";
    const horse = horses?.find(h => h.id === horseId);
    return horse?.name || "Unknown";
  };

  const getSourceBadge = (source: string) => {
    const colors: Record<string, string> = {
      lesson: "bg-blue-500",
      training: "bg-purple-500",
      sale: "bg-green-500",
      stud: "bg-pink-500",
      prize: "bg-yellow-500",
      boarding: "bg-orange-500",
      sponsorship: "bg-indigo-500",
      other: "bg-gray-500",
    };
    return (
      <Badge className={colors[source] || "bg-gray-500"}>
        {source.charAt(0).toUpperCase() + source.slice(1)}
      </Badge>
    );
  };

  const formatCurrency = (pence: number) => {
    return `£${(pence / 100).toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return <div>Loading income records...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-green-600" />
            Income
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage income records
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Income
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingRecord ? "Edit Income Record" : "Add Income Record"}</DialogTitle>
              <DialogDescription>
                {editingRecord ? "Update income record details" : "Record a new income transaction"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="horse">Horse</Label>
                  <Select value={formData.horseId} onValueChange={(value) => setFormData({ ...formData, horseId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="General" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">General</SelectItem>
                      {horses?.map((horse) => (
                        <SelectItem key={horse.id} value={horse.id.toString()}>
                          {horse.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="incomeDate">Income Date *</Label>
                  <Input
                    id="incomeDate"
                    type="date"
                    value={formData.incomeDate}
                    onChange={(e) => setFormData({ ...formData, incomeDate: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="source">Source *</Label>
                  <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lesson">Lesson</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="stud">Stud</SelectItem>
                      <SelectItem value="prize">Prize</SelectItem>
                      <SelectItem value="boarding">Boarding</SelectItem>
                      <SelectItem value="sponsorship">Sponsorship</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="amount">Amount (£) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of income"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="reference">Reference</Label>
                  <Input
                    id="reference"
                    value={formData.reference}
                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    placeholder="Invoice number, etc."
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Optional custom category"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="taxable"
                  checked={formData.taxable}
                  onCheckedChange={(checked) => setFormData({ ...formData, taxable: checked as boolean })}
                />
                <Label htmlFor="taxable" className="cursor-pointer">Taxable income</Label>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes..."
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
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) ? "Saving..." : editingRecord ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats?.total || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.count || 0} records
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Breakdown by Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {stats?.bySource && stats.bySource.length > 0 ? (
                stats.bySource.map((item: any) => (
                  <div key={item.source} className="flex items-center gap-2 text-sm">
                    {getSourceBadge(item.source)}
                    <span className="font-semibold">{formatCurrency(item.amount)}</span>
                    <span className="text-muted-foreground">({item.count})</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No income records yet</p>
              )}
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
              <Label htmlFor="filterSource">Source</Label>
              <Select 
                value={filters.source || ""} 
                onValueChange={(value) => setFilters({ ...filters, source: value || undefined })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All sources</SelectItem>
                  <SelectItem value="lesson">Lesson</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                  <SelectItem value="stud">Stud</SelectItem>
                  <SelectItem value="prize">Prize</SelectItem>
                  <SelectItem value="boarding">Boarding</SelectItem>
                  <SelectItem value="sponsorship">Sponsorship</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
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

      {/* Income Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Income Records</CardTitle>
          <CardDescription>All income transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {localIncome.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No income records found. Click "Add Income" to create your first record.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Horse</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localIncome.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(record.incomeDate)}
                      </TableCell>
                      <TableCell>{getSourceBadge(record.source)}</TableCell>
                      <TableCell>{record.description || "-"}</TableCell>
                      <TableCell>{getHorseName(record.horseId)}</TableCell>
                      <TableCell className="text-right font-semibold text-green-600">
                        {formatCurrency(record.amount)}
                      </TableCell>
                      <TableCell className="capitalize">
                        {record.paymentMethod?.replace('_', ' ') || "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(record)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(record.id)}
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

export default function Income() {
  return (
    <DashboardLayout>
      <IncomeContent />
    </DashboardLayout>
  );
}
