'use client';

import { treatmentRecords, services, patients } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Plus,
  FileText,
  Stethoscope,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';

export default function TreatmentsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Treatments</h1>
          <p className="text-slate-500 mt-1">Manage treatment plans and procedures</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/treatments/new">
            <Plus className="w-4 h-4 mr-2" />
            New Treatment
          </Link>
        </Button>
      </div>

      {/* Services Catalog */}
      <Card>
        <CardHeader>
          <CardTitle>Services & Procedures</CardTitle>
          <CardDescription>Available dental services and their codes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="outline" className="mb-2">{service.code}</Badge>
                    <h3 className="font-semibold text-slate-900">{service.name}</h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">{service.description}</p>
                  </div>
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: service.color }}
                  />
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-slate-600">
                      <span className="font-medium">{service.duration}</span> min
                    </span>
                    <span className="text-slate-900 font-semibold">
                      ₱{service.basePrice.toLocaleString()}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Treatment Records */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Treatment Records</CardTitle>
              <CardDescription>History of completed procedures</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search records..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Date</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Procedures</TableHead>
                  <TableHead>Dentist</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {treatmentRecords.map((record) => {
                  const patient = patients.find(p => p.id === record.patientId);
                  return (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">
                            {new Date(record.date).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-slate-900">
                          {patient?.firstName} {patient?.lastName}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {record.procedures.map((proc, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {proc.serviceName}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-600">Dr. Sarah Johnson</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-slate-600 line-clamp-1">
                          {record.notes}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <FileText className="w-4 h-4" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
