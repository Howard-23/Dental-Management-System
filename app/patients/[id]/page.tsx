'use client';

import { useParams } from 'next/navigation';
import { patients, appointments, treatmentRecords, invoices } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  FileText,
  Edit,
  Printer,
} from 'lucide-react';
import Link from 'next/link';

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = params.id as string;
  
  const patient = patients.find(p => p.id === patientId);
  const patientAppointments = appointments.filter(a => a.patientId === patientId);
  const patientRecords = treatmentRecords.filter(r => r.patientId === patientId);
  const patientInvoices = invoices.filter(i => i.patientId === patientId);

  if (!patient) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Patient not found</p>
        <Button asChild className="mt-4">
          <Link href="/patients">Back to Patients</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/patients">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-blue-600 text-white text-xl">
              {patient.firstName[0]}{patient.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-slate-500">ID: {patient.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/appointments/new?patient=${patient.id}`}>
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Link>
          </Button>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments ({patientAppointments.length})</TabsTrigger>
          <TabsTrigger value="treatments">Treatments ({patientRecords.length})</TabsTrigger>
          <TabsTrigger value="billing">Billing ({patientInvoices.length})</TabsTrigger>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{patient.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{patient.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="capitalize">{patient.gender}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Insurance</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.insurance ? (
                  <div className="space-y-2">
                    <p><span className="text-slate-500">Provider:</span> {patient.insurance.provider}</p>
                    <p><span className="text-slate-500">Policy #:</span> {patient.insurance.policyNumber}</p>
                    {patient.insurance.groupNumber && (
                      <p><span className="text-slate-500">Group #:</span> {patient.insurance.groupNumber}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-slate-500">No insurance on file</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><span className="text-slate-500">Name:</span> {patient.emergencyContact.name}</p>
                <p><span className="text-slate-500">Phone:</span> {patient.emergencyContact.phone}</p>
                <p><span className="text-slate-500">Relationship:</span> {patient.emergencyContact.relationship}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><span className="text-slate-500">Total Appointments:</span> {patientAppointments.length}</p>
                <p><span className="text-slate-500">Last Visit:</span> {patient.dentalHistory.lastVisit ? new Date(patient.dentalHistory.lastVisit).toLocaleDateString() : 'Never'}</p>
                <p><span className="text-slate-500">Status:</span> <Badge>{patient.status}</Badge></p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="mt-4">
          <Card>
            <CardContent className="p-6">
              {patientAppointments.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No appointments found</p>
              ) : (
                <div className="space-y-3">
                  {patientAppointments.map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-semibold">{apt.services.join(', ')}</p>
                        <p className="text-sm text-slate-500">
                          {new Date(apt.date).toLocaleDateString()} at {apt.startTime}
                        </p>
                      </div>
                      <Badge>{apt.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatments" className="mt-4">
          <Card>
            <CardContent className="p-6">
              {patientRecords.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No treatment records found</p>
              ) : (
                <div className="space-y-3">
                  {patientRecords.map((record) => (
                    <div key={record.id} className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex justify-between">
                        <p className="font-semibold">{new Date(record.date).toLocaleDateString()}</p>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">{record.diagnosis}</p>
                      <div className="flex gap-2 mt-2">
                        {record.procedures.map((p, i) => (
                          <Badge key={i} variant="secondary">{p.serviceName}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-4">
          <Card>
            <CardContent className="p-6">
              {patientInvoices.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No invoices found</p>
              ) : (
                <div className="space-y-3">
                  {patientInvoices.map((inv) => (
                    <div key={inv.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-semibold">{inv.invoiceNumber}</p>
                        <p className="text-sm text-slate-500">{new Date(inv.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₱{inv.total.toLocaleString()}</p>
                        <Badge className={inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'}>
                          {inv.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Allergies</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.medicalHistory.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {patient.medicalHistory.allergies.map((a, i) => (
                      <Badge key={i} variant="destructive">{a}</Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500">No known allergies</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Medical Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.medicalHistory.conditions.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {patient.medicalHistory.conditions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">No conditions on file</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Medications</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.medicalHistory.medications.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {patient.medicalHistory.medications.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">No medications on file</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dental Concerns</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.dentalHistory.concerns.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {patient.dentalHistory.concerns.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500">No concerns recorded</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
