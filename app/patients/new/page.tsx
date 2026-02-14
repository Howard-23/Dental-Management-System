'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

export default function NewPatientPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelationship: '',
    insuranceProvider: '',
    policyNumber: '',
    allergies: '',
    conditions: '',
    medications: '',
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Success!',
      description: `Patient ${formData.firstName} ${formData.lastName} has been registered.`,
    });
    
    router.push('/patients');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/patients">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">New Patient</h1>
          <p className="text-slate-500">Register a new patient</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {['Personal', 'Contact', 'Medical', 'Insurance'].map((label, index) => (
          <div key={label} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              step > index + 1 ? 'bg-emerald-500 text-white' :
              step === index + 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              {step > index + 1 ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${step === index + 1 ? 'text-slate-900' : 'text-slate-500'}`}>
              {label}
            </span>
            {index < 3 && <div className="w-8 h-px bg-slate-200 mx-2" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name *</Label>
              <Input value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
            </div>
            <div>
              <Label>Last Name *</Label>
              <Input value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
            </div>
            <div>
              <Label>Date of Birth</Label>
              <Input type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} />
            </div>
            <div>
              <Label>Gender</Label>
              <Select value={formData.gender} onValueChange={(v) => setFormData({...formData, gender: v})}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
            <div>
              <Label>Address</Label>
              <Textarea value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Emergency Contact</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input value={formData.emergencyName} onChange={(e) => setFormData({...formData, emergencyName: e.target.value})} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={formData.emergencyPhone} onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})} />
                </div>
                <div>
                  <Label>Relationship</Label>
                  <Input value={formData.emergencyRelationship} onChange={(e) => setFormData({...formData, emergencyRelationship: e.target.value})} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Allergies (comma separated)</Label>
              <Input value={formData.allergies} onChange={(e) => setFormData({...formData, allergies: e.target.value})} placeholder="e.g., Penicillin, Latex" />
            </div>
            <div>
              <Label>Medical Conditions</Label>
              <Textarea value={formData.conditions} onChange={(e) => setFormData({...formData, conditions: e.target.value})} placeholder="e.g., Diabetes, Hypertension" />
            </div>
            <div>
              <Label>Current Medications</Label>
              <Textarea value={formData.medications} onChange={(e) => setFormData({...formData, medications: e.target.value})} />
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Insurance Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <Label>Insurance Provider</Label>
              <Input value={formData.insuranceProvider} onChange={(e) => setFormData({...formData, insuranceProvider: e.target.value})} />
            </div>
            <div>
              <Label>Policy Number</Label>
              <Input value={formData.policyNumber} onChange={(e) => setFormData({...formData, policyNumber: e.target.value})} />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(s => s - 1)} disabled={step === 1}>Back</Button>
        {step < 4 ? (
          <Button onClick={() => setStep(s => s + 1)} className="bg-blue-600">Continue</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-emerald-600">
            {isSubmitting ? 'Saving...' : 'Create Patient'}
          </Button>
        )}
      </div>
    </div>
  );
}
