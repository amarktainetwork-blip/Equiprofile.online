import { useState } from "react";
import { Plus, FileText, Calendar as CalendarIcon, Download, Clock, Mail, Trash2, RefreshCw, Eye } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Checkbox } from "../components/ui/checkbox";
import { toast } from "sonner";
import { trpc } from "../lib/trpc";
import { format } from "date-fns";
import jsPDF from "jspdf";

const REPORT_TYPES = [
  { value: 'monthly_summary', label: 'Monthly Summary' },
  { value: 'health_report', label: 'Health Report' },
  { value: 'training_progress', label: 'Training Progress' },
  { value: 'cost_analysis', label: 'Cost Analysis' },
  { value: 'competition_summary', label: 'Competition Summary' },
];

const FREQUENCIES = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
];

// PDF Generation Types
interface ReportDataSummary {
  totalSessions?: number;
  totalHealthRecords?: number;
  totalCosts?: number;
  totalIncome?: number;
  totalExpenses?: number;
  netProfit?: number;
  totalCompetitions?: number;
  vaccinationStatus?: string;
  upcomingAppointments?: number;
  totalHours?: number;
  winRate?: number;
  placements?: { first: number; second: number; third: number };
}

interface ReportData {
  reportType: string;
  horseName?: string;
  startDate?: string;
  endDate?: string;
  generatedDate: string;
  userName?: string;
  summary: ReportDataSummary;
  detailedData?: any[];
}

