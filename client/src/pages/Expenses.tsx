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
import { Plus, TrendingDown, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRealtimeModule } from "@/hooks/useRealtime";

type ExpenseCategory = "feed" | "vet" | "farrier" | "equipment" | "transport" | "insurance" | "training" | "competition" | "boarding" | "supplies" | "maintenance" | "other";
type PaymentMethod = "cash" | "bank_transfer" | "card" | "check" | "other";

type ExpenseRecord = {
  id: number;
  expenseDate: string;
  category: ExpenseCategory;
  description: string | null;
  amount: number;
  horseId: number | null;
  vendor: string | null;
  paymentMethod: PaymentMethod | null;
  reference: string | null;
  taxDeductible: boolean;
  receiptUrl: string | null;
  subcategory: string | null;
  notes: string | null;
};

type ExpenseBreakdown = {
  category: ExpenseCategory;
  amount: number;
  count: number;
};

type ExpenseStats = {
  total: number;
  count: number;
  byCategory: ExpenseBreakdown[];
};

function ExpensesContent() {
  const [filters, setFilters] = useState({
    horseId: undefined as number | undefined,
    startDate: "",
    endDate: "",
    category: undefined as string | undefined,
  });

  const { data: expenseRecords, isLoading } = trpc.expenses.list.useQuery(filters);
  const { data: stats } = trpc.expenses.getStats.useQuery(filters);
  const { data: horses } = trpc.horses.list.useQuery();
  
  const [localExpenses, setLocalExpenses] = useState(expenseRecords || []);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ExpenseRecord | null>(null);
  
  const [formData, setFormData] = useState({
    horseId: "",
    expenseDate: "",
    category: "feed",
    description: "",
    amount: "",
    vendor: "",
    paymentMethod: "",
    reference: "",
    taxDeductible: false,
    receiptUrl: "",
    subcategory: "",
    notes: "",
  });

  // Real-time updates
  useRealtimeModule('expenses', (action, data) => {
    switch (action) {
      case 'created':
        setLocalExpenses(prev => [data, ...prev]);
        toast.success('Expense record created');
        break;
      case 'updated':
        setLocalExpenses(prev => 
          prev.map(r => r.id === data.id ? { ...r, ...data } : r)
        );
        toast.success('Expense record updated');
        break;
      case 'deleted':
        setLocalExpenses(prev => prev.filter(r => r.id !== data.id));
        toast.success('Expense record deleted');
        break;
    }
  });

  useEffect(() => {
    if (expenseRecords) setLocalExpenses(expenseRecords);
  }, [expenseRecords]);

  const createMutation = trpc.expenses.create.useMutation({
    onSuccess: () => {
      setIsCreateOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create expense record");
    },
  });

  const updateMutation = trpc.expenses.update.useMutation({
    onSuccess: () => {
      setIsCreateOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update expense record");
    },
  });

  const deleteMutation = trpc.expenses.delete.useMutation({
    onError: (error) => {
      toast.error(error.message || "Failed to delete expense record");
    },
  });

  const resetForm = () => {
    setFormData({
      horseId: "",
      expenseDate: "",
      category: "feed",
      description: "",
      amount: "",
      vendor: "",
      paymentMethod: "",
      reference: "",
      taxDeductible: false,
      receiptUrl: "",
      subcategory: "",
      notes: "",
    });
    setEditingRecord(null);
  };

  const handleSubmit = () => {
    if (!formData.expenseDate || !formData.category || !formData.amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    const amountInPence = Math.round(parseFloat(formData.amount) * 100);

    const data = {
      horseId: formData.horseId ? parseInt(formData.horseId) : undefined,
      expenseDate: formData.expenseDate,
      category: formData.category as ExpenseCategory,
      description: formData.description || undefined,
      amount: amountInPence,
      vendor: formData.vendor || undefined,
      paymentMethod: formData.paymentMethod ? formData.paymentMethod as PaymentMethod : undefined,
      reference: formData.reference || undefined,
      taxDeductible: formData.taxDeductible,
      receiptUrl: formData.receiptUrl || undefined,
      subcategory: formData.subcategory || undefined,
      notes: formData.notes || undefined,
    };

    if (editingRecord) {
      updateMutation.mutate({ id: editingRecord.id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (record: ExpenseRecord) => {
    setEditingRecord(record);
    setFormData({
      horseId: record.horseId?.toString() || "",
      expenseDate: record.expenseDate?.split('T')[0] || "",
      category: record.category || "feed",
      description: record.description || "",
      amount: record.amount ? (record.amount / 100).toFixed(2) : "",
      vendor: record.vendor || "",
      paymentMethod: record.paymentMethod || "",
      reference: record.reference || "",
      taxDeductible: record.taxDeductible ?? false,
      receiptUrl: record.receiptUrl || "",
      subcategory: record.subcategory || "",
      notes: record.notes || "",
    });
    setIsCreateOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this expense record?")) return;
    deleteMutation.mutate({ id });
  };

  const getHorseName = (horseId: number | null) => {
    if (!horseId) return "General";
    const horse = horses?.find(h => h.id === horseId);
    return horse?.name || "Unknown";
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      feed: "bg-amber-500",
      vet: "bg-red-500",
      farrier: "bg-slate-600",
      equipment: "bg-blue-500",
      transport: "bg-cyan-500",
      insurance: "bg-purple-500",
      training: "bg-indigo-500",
      competition: "bg-green-500",
      boarding: "bg-orange-500",
      supplies: "bg-yellow-500",
      maintenance: "bg-stone-500",
      other: "bg-gray-500",
    };
    return (
      <Badge className={colors[category] || "bg-gray-500"}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
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
    return <div>Loading expense records...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground flex items-center gap-2">
            <TrendingDown className="w-8 h-8 text-red-600" />
            Expenses
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage expense records
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingRecord ? "Edit Expense Record" : "Add Expense Record"}</DialogTitle>
              <DialogDescription>
                {editingRecord ? "Update expense record details" : "Record a new expense transaction"}
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
                  <Label htmlFor="expenseDate">Expense Date *</Label>
                  <Input
                    id="expenseDate"
                    type="date"
                    value={formData.expenseDate}
                    onChange={(e) => setFormData({ ...formData, expenseDate: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feed">Feed</SelectItem>
                      <SelectItem value="vet">Vet</SelectItem>
                      <SelectItem value="farrier">Farrier</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="competition">Competition</SelectItem>
                      <SelectItem value="boarding">Boarding</SelectItem>
                      <SelectItem value="supplies">Supplies</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
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
                  placeholder="Brief description of expense"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input
                    id="vendor"
                    value={formData.vendor}
                    onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                    placeholder="Vendor or supplier name"
                  />
                </div>
                
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
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reference">Reference</Label>
                  <Input
                    id="reference"
                    value={formData.reference}
                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    placeholder="Invoice number"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Input
                    id="subcategory"
                    value={formData.subcategory}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    placeholder="Optional subcategory"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="receiptUrl">Receipt URL</Label>
                <Input
                  id="receiptUrl"
                  value={formData.receiptUrl}
                  onChange={(e) => setFormData({ ...formData, receiptUrl: e.target.value })}
                  placeholder="Link to receipt or invoice"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="taxDeductible"
                  checked={formData.taxDeductible}
                  onCheckedChange={(checked) => setFormData({ ...formData, taxDeductible: checked as boolean })}
                />
                <Label htmlFor="taxDeductible" className="cursor-pointer">Tax deductible expense</Label>
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
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(stats?.total || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats?.count || 0} records
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Breakdown by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {stats?.byCategory && stats.byCategory.length > 0 ? (
                stats.byCategory.map((item: ExpenseBreakdown) => (
                  <div key={item.category} className="flex items-center gap-2 text-sm">
                    {getCategoryBadge(item.category)}
                    <span className="font-semibold">{formatCurrency(item.amount)}</span>
                    <span className="text-muted-foreground">({item.count})</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No expense records yet</p>
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
              <Label htmlFor="filterCategory">Category</Label>
              <Select 
                value={filters.category || ""} 
                onValueChange={(value) => setFilters({ ...filters, category: value || undefined })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All categories</SelectItem>
                  <SelectItem value="feed">Feed</SelectItem>
                  <SelectItem value="vet">Vet</SelectItem>
                  <SelectItem value="farrier">Farrier</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="competition">Competition</SelectItem>
                  <SelectItem value="boarding">Boarding</SelectItem>
                  <SelectItem value="supplies">Supplies</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
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

      {/* Expense Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Records</CardTitle>
          <CardDescription>All expense transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {localExpenses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No expense records found. Click "Add Expense" to create your first record.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Horse</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localExpenses.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="whitespace-nowrap">
                        {formatDate(record.expenseDate)}
                      </TableCell>
                      <TableCell>{getCategoryBadge(record.category)}</TableCell>
                      <TableCell>{record.description || "-"}</TableCell>
                      <TableCell>{getHorseName(record.horseId)}</TableCell>
                      <TableCell>{record.vendor || "-"}</TableCell>
                      <TableCell className="text-right font-semibold text-red-600">
                        {formatCurrency(record.amount)}
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

export default function Expenses() {
  return (
    <DashboardLayout>
      <ExpensesContent />
    </DashboardLayout>
  );
}
