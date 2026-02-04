import { useState, useRef } from 'react';
import { trpc } from '../_core/trpc';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { useRealtimeModule } from '../hooks/useRealtime';
import { PlusCircle, Edit2, Trash2, FileImage, Upload, Download, Image } from 'lucide-react';

export default function Xrays() {
  return (
    <DashboardLayout>
      <XraysContent />
    </DashboardLayout>
  );
}

function XraysContent() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingXray, setEditingXray] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    horseId: '',
    xrayDate: new Date().toISOString().split('T')[0],
    bodyPart: '',
    vetName: '',
    vetClinic: '',
    findings: '',
    diagnosis: '',
    fileUrl: '',
    fileName: '',
    fileSize: 0,
    fileMimeType: '',
    cost: 0,
    notes: ''
  });

  const { data: horses } = trpc.horses.list.useQuery();
  const { data: xrays, refetch } = trpc.xrays.list.useQuery();
  const [localXrays, setLocalXrays] = useState(xrays || []);

  // Real-time updates
  useRealtimeModule('xrays', (action, data) => {
    if (action === 'created') {
      setLocalXrays(prev => [data, ...(prev || [])]);
      toast({ title: 'New x-ray added' });
    } else if (action === 'updated') {
      setLocalXrays(prev => (prev || []).map(x => x.id === data.id ? { ...x, ...data } : x));
    } else if (action === 'deleted') {
      setLocalXrays(prev => (prev || []).filter(x => x.id !== data.id));
    }
  });

  // Update local state when data loads
  useState(() => {
    if (xrays) setLocalXrays(xrays);
  });

  const createMutation = trpc.xrays.create.useMutation({
    onSuccess: () => {
      toast({ title: 'X-ray record created successfully' });
      setIsDialogOpen(false);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  });

  const updateMutation = trpc.xrays.update.useMutation({
    onSuccess: () => {
      toast({ title: 'X-ray record updated successfully' });
      setIsDialogOpen(false);
      setEditingXray(null);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  });

  const deleteMutation = trpc.xrays.delete.useMutation({
    onSuccess: () => {
      toast({ title: 'X-ray record deleted' });
      refetch();
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  });

  const uploadMutation = trpc.xrays.upload.useMutation({
    onSuccess: () => {
      toast({ title: 'X-ray uploaded successfully' });
      setIsDialogOpen(false);
      resetForm();
      setSelectedFile(null);
      refetch();
    },
    onError: (error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      setUploading(false);
    }
  });

  const resetForm = () => {
    setFormData({
      horseId: '',
      xrayDate: new Date().toISOString().split('T')[0],
      bodyPart: '',
      vetName: '',
      vetClinic: '',
      findings: '',
      diagnosis: '',
      fileUrl: '',
      fileName: '',
      fileSize: 0,
      fileMimeType: '',
      cost: 0,
      notes: ''
    });
    setSelectedFile(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({ title: 'Error', description: 'Please select an image file', variant: 'destructive' });
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        toast({ title: 'Error', description: 'File size must be less than 20MB', variant: 'destructive' });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({ title: 'Error', description: 'Please select an image file', variant: 'destructive' });
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        toast({ title: 'Error', description: 'File size must be less than 20MB', variant: 'destructive' });
        return;
      }
      setSelectedFile(file);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.horseId || !formData.bodyPart) {
      toast({ title: 'Error', description: 'Please fill in required fields', variant: 'destructive' });
      return;
    }

    if (editingXray) {
      // Update existing xray (without file upload for now in update)
      const costInPence = Math.round(parseFloat(formData.cost.toString()) * 100);
      updateMutation.mutate({
        id: editingXray.id,
        horseId: parseInt(formData.horseId),
        xrayDate: formData.xrayDate,
        bodyPart: formData.bodyPart,
        vetName: formData.vetName || undefined,
        vetClinic: formData.vetClinic || undefined,
        findings: formData.findings || undefined,
        diagnosis: formData.diagnosis || undefined,
        cost: costInPence,
        notes: formData.notes || undefined,
      });
    } else {
      // Create new xray with file upload
      if (!selectedFile) {
        toast({ title: 'Error', description: 'Please select an X-ray image', variant: 'destructive' });
        return;
      }

      setUploading(true);
      try {
        const reader = new FileReader();
        reader.onload = async () => {
          const base64 = (reader.result as string).split(',')[1];
          const costInPence = Math.round(parseFloat(formData.cost.toString()) * 100);
          
          uploadMutation.mutate({
            horseId: parseInt(formData.horseId),
            xrayDate: formData.xrayDate,
            bodyPart: formData.bodyPart,
            fileName: selectedFile.name,
            fileData: base64,
            fileType: selectedFile.type,
            fileSize: selectedFile.size,
            vetName: formData.vetName || undefined,
            vetClinic: formData.vetClinic || undefined,
            findings: formData.findings || undefined,
            diagnosis: formData.diagnosis || undefined,
            cost: costInPence,
            notes: formData.notes || undefined,
          });
        };
        reader.readAsDataURL(selectedFile);
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to upload file', variant: 'destructive' });
        setUploading(false);
      }
    }
  };

  const handleEdit = (xray: any) => {
    setEditingXray(xray);
    setFormData({
      horseId: xray.horseId ? xray.horseId.toString() : '',
      xrayDate: xray.xrayDate?.split('T')[0] || new Date().toISOString().split('T')[0],
      bodyPart: xray.bodyPart || '',
      vetName: xray.vetName || '',
      vetClinic: xray.vetClinic || '',
      findings: xray.findings || '',
      diagnosis: xray.diagnosis || '',
      fileUrl: xray.fileUrl || '',
      fileName: xray.fileName || '',
      fileSize: xray.fileSize || 0,
      fileMimeType: xray.mimeType || '',
      cost: (xray.cost || 0) / 100,
      notes: xray.notes || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this x-ray record?')) {
      deleteMutation.mutate({ id });
    }
  };

  const getHorseName = (horseId: number) => {
    const horse = horses?.find(h => h.id === horseId);
    return horse ? horse.name : 'Unknown Horse';
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">X-rays</h1>
          <p className="text-muted-foreground">Manage x-ray records and imaging</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingXray(null); resetForm(); }}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add X-ray Record
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingXray ? 'Edit X-ray Record' : 'New X-ray Record'}</DialogTitle>
              <DialogDescription>
                {editingXray ? 'Update x-ray record details' : 'Add a new x-ray record'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                {!editingXray && (
                  <div className="grid gap-2">
                    <Label>X-ray Image *</Label>
                    <div 
                      className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/png,image/jpg,image/dicom"
                        onChange={handleFileSelect}
                      />
                      {selectedFile ? (
                        <div className="flex items-center justify-center gap-3">
                          <Image className="w-8 h-8 text-primary" />
                          <div className="text-left">
                            <p className="font-medium">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatFileSize(selectedFile.size)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Drop X-ray image here or click to browse
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            JPG, PNG, DICOM (max 20MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="grid gap-2">
                  <Label htmlFor="horseId">Horse *</Label>
                  <Select value={formData.horseId} onValueChange={(value) => setFormData({...formData, horseId: value})} required>
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="xrayDate">Date *</Label>
                    <Input
                      id="xrayDate"
                      type="date"
                      value={formData.xrayDate}
                      onChange={(e) => setFormData({...formData, xrayDate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bodyPart">Body Part *</Label>
                    <Input
                      id="bodyPart"
                      placeholder="e.g., Left front leg"
                      value={formData.bodyPart}
                      onChange={(e) => setFormData({...formData, bodyPart: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="vetName">Vet Name</Label>
                    <Input
                      id="vetName"
                      placeholder="Vet name"
                      value={formData.vetName}
                      onChange={(e) => setFormData({...formData, vetName: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="vetClinic">Vet Clinic</Label>
                    <Input
                      id="vetClinic"
                      placeholder="Clinic name"
                      value={formData.vetClinic}
                      onChange={(e) => setFormData({...formData, vetClinic: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="findings">Findings</Label>
                  <Textarea
                    id="findings"
                    placeholder="X-ray findings..."
                    value={formData.findings}
                    onChange={(e) => setFormData({...formData, findings: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Textarea
                    id="diagnosis"
                    placeholder="Diagnosis..."
                    value={formData.diagnosis}
                    onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="cost">Cost (£)</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.cost}
                      onChange={(e) => setFormData({...formData, cost: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={2}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={uploading || uploadMutation.isPending || updateMutation.isPending}>
                  {uploading || uploadMutation.isPending ? 'Uploading...' : editingXray ? 'Update Record' : 'Upload X-ray'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {localXrays && localXrays.length > 0 ? (
          localXrays.map((xray: any) => (
            <Card key={xray.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileImage className="h-5 w-5" />
                      {getHorseName(xray.horseId)} - {xray.bodyPart}
                    </CardTitle>
                    <CardDescription>
                      {new Date(xray.date).toLocaleDateString()} • {xray.vetName || 'No vet specified'}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(xray)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(xray.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-[200px_1fr] gap-4">
                  {xray.fileUrl && (
                    <div className="w-full h-48 rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={xray.fileUrl} 
                        alt={`X-ray of ${xray.bodyPart}`} 
                        className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => window.open(xray.fileUrl, '_blank')}
                      />
                    </div>
                  )}
                  <div className="grid gap-2 text-sm">
                    {xray.vetClinic && (
                      <div>
                        <span className="font-medium">Clinic:</span> {xray.vetClinic}
                      </div>
                    )}
                    {xray.findings && (
                      <div>
                        <span className="font-medium">Findings:</span> {xray.findings}
                      </div>
                    )}
                    {xray.diagnosis && (
                      <div>
                        <span className="font-medium">Diagnosis:</span> {xray.diagnosis}
                      </div>
                    )}
                    {xray.cost > 0 && (
                      <div>
                        <span className="font-medium">Cost:</span> £{(xray.cost / 100).toFixed(2)}
                      </div>
                    )}
                    {xray.notes && (
                      <div>
                        <span className="font-medium">Notes:</span> {xray.notes}
                      </div>
                    )}
                    {xray.fileUrl && (
                      <div className="mt-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={xray.fileUrl} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" />
                            Download X-ray
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileImage className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No x-ray records yet. Add your first record above.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
