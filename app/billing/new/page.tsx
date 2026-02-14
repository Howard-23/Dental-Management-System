'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { patients, services } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { v4 as uuidv4 } from 'uuid';

export default function NewInvoicePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    patientId: '',
    items: [] as { serviceId: string; quantity: number }[],
  });

  const selectedPatient = patients.find(p => p.id === formData.patientId);
  
  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { serviceId: '', quantity: 1 }]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => i === index ? { ...item, [field]: value } : item)
    }));
  };

  const getItemTotal = (item: { serviceId: string; quantity: number }) => {
    const service = services.find(s => s.id === item.serviceId);
    return (service?.basePrice || 0) * item.quantity;
  };

  const total = formData.items.reduce((sum, item) => sum + getItemTotal(item), 0);

  const handleSubmit = async () => {
    if (!formData.patientId || formData.items.length === 0) {
      toast({ title: 'Error', description: 'Please select a patient and add at least one item' });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Success!',
      description: `Invoice created for ${selectedPatient?.firstName} ${selectedPatient?.lastName}`,
    });
    
    router.push('/billing');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/billing">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Create Invoice</h1>
          <p className="text-slate-500">Generate a new invoice for patient services</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Invoice Items</CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="flex-1">
                <Select value={item.serviceId} onValueChange={(v) => updateItem(index, 'serviceId', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name} - ₱{s.basePrice.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-24">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                />
              </div>
              <div className="w-24 text-right font-semibold">
                ₱{getItemTotal(item).toLocaleString()}
              </div>
              <Button type="button" variant="ghost" size="icon" onClick={() => removeItem(index)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          ))}
          
          {formData.items.length === 0 && (
            <p className="text-center text-slate-500 py-8">No items added. Click &quot;Add Item&quot; to add services.</p>
          )}
          
          {formData.items.length > 0 && (
            <div className="flex justify-end pt-4 border-t">
              <div className="text-right">
                <p className="text-sm text-slate-500">Total</p>
                <p className="text-2xl font-bold">₱{total.toLocaleString()}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href="/billing">Cancel</Link>
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600">
          {isSubmitting ? 'Creating...' : 'Create Invoice'}
        </Button>
      </div>
    </div>
  );
}
