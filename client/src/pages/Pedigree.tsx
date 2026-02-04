import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { trpc } from '../lib/trpc';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Plus, Edit, GitBranch } from 'lucide-react';
import { toast } from 'sonner';
import { useRealtimeModule } from '../hooks/useRealtime';

export default function Pedigree() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHorseId, setSelectedHorseId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    sireName: '',
    damName: '',
    sireOfSireName: '',
    damOfSireName: '',
    sireOfDamName: '',
    damOfDamName: '',
  });

  const { data: horses = [] } = trpc.horses.list.useQuery();
  const { data: pedigreeData, refetch } = trpc.pedigree.get.useQuery(
    { horseId: selectedHorseId! },
    { enabled: !!selectedHorseId }
  );
  const createOrUpdateMutation = trpc.pedigree.createOrUpdate.useMutation();

  // Real-time subscription
  useRealtimeModule('pedigree', (action, data) => {
    if (action === 'updated') {
      if (data.horseId === selectedHorseId) {
        refetch();
        toast.info('Pedigree updated');
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHorseId) return;

    try {
      await createOrUpdateMutation.mutateAsync({
        horseId: selectedHorseId,
        ...formData,
      });

      toast.success('Pedigree saved successfully');
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error('Failed to save pedigree');
    }
  };

  const handleEdit = () => {
    if (pedigreeData) {
      setFormData({
        sireName: pedigreeData.sireName || '',
        damName: pedigreeData.damName || '',
        sireOfSireName: pedigreeData.sireOfSireName || '',
        damOfSireName: pedigreeData.damOfSireName || '',
        sireOfDamName: pedigreeData.sireOfDamName || '',
        damOfDamName: pedigreeData.damOfDamName || '',
      });
      setIsDialogOpen(true);
    }
  };

  const resetForm = () => {
    setFormData({
      sireName: '',
      damName: '',
      sireOfSireName: '',
      damOfSireName: '',
      sireOfDamName: '',
      damOfDamName: '',
    });
  };

  const selectedHorse = horses.find((h: any) => h.id === selectedHorseId);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Pedigree</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select Horse</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedHorseId?.toString() || ''}
              onValueChange={(value) => setSelectedHorseId(parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a horse to view pedigree" />
              </SelectTrigger>
              <SelectContent>
                {horses.map((horse: any) => (
                  <SelectItem key={horse.id} value={horse.id.toString()}>
                    {horse.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedHorseId && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">{selectedHorse?.name}'s Pedigree</h2>
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
              }}>
                <DialogTrigger asChild>
                  <Button onClick={pedigreeData ? handleEdit : undefined}>
                    {pedigreeData ? <><Edit className="mr-2 h-4 w-4" /> Edit Pedigree</> : <><Plus className="mr-2 h-4 w-4" /> Add Pedigree</>}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{pedigreeData ? 'Edit Pedigree' : 'Add Pedigree'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Parents</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="sireName">Sire (Father)</Label>
                          <Input
                            id="sireName"
                            value={formData.sireName}
                            onChange={(e) => setFormData({ ...formData, sireName: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="damName">Dam (Mother)</Label>
                          <Input
                            id="damName"
                            value={formData.damName}
                            onChange={(e) => setFormData({ ...formData, damName: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Grandparents</h3>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Paternal (Father's side)</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="sireOfSireName">Paternal Grandsire</Label>
                            <Input
                              id="sireOfSireName"
                              value={formData.sireOfSireName}
                              onChange={(e) => setFormData({ ...formData, sireOfSireName: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="damOfSireName">Paternal Granddam</Label>
                            <Input
                              id="damOfSireName"
                              value={formData.damOfSireName}
                              onChange={(e) => setFormData({ ...formData, damOfSireName: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Maternal (Mother's side)</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="sireOfDamName">Maternal Grandsire</Label>
                            <Input
                              id="sireOfDamName"
                              value={formData.sireOfDamName}
                              onChange={(e) => setFormData({ ...formData, sireOfDamName: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="damOfDamName">Maternal Granddam</Label>
                            <Input
                              id="damOfDamName"
                              value={formData.damOfDamName}
                              onChange={(e) => setFormData({ ...formData, damOfDamName: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        Save Pedigree
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {pedigreeData ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GitBranch className="h-5 w-5" />
                    Pedigree Tree
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Generation 1: Parents */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-blue-50">
                        <CardContent className="pt-4">
                          <p className="text-sm text-gray-600">Sire (Father)</p>
                          <p className="font-semibold">{pedigreeData.sireName || 'Not recorded'}</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-pink-50">
                        <CardContent className="pt-4">
                          <p className="text-sm text-gray-600">Dam (Mother)</p>
                          <p className="font-semibold">{pedigreeData.damName || 'Not recorded'}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Generation 2: Grandparents */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Grandparents</h4>
                      <div className="grid grid-cols-4 gap-2">
                        <Card className="bg-blue-50">
                          <CardContent className="pt-3">
                            <p className="text-xs text-gray-600">Paternal Grandsire</p>
                            <p className="text-sm font-medium">{pedigreeData.sireOfSireName || '-'}</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-pink-50">
                          <CardContent className="pt-3">
                            <p className="text-xs text-gray-600">Paternal Granddam</p>
                            <p className="text-sm font-medium">{pedigreeData.damOfSireName || '-'}</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-blue-50">
                          <CardContent className="pt-3">
                            <p className="text-xs text-gray-600">Maternal Grandsire</p>
                            <p className="text-sm font-medium">{pedigreeData.sireOfDamName || '-'}</p>
                          </CardContent>
                        </Card>
                        <Card className="bg-pink-50">
                          <CardContent className="pt-3">
                            <p className="text-xs text-gray-600">Maternal Granddam</p>
                            <p className="text-sm font-medium">{pedigreeData.damOfDamName || '-'}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <GitBranch className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">No pedigree information recorded</p>
                  <p className="text-sm text-gray-500 mb-4">Click "Add Pedigree" to record lineage information</p>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {!selectedHorseId && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <GitBranch className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">Select a horse to view or edit pedigree</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
