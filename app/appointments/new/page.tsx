'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { patients, services, staff, addAppointment } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { format, addMinutes } from 'date-fns';
import { CalendarIcon, Clock, User, Stethoscope, ArrowLeft, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { v4 as uuidv4 } from 'uuid';

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00',
];

function NewAppointmentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const preselectedPatient = searchParams.get('patient');
  const preselectedService = searchParams.get('service');

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    patientId: preselectedPatient || '',
    dentistId: '',
    serviceIds: preselectedService ? [preselectedService] : [] as string[],
    date: undefined as Date | undefined,
    startTime: '',
    room: '',
    notes: '',
  });

  const selectedPatient = patients.find(p => p.id === formData.patientId);
  const selectedDentist = staff.find(s => s.id === formData.dentistId);
  const selectedServices = services.filter(s => formData.serviceIds.includes(s.id));
  
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);
  const totalCost = selectedServices.reduce((sum, s) => sum + s.basePrice, 0);

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceIds: prev.serviceIds.includes(serviceId)
        ? prev.serviceIds.filter(id => id !== serviceId)
        : [...prev.serviceIds, serviceId]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.patientId || !formData.dentistId || !formData.date || !formData.startTime) {
      toast({ title: 'Error', description: 'Please fill in all required fields' });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const [hours, minutes] = formData.startTime.split(':').map(Number);
    const startDateTime = new Date(formData.date);
    startDateTime.setHours(hours, minutes);
    
    const endDateTime = addMinutes(startDateTime, totalDuration);
    const endTime = `${endDateTime.getHours().toString().padStart(2, '0')}:${endDateTime.getMinutes().toString().padStart(2, '0')}`;

    const newAppointment = {
      id: uuidv4(),
      patientId: formData.patientId,
      patientName: selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : '',
      dentistId: formData.dentistId,
      dentistName: selectedDentist ? `${selectedDentist.firstName} ${selectedDentist.lastName}` : '',
      serviceIds: formData.serviceIds,
      services: selectedServices.map(s => s.name),
      date: formData.date,
      startTime: formData.startTime,
      endTime,
      duration: totalDuration,
      status: 'scheduled' as const,
      room: formData.room || 'Room 1',
      notes: formData.notes,
      cost: totalCost,
      paid: 0,
      paymentStatus: 'pending' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'current-user',
    };

    addAppointment(newAppointment);
    
    toast({
      title: 'Success!',
      description: `Appointment scheduled for ${format(formData.date, 'MMMM d')} at ${formData.startTime}`,
    });
    
    router.push('/appointments');
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.patientId;
      case 2: return formData.serviceIds.length > 0;
      case 3: return formData.dentistId && formData.date && formData.startTime;
      default: return true;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/appointments">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">New Appointment</h1>
          <p className="text-slate-500">Schedule a new patient appointment</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {['Patient', 'Services', 'Schedule', 'Confirm'].map((label, index) => (
          <div key={label} className="flex items-center">
            <div className={cn(
              'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium',
              step > index + 1 ? 'bg-emerald-500 text-white' :
              step === index + 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
            )}>
              {step > index + 1 ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <span className={cn('ml-2 text-sm font-medium', step === index + 1 ? 'text-slate-900' : 'text-slate-500')}>
              {label}
            </span>
            {index < 3 && <div className="w-8 h-px bg-slate-200 mx-2" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Patient</CardTitle>
            <CardDescription>Choose the patient for this appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => setFormData(prev => ({ ...prev, patientId: patient.id }))}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer',
                    formData.patientId === patient.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                  )}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                    {patient.firstName[0]}{patient.lastName[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{patient.firstName} {patient.lastName}</p>
                    <p className="text-sm text-slate-500">{patient.email}</p>
                  </div>
                  {formData.patientId === patient.id && <Check className="w-5 h-5 text-blue-600" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Services</CardTitle>
            <CardDescription>Choose the dental services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceToggle(service.id)}
                  className={cn(
                    'p-4 rounded-xl border-2 cursor-pointer',
                    formData.serviceIds.includes(service.id) ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                  )}
                >
                  <div className="flex justify-between">
                    <div>
                      <Badge variant="outline">{service.code}</Badge>
                      <p className="font-semibold mt-1">{service.name}</p>
                      <p className="text-sm text-slate-500">{service.duration} min</p>
                    </div>
                    <p className="font-bold">${service.basePrice}</p>
                  </div>
                </div>
              ))}
            </div>
            {selectedServices.length > 0 && (
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-bold">{totalDuration} min • ${totalCost}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, 'PPP') : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData(prev => ({ ...prev, date }))}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label>Dentist</Label>
                <Select value={formData.dentistId} onValueChange={(v) => setFormData(prev => ({ ...prev, dentistId: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dentist" />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.filter(s => s.role === 'dentist').map((d) => (
                      <SelectItem key={d.id} value={d.id}>{d.firstName} {d.lastName}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Time</Label>
                <Select value={formData.startTime} onValueChange={(v) => setFormData(prev => ({ ...prev, startTime: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Room</Label>
                <Select value={formData.room} onValueChange={(v) => setFormData(prev => ({ ...prev, room: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select room" /></SelectTrigger>
                  <SelectContent>
                    {['Room 1', 'Room 2', 'Room 3'].map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any notes..."
              />
            </div>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Confirm</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="font-semibold">{selectedPatient?.firstName} {selectedPatient?.lastName}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="font-semibold">{selectedServices.map(s => s.name).join(', ')}</p>
              <p className="text-sm text-slate-500">{totalDuration} min • ${totalCost}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="font-semibold">{formData.date && format(formData.date, 'PPP')} at {formData.startTime}</p>
              <p className="text-sm text-slate-500">Dr. {selectedDentist?.lastName} • {formData.room}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(s => s - 1)} disabled={step === 1}>Back</Button>
        {step < 4 ? (
          <Button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} className="bg-blue-600">Continue</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-emerald-600">
            {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Scheduling...</> : 'Confirm'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default function NewAppointmentPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <NewAppointmentForm />
    </Suspense>
  );
}
