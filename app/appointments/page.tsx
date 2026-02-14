'use client';

import { useState } from 'react';
import { appointments, getDentists, services } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Stethoscope,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Plus,
  List,
  Grid,
} from 'lucide-react';
import Link from 'next/link';
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
];

const statusColors: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
  confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  in_progress: 'bg-purple-100 text-purple-800 border-purple-200',
  completed: 'bg-slate-100 text-slate-800 border-slate-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  no_show: 'bg-orange-100 text-orange-800 border-orange-200',
};

export default function AppointmentsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');
  const [selectedDentist, setSelectedDentist] = useState('all');

  const dentists = getDentists();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const filteredAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    const isInWeek = weekDays.some(day => isSameDay(day, aptDate));
    const matchesDentist = selectedDentist === 'all' || apt.dentistId === selectedDentist;
    return isInWeek && matchesDentist;
  });

  const getAppointmentsForDay = (day: Date) => {
    return filteredAppointments.filter(apt => isSameDay(new Date(apt.date), day));
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(direction === 'prev' ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500 mt-1">Schedule and manage patient appointments</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/appointments/new">
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </Link>
        </Button>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateWeek('prev')}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="font-semibold text-slate-900 min-w-[200px] text-center">
                  {format(weekStart, 'MMMM d')} - {format(addDays(weekStart, 6), 'MMMM d, yyyy')}
                </span>
                <Button variant="outline" size="icon" onClick={() => navigateWeek('next')}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setCurrentDate(new Date())}
                className="text-blue-600"
              >
                Today
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Select value={selectedDentist} onValueChange={setSelectedDentist}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Dentists" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dentists</SelectItem>
                  {dentists.map((dentist) => (
                    <SelectItem key={dentist.id} value={dentist.id}>
                      {dentist.firstName} {dentist.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Tabs value={viewMode} onValueChange={setViewMode} className="w-auto">
                <TabsList className="bg-slate-100">
                  <TabsTrigger value="list" className="flex items-center gap-2">
                    <List className="w-4 h-4" />
                    List
                  </TabsTrigger>
                  <TabsTrigger value="week" className="flex items-center gap-2">
                    <Grid className="w-4 h-4" />
                    Week
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Week View */}
      <Tabs value={viewMode} className="w-full">
        <TabsContent value="week" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-8 border-b">
                <div className="p-3 border-r bg-slate-50">
                  <span className="text-xs font-medium text-slate-500">Time</span>
                </div>
                {weekDays.map((day, index) => (
                  <div 
                    key={index} 
                    className={`p-3 text-center border-r last:border-r-0 ${
                      isSameDay(day, new Date()) ? 'bg-blue-50' : 'bg-slate-50'
                    }`}
                  >
                    <p className="text-xs text-slate-500 uppercase">{format(day, 'EEE')}</p>
                    <p className={`text-lg font-semibold ${isSameDay(day, new Date()) ? 'text-blue-600' : 'text-slate-900'}`}>
                      {format(day, 'd')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-8">
                <div className="border-r bg-slate-50">
                  {timeSlots.map((time) => (
                    <div key={time} className="h-16 border-b px-2 py-1">
                      <span className="text-xs text-slate-500">{time}</span>
                    </div>
                  ))}
                </div>

                {weekDays.map((day, dayIndex) => (
                  <div key={dayIndex} className="border-r last:border-r-0 relative">
                    {timeSlots.map((time) => (
                      <div key={time} className="h-16 border-b hover:bg-slate-50 transition-colors" />
                    ))}
                    
                    {getAppointmentsForDay(day).map((apt) => {
                      const startHour = parseInt(apt.startTime.split(':')[0]);
                      const startMin = parseInt(apt.startTime.split(':')[1]);
                      const top = ((startHour - 8) * 2 + (startMin / 30)) * 64;
                      const height = (apt.duration / 30) * 32;
                      
                      return (
                        <div
                          key={apt.id}
                          className={`absolute left-1 right-1 rounded-lg border p-2 text-xs cursor-pointer hover:shadow-md transition-shadow ${statusColors[apt.status]}`}
                          style={{ top: `${top}px`, height: `${Math.max(height, 60)}px` }}
                        >
                          <p className="font-semibold truncate">{apt.patientName}</p>
                          <p className="truncate opacity-80">{apt.services[0]}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            <span>{apt.startTime}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {appointments
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((apt) => (
                    <div 
                      key={apt.id} 
                      className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex flex-col items-center min-w-[80px] p-3 bg-slate-50 rounded-lg">
                        <span className="text-xs text-slate-500 uppercase">
                          {format(new Date(apt.date), 'MMM')}
                        </span>
                        <span className="text-xl font-bold text-slate-900">
                          {format(new Date(apt.date), 'd')}
                        </span>
                        <span className="text-xs text-slate-500">{apt.startTime}</span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900">{apt.patientName}</h3>
                          <Badge variant="outline" className={statusColors[apt.status]}>
                            {apt.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Stethoscope className="w-4 h-4" />
                            <span>{apt.services.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{apt.room}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {apt.dentistName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-900">{apt.dentistName}</p>
                          <p className="text-xs text-slate-500">{apt.duration} min</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="ghost" size="sm" className="text-blue-600">Edit</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
