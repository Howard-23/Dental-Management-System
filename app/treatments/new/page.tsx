'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { patients, services, staff } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function NewTreatmentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    patientId: '',
    dentistId: '',
    diagnosis: '',
    notes: '',
    procedures: [] as { serviceId: string; teeth: string; description: string }[],
  });

  const addProcedure = () => {
    setFormData(prev => ({
      ...prev,
      procedures: [...prev.procedures, { serviceId: '', teeth: '', description: '' }]
    }));
  };

  const removeProcedure = (index: number) => {
    setFormData(prev => ({
      ...prev,
      procedures: prev.procedures.filter((_, i) => i !== index)
    }));
  };

  const updateProcedure = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      procedures: prev.procedures.map((proc, i) => i === index ? { ...proc, [field]: value } : proc)
    }));
  };

  const handleSubmit = async () => {
    if (!formData.patientId || !formData.dentistId || formData.procedures.length === 0) {
      toast({ title: 'Error', description: 'Please fill in all required fields' });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({ title: 'Success!', description: 'Treatment record saved.' });
    router.push('/treatments');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/treatments">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">New Treatment Record</h1>
          <p className="text-slate-500">Record a completed dental procedure</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient & Provider</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <Label>Patient</Label>
            <Select value={formData.patientId} onValueChange={(v) => setFormData({...formData, patientId: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.firstName} {p.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Dentist</Label>
            <Select value={formData.dentistId} onValueChange={(v) => setFormData({...formData, dentistId: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Select dentist" />
              </SelectTrigger>
              <SelectContent>
                {staff.filter(s => s.role === 'dentist').map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.firstName} {d.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Diagnosis & Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Diagnosis</Label>
            <Input
              value={formData.diagnosis}
              onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
              placeholder="e.g., Generalized mild gingivitis"
            />
          </div>
          <div>
            <Label>Treatment Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Enter detailed notes about the treatment..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Procedures Performed</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addProcedure}>
            <Plus className="w-4 h-4 mr-2" />
            Add Procedure
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.procedures.map((proc, index) => (
            <div key={index} className="p-4 bg-slate-50 rounded-xl space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <Label className="text-xs">Service</Label>
                  <Select value={proc.serviceId} onValueChange={(v) => updateProcedure(index, 'serviceId', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1">
                  <Label className="text-xs">Teeth (optional)</Label>
                  <Input
                    value={proc.teeth}
                    onChange={(e) => updateProcedure(index, 'teeth', e.target.value)}
                    placeholder="e.g., 14, 15"
                  />
                </div>
                <div className="flex items-end">
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeProcedure(index)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-xs">Description</Label>
                <Textarea
                  value={proc.description}
                  onChange={(e) => updateProcedure(index, 'description', e.target.value)}
                  placeholder="Procedure details..."
                  rows={2}
                />
              </div>
            </div>
          ))}
          
          {formData.procedures.length === 0 && (
            <p className="text-center text-slate-500 py-8">No procedures added. Click &quot;Add Procedure&quot; to add.</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href="/treatments">Cancel</Link>
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600">
          {isSubmitting ? 'Saving...' : 'Save Treatment Record'}
        </Button>
      </div>
    </div>
  );
}