export default function Reports() {
  const [activeTab, setActiveTab] = useState<'generate' | 'history' | 'schedules'>('generate');
  
  // Generate report state
  const [generateForm, setGenerateForm] = useState({
    reportType: "",
    horseId: "",
    startDate: "",
    endDate: "",
    includeSummary: true,
    includeDetails: true,
    includeCharts: false,
    includeNotes: false,
  });

  const [isGenerating, setIsGenerating] = useState(false);

  // Schedule report state
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    reportType: "",
    frequency: "",
    recipients: "",
  });

  // Queries
  const { data: generatedReports = [], refetch: refetchReports } = trpc.reports.list.useQuery({ limit: 50 });
  const { data: horses = [] } = trpc.horses.list.useQuery();
  const { data: user } = trpc.auth.me.useQuery();

  // Mutations
  const generateReport = trpc.reports.generate.useMutation({
    onSuccess: () => {
      toast.success("Report generated successfully");
      refetchReports();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const scheduleReport = trpc.reports.scheduleReport.useMutation({
    onSuccess: () => {
      toast.success("Report scheduled successfully");
      setIsScheduleDialogOpen(false);
      resetScheduleForm();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // PDF Generation Function
  const generatePDF = async (reportData: ReportData) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPos = 20;
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;

      // Helper function to add new page
      const addNewPage = () => {
        doc.addPage();
        yPos = 20;
      };

      // Helper to check if we need a new page
      const checkPageBreak = (requiredSpace: number) => {
        if (yPos + requiredSpace > pageHeight - 20) {
          addNewPage();
        }
      };

      // Header
      doc.setFillColor(37, 99, 235); // Primary blue
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text('EquiProfile', margin, 20);
      doc.setFontSize(12);
      doc.text(reportData.reportType.replace(/_/g, ' ').toUpperCase(), margin, 30);
      
      yPos = 50;

      // Report Info Section
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      doc.text(`Generated: ${reportData.generatedDate}`, margin, yPos);
      yPos += 6;
      
      if (reportData.horseName) {
        doc.text(`Horse: ${reportData.horseName}`, margin, yPos);
        yPos += 6;
      }
      
      if (reportData.startDate && reportData.endDate) {
        doc.text(`Period: ${reportData.startDate} to ${reportData.endDate}`, margin, yPos);
        yPos += 6;
      }
      
      if (reportData.userName) {
        doc.text(`Generated by: ${reportData.userName}`, margin, yPos);
        yPos += 6;
      }

      yPos += 10;
      checkPageBreak(30);

      // Summary Section (only if summary data exists and has content)
      const hasSummaryData = reportData.summary && Object.keys(reportData.summary).length > 0;
      
      if (hasSummaryData) {
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(37, 99, 235);
        doc.text('Summary', margin, yPos);
        yPos += 10;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(31, 41, 55);

      const summary = reportData.summary;
      
      // Different summary content based on report type
      if (reportData.reportType === 'monthly_summary') {
        const summaryItems = [
          { label: 'Total Training Sessions', value: summary.totalSessions || 0 },
          { label: 'Total Health Records', value: summary.totalHealthRecords || 0 },
          { label: 'Total Costs', value: `$${(summary.totalCosts || 0).toFixed(2)}` },
        ];
        
        summaryItems.forEach(item => {
          checkPageBreak(8);
          doc.setFont('helvetica', 'bold');
          doc.text(`${item.label}:`, margin, yPos);
          doc.setFont('helvetica', 'normal');
          doc.text(`${item.value}`, margin + 70, yPos);
          yPos += 7;
        });
      } else if (reportData.reportType === 'health_report') {
        const healthItems = [
          { label: 'Vaccination Status', value: summary.vaccinationStatus || 'Up to date' },
          { label: 'Upcoming Appointments', value: summary.upcomingAppointments || 0 },
        ];
        
        healthItems.forEach(item => {
          checkPageBreak(8);
          doc.setFont('helvetica', 'bold');
          doc.text(`${item.label}:`, margin, yPos);
          doc.setFont('helvetica', 'normal');
          doc.text(`${item.value}`, margin + 70, yPos);
          yPos += 7;
        });
      } else if (reportData.reportType === 'training_progress') {
        const trainingItems = [
          { label: 'Total Hours', value: `${(summary.totalHours || 0).toFixed(1)} hrs` },
          { label: 'Total Sessions', value: summary.totalSessions || 0 },
        ];
        
        trainingItems.forEach(item => {
          checkPageBreak(8);
          doc.setFont('helvetica', 'bold');
          doc.text(`${item.label}:`, margin, yPos);
          doc.setFont('helvetica', 'normal');
          doc.text(`${item.value}`, margin + 70, yPos);
          yPos += 7;
        });
      } else if (reportData.reportType === 'cost_analysis') {
        const costItems = [
          { label: 'Total Income', value: `$${(summary.totalIncome || 0).toFixed(2)}` },
          { label: 'Total Expenses', value: `$${(summary.totalExpenses || 0).toFixed(2)}` },
          { label: 'Net Profit/Loss', value: `$${(summary.netProfit || 0).toFixed(2)}` },
        ];
        
        costItems.forEach(item => {
          checkPageBreak(8);
          doc.setFont('helvetica', 'bold');
          doc.text(`${item.label}:`, margin, yPos);
          doc.setFont('helvetica', 'normal');
          doc.text(`${item.value}`, margin + 70, yPos);
          yPos += 7;
        });
      } else if (reportData.reportType === 'competition_summary') {
        const compItems = [
          { label: 'Total Competitions', value: summary.totalCompetitions || 0 },
          { label: 'Win Rate', value: `${((summary.winRate || 0) * 100).toFixed(1)}%` },
        ];
        
        if (summary.placements) {
          compItems.push(
            { label: 'First Place', value: summary.placements.first || 0 },
            { label: 'Second Place', value: summary.placements.second || 0 },
            { label: 'Third Place', value: summary.placements.third || 0 }
          );
        }
        
        compItems.forEach(item => {
          checkPageBreak(8);
          doc.setFont('helvetica', 'bold');
          doc.text(`${item.label}:`, margin, yPos);
          doc.setFont('helvetica', 'normal');
          doc.text(`${item.value}`, margin + 70, yPos);
          yPos += 7;
        });
      }

        yPos += 10;
      }

      // Detailed Data Section
      if (reportData.detailedData && reportData.detailedData.length > 0) {
        checkPageBreak(30);
        
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(37, 99, 235);
        doc.text('Detailed Data', margin, yPos);
        yPos += 10;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(31, 41, 55);

        // Table headers
        const headers = Object.keys(reportData.detailedData[0]);
        const colWidth = maxWidth / headers.length;

        checkPageBreak(15);
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPos - 5, maxWidth, 8, 'F');
        doc.setFont('helvetica', 'bold');
        
        headers.forEach((header, i) => {
          const text = header.replace(/([A-Z])/g, ' $1').trim();
          doc.text(text, margin + i * colWidth + 2, yPos);
        });
        
        yPos += 10;

        // Table rows
        doc.setFont('helvetica', 'normal');
        reportData.detailedData.forEach((row, rowIndex) => {
          checkPageBreak(10);
          
          if (rowIndex % 2 === 0) {
            doc.setFillColor(250, 250, 250);
            doc.rect(margin, yPos - 5, maxWidth, 8, 'F');
          }
          
          headers.forEach((header, i) => {
            let value = row[header];
            if (value === null || value === undefined) value = '-';
            if (typeof value === 'object') value = JSON.stringify(value);
            const text = String(value);
            const truncated = text.length > 20 ? text.substring(0, 17) + '...' : text;
            doc.text(truncated, margin + i * colWidth + 2, yPos);
          });
          
          yPos += 8;
        });
      } else {
        checkPageBreak(20);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('No detailed data available for this report.', margin, yPos);
        yPos += 10;
      }

      // Footer on all pages
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Page ${i} of ${pageCount}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
        doc.text(
          `Generated by EquiProfile - ${format(new Date(), 'PP')}`,
          pageWidth / 2,
          pageHeight - 5,
          { align: 'center' }
        );
      }

      return doc;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw error;
    }
  };

  const resetGenerateForm = () => {
    setGenerateForm({
      reportType: "",
      horseId: "",
      startDate: "",
      endDate: "",
      includeSummary: true,
      includeDetails: true,
      includeCharts: false,
      includeNotes: false,
    });
  };

  const resetScheduleForm = () => {
    setScheduleForm({
      reportType: "",
      frequency: "",
      recipients: "",
    });
  };

  const handleGenerateReport = async () => {
    if (!generateForm.reportType) {
      toast.error("Please select a report type");
      return;
    }

    setIsGenerating(true);

    try {
      // First, generate the report in the backend
      const result = await generateReport.mutateAsync({
        reportType: generateForm.reportType as any,
        horseId: generateForm.horseId ? parseInt(generateForm.horseId) : undefined,
        startDate: generateForm.startDate || undefined,
        endDate: generateForm.endDate || undefined,
      });

      // Fetch additional data for the PDF
      const horseName = generateForm.horseId 
        ? horses.find(h => h.id === parseInt(generateForm.horseId))?.name 
        : undefined;

      // Build report data based on type
      const reportData: ReportData = {
        reportType: generateForm.reportType,
        horseName,
        startDate: generateForm.startDate ? format(new Date(generateForm.startDate), 'PP') : undefined,
        endDate: generateForm.endDate ? format(new Date(generateForm.endDate), 'PP') : undefined,
        generatedDate: format(new Date(), 'PPp'),
        userName: user?.username || user?.email || 'User',
        summary: generateForm.includeSummary 
          ? await fetchReportSummary(generateForm.reportType, generateForm.horseId)
          : {},
        detailedData: generateForm.includeDetails 
          ? await fetchDetailedData(generateForm.reportType, generateForm.horseId)
          : undefined,
      };

      // Generate and download PDF
      const pdf = await generatePDF(reportData);
      const fileName = `${generateForm.reportType}_${format(new Date(), 'yyyy-MM-dd')}.pdf`;
      pdf.save(fileName);

      toast.success("Report generated and downloaded successfully");
      resetGenerateForm();
      refetchReports();
    } catch (error) {
      console.error('Report generation error:', error);
      toast.error("Failed to generate report");
    } finally {
      setIsGenerating(false);
    }
  };

  // Fetch summary data based on report type
  // TODO: Replace with actual backend API calls
  const fetchReportSummary = async (reportType: string, horseId?: string): Promise<ReportDataSummary> => {
    // This uses mock data for demonstration. Connect to actual backend endpoints:
    // - trpc.reports.getSummary.useQuery({ reportType, horseId })
    const summary: ReportDataSummary = {};

    switch (reportType) {
      case 'monthly_summary':
        summary.totalSessions = Math.floor(Math.random() * 30) + 10;
        summary.totalHealthRecords = Math.floor(Math.random() * 10) + 3;
        summary.totalCosts = Math.random() * 5000 + 1000;
        break;
      case 'health_report':
        summary.vaccinationStatus = 'Up to date';
        summary.upcomingAppointments = Math.floor(Math.random() * 5);
        break;
      case 'training_progress':
        summary.totalHours = Math.random() * 100 + 20;
        summary.totalSessions = Math.floor(Math.random() * 40) + 10;
        break;
      case 'cost_analysis':
        summary.totalIncome = Math.random() * 10000 + 2000;
        summary.totalExpenses = Math.random() * 8000 + 1500;
        summary.netProfit = (summary.totalIncome || 0) - (summary.totalExpenses || 0);
        break;
      case 'competition_summary':
        summary.totalCompetitions = Math.floor(Math.random() * 15) + 5;
        summary.winRate = Math.random() * 0.5 + 0.2;
        summary.placements = {
          first: Math.floor(Math.random() * 5),
          second: Math.floor(Math.random() * 5),
          third: Math.floor(Math.random() * 5),
        };
        break;
    }

    return summary;
  };

  // Fetch detailed data based on report type
  // TODO: Replace with actual backend API calls
  const fetchDetailedData = async (reportType: string, horseId?: string): Promise<any[]> => {
    // This uses mock data for demonstration. Connect to actual backend endpoints:
    // - trpc.reports.getDetailedData.useQuery({ reportType, horseId })
    const mockData: any[] = [];

    switch (reportType) {
      case 'monthly_summary':
        for (let i = 0; i < 5; i++) {
          mockData.push({
            date: format(new Date(Date.now() - i * 86400000 * 5), 'PP'),
            activity: ['Training', 'Health Check', 'Competition'][i % 3],
            duration: `${Math.floor(Math.random() * 3) + 1}h`,
            cost: `$${(Math.random() * 200 + 50).toFixed(2)}`,
          });
        }
        break;
      case 'health_report':
        for (let i = 0; i < 5; i++) {
          mockData.push({
            date: format(new Date(Date.now() - i * 86400000 * 10), 'PP'),
            type: ['Vaccination', 'Checkup', 'Treatment'][i % 3],
            veterinarian: `Dr. ${['Smith', 'Johnson', 'Williams'][i % 3]}`,
            notes: 'Routine care',
          });
        }
        break;
      case 'training_progress':
        for (let i = 0; i < 5; i++) {
          mockData.push({
            date: format(new Date(Date.now() - i * 86400000 * 3), 'PP'),
            type: ['Dressage', 'Jumping', 'Endurance'][i % 3],
            duration: `${Math.floor(Math.random() * 2) + 1}h`,
            performance: ['Excellent', 'Good', 'Fair'][i % 3],
          });
        }
        break;
      case 'cost_analysis':
        for (let i = 0; i < 5; i++) {
          mockData.push({
            date: format(new Date(Date.now() - i * 86400000 * 7), 'PP'),
            category: ['Feed', 'Vet', 'Farrier', 'Training'][i % 4],
            amount: `$${(Math.random() * 500 + 100).toFixed(2)}`,
            type: i % 2 === 0 ? 'Expense' : 'Income',
          });
        }
        break;
      case 'competition_summary':
        for (let i = 0; i < 5; i++) {
          mockData.push({
            date: format(new Date(Date.now() - i * 86400000 * 14), 'PP'),
            name: `Competition ${i + 1}`,
            placement: ['1st', '2nd', '3rd', '4th', '5th'][i % 5],
            prize: `$${(Math.random() * 1000).toFixed(2)}`,
          });
        }
        break;
    }

    return mockData;
  };

  const handleDownloadReport = async (report: any) => {
    try {
      const horseName = report.horseId 
        ? horses.find(h => h.id === report.horseId)?.name 
        : undefined;

      const reportData: ReportData = {
        reportType: report.reportType,
        horseName,
        generatedDate: format(new Date(report.generatedAt), 'PPp'),
        userName: user?.username || user?.email || 'User',
        summary: await fetchReportSummary(report.reportType, report.horseId?.toString()),
        detailedData: await fetchDetailedData(report.reportType, report.horseId?.toString()),
      };

      const pdf = await generatePDF(reportData);
      const fileName = `${report.reportType}_${format(new Date(report.generatedAt), 'yyyy-MM-dd')}.pdf`;
      pdf.save(fileName);

      toast.success("Report downloaded successfully");
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Failed to download report");
    }
  };

  const handleScheduleReport = () => {
    if (!scheduleForm.reportType || !scheduleForm.frequency || !scheduleForm.recipients) {
      toast.error("Please fill in all required fields");
      return;
    }

    const recipients = scheduleForm.recipients.split(',').map(email => email.trim()).filter(Boolean);
    if (recipients.length === 0) {
      toast.error("Please enter at least one recipient email");
      return;
    }

    scheduleReport.mutate({
      reportType: scheduleForm.reportType as any,
      frequency: scheduleForm.frequency as any,
      recipients,
    });
  };

  const getHorseName = (horseId: number | null) => {
    if (!horseId) return "All Horses";
    const horse = horses.find(h => h.id === horseId);
    return horse?.name || `Horse #${horseId}`;
  };

  const getReportTypeName = (type: string) => {
    return REPORT_TYPES.find(t => t.value === type)?.label || type;
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate comprehensive reports and set up automated schedules</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
          <TabsTrigger value="schedules">Scheduled Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate New Report</CardTitle>
              <CardDescription>Create a comprehensive report for your horses and activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="reportType">Report Type *</Label>
                  <Select 
                    value={generateForm.reportType} 
                    onValueChange={(value) => setGenerateForm({ ...generateForm, reportType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {REPORT_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose the type of report you want to generate
                  </p>
                </div>

                <div>
                  <Label htmlFor="horse">Horse (Optional)</Label>
                  <Select 
                    value={generateForm.horseId} 
                    onValueChange={(value) => setGenerateForm({ ...generateForm, horseId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All horses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Horses</SelectItem>
                      {horses.map((horse) => (
                        <SelectItem key={horse.id} value={horse.id.toString()}>
                          {horse.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-1">
                    Leave blank for all horses
                  </p>
                </div>

                <div>
                  <Label htmlFor="startDate">Start Date (Optional)</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={generateForm.startDate}
                    onChange={(e) => setGenerateForm({ ...generateForm, startDate: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Start of reporting period
                  </p>
                </div>

                <div>
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={generateForm.endDate}
                    onChange={(e) => setGenerateForm({ ...generateForm, endDate: e.target.value })}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    End of reporting period
                  </p>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <Label className="text-base font-semibold">Report Sections</Label>
                <p className="text-sm text-muted-foreground">Select what to include in the report</p>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeSummary" 
                      checked={generateForm.includeSummary}
                      onCheckedChange={(checked) => 
                        setGenerateForm({ ...generateForm, includeSummary: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeSummary" className="font-normal cursor-pointer">
                      Summary Statistics
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="includeDetails" 
                      checked={generateForm.includeDetails}
                      onCheckedChange={(checked) => 
                        setGenerateForm({ ...generateForm, includeDetails: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeDetails" className="font-normal cursor-pointer">
                      Detailed Data Tables
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 opacity-50">
                    <Checkbox 
                      id="includeCharts" 
                      checked={generateForm.includeCharts}
                      disabled
                      onCheckedChange={(checked) => 
                        setGenerateForm({ ...generateForm, includeCharts: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeCharts" className="font-normal cursor-not-allowed">
                      Charts & Graphs <span className="text-xs text-muted-foreground">(Coming soon)</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 opacity-50">
                    <Checkbox 
                      id="includeNotes" 
                      checked={generateForm.includeNotes}
                      disabled
                      onCheckedChange={(checked) => 
                        setGenerateForm({ ...generateForm, includeNotes: checked as boolean })
                      }
                    />
                    <Label htmlFor="includeNotes" className="font-normal cursor-not-allowed">
                      Notes & Comments <span className="text-xs text-muted-foreground">(Coming soon)</span>
                    </Label>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold">What's included:</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li><strong>Monthly Summary:</strong> Overview of all activities, costs, and health records</li>
                  <li><strong>Health Report:</strong> Detailed health records, vaccinations, and upcoming care</li>
                  <li><strong>Training Progress:</strong> Training sessions, performance metrics, and goals</li>
                  <li><strong>Cost Analysis:</strong> Breakdown of expenses by category with trends</li>
                  <li><strong>Competition Summary:</strong> Results, placements, and performance statistics</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleGenerateReport} 
                  disabled={isGenerating || !generateForm.reportType}
                >
                  <Download className="mr-2 h-4 w-4" />
                  {isGenerating ? "Generating PDF..." : "Generate & Download PDF"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsScheduleDialogOpen(true)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Generated Reports</h2>
          </div>

          {generatedReports.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No reports generated yet</p>
                <Button className="mt-4" onClick={() => setActiveTab('generate')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Generate Your First Report
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {generatedReports.map((report) => (
                <Card key={report.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <CardDescription className="mt-1">
                          <Badge variant="outline">
                            {getReportTypeName(report.reportType)}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>{format(new Date(report.generatedAt), "PPp")}</span>
                    </div>
                    {report.horseId && (
                      <div className="text-sm text-muted-foreground">
                        <strong>Horse:</strong> {getHorseName(report.horseId)}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleDownloadReport(report)}
                      >
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setGenerateForm({
                            reportType: report.reportType,
                            horseId: report.horseId?.toString() || "",
                            startDate: "",
                            endDate: "",
                            includeSummary: true,
                            includeDetails: true,
                            includeCharts: false,
                            includeNotes: false,
                          });
                          setActiveTab('generate');
                          toast.info("Report settings loaded");
                        }}
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="schedules" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Scheduled Reports</h2>
            <Button onClick={() => setIsScheduleDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Schedule
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No scheduled reports yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Schedule reports to be generated and emailed automatically at regular intervals
                </p>
                <Button className="mt-4" onClick={() => setIsScheduleDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Your First Report
                </Button>
              </div>
              
              <div className="mt-8 border-t pt-6">
                <h3 className="font-semibold mb-3">Available Schedule Options:</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="font-medium text-sm mb-1">Daily Reports</div>
                    <p className="text-xs text-muted-foreground">
                      Generated every day at midnight
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="font-medium text-sm mb-1">Weekly Reports</div>
                    <p className="text-xs text-muted-foreground">
                      Generated every Monday morning
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="font-medium text-sm mb-1">Monthly Reports</div>
                    <p className="text-xs text-muted-foreground">
                      Generated on the 1st of each month
                    </p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="font-medium text-sm mb-1">Quarterly Reports</div>
                    <p className="text-xs text-muted-foreground">
                      Generated every 3 months
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Schedule Report Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Automatic Report</DialogTitle>
            <DialogDescription>Set up a recurring report to be generated and emailed automatically</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="scheduleReportType">Report Type *</Label>
              <Select 
                value={scheduleForm.reportType} 
                onValueChange={(value) => setScheduleForm({ ...scheduleForm, reportType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="frequency">Frequency *</Label>
              <Select 
                value={scheduleForm.frequency} 
                onValueChange={(value) => setScheduleForm({ ...scheduleForm, frequency: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {FREQUENCIES.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="recipients">Recipients *</Label>
              <Input
                id="recipients"
                value={scheduleForm.recipients}
                onChange={(e) => setScheduleForm({ ...scheduleForm, recipients: e.target.value })}
                placeholder="email1@example.com, email2@example.com"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Comma-separated email addresses
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleScheduleReport}>Schedule Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
