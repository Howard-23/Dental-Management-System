'use client';

import { useState, useEffect } from 'react';
import { dashboardStats, monthlyStats, getTodaysAppointments } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dynamic from 'next/dynamic';
import {
  Users,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  ChevronRight,
  MoreHorizontal,
  Stethoscope,
  CreditCard,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

// Dynamic imports for charts
const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

const todaysAppointments = getTodaysAppointments();

const statsCards = [
  {
    title: 'Total Patients',
    value: dashboardStats.totalPatients.toLocaleString(),
    change: `+${dashboardStats.newPatientsThisMonth}`,
    changeLabel: 'this month',
    trend: 'up',
    icon: Users,
    color: 'blue',
  },
  {
    title: "Today's Appointments",
    value: dashboardStats.appointmentsToday.toString(),
    change: `${dashboardStats.totalAppointments} total`,
    changeLabel: 'this month',
    trend: 'neutral',
    icon: CalendarCheck,
    color: 'green',
  },
  {
    title: 'Revenue',
    value: `₱${dashboardStats.revenueThisMonth.toLocaleString()}`,
    change: '+16.3%',
    changeLabel: 'vs last month',
    trend: 'up',
    icon: DollarSign,
    color: 'purple',
  },
  {
    title: 'Outstanding',
    value: `₱${dashboardStats.outstandingPayments.toLocaleString()}`,
    change: `${((dashboardStats.outstandingPayments / dashboardStats.revenueThisMonth) * 100).toFixed(1)}%`,
    changeLabel: 'of revenue',
    trend: 'down',
    icon: CreditCard,
    color: 'orange',
  },
];

const colorVariants: Record<string, { bg: string; icon: string; border: string }> = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
  green: { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-emerald-100' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-100' },
};

export default function DashboardPage() {
  const [activeChart, setActiveChart] = useState('revenue');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const colors = colorVariants[stat.color];
          return (
            <Card key={index} className={`border ${colors.border} shadow-sm hover:shadow-md transition-shadow`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl ${colors.bg}`}>
                    <stat.icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-500" />}
                  {stat.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : stat.trend === 'down' ? 'text-red-600' : 'text-slate-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-slate-400">{stat.changeLabel}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-slate-900">Performance Overview</CardTitle>
                <CardDescription>Monthly revenue and patient trends</CardDescription>
              </div>
              <Tabs value={activeChart} onValueChange={setActiveChart} className="w-auto">
                <TabsList className="bg-slate-100">
                  <TabsTrigger value="revenue" className="text-xs">Revenue</TabsTrigger>
                  <TabsTrigger value="patients" className="text-xs">Patients</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyStats}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₱${Number(value)/1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    formatter={(value) => [`₱${Number(value).toLocaleString()}`, activeChart === 'revenue' ? 'Revenue' : 'New Patients']}
                  />
                  <Area
                    type="monotone"
                    dataKey={activeChart}
                    stroke={activeChart === 'revenue' ? '#3b82f6' : '#10b981'}
                    fillOpacity={1}
                    fill={`url(#${activeChart === 'revenue' ? 'colorRevenue' : 'colorPatients'})`}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-slate-900">Today&apos;s Schedule</CardTitle>
                <CardDescription>{todaysAppointments.length} appointments</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaysAppointments.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <CalendarCheck className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No appointments today</p>
              </div>
            ) : (
              todaysAppointments.map((apt) => (
                <div key={apt.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                  <div className="flex flex-col items-center min-w-[60px]">
                    <span className="text-sm font-bold text-slate-900">{apt.startTime}</span>
                    <span className="text-xs text-slate-500">{apt.duration}m</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{apt.patientName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Stethoscope className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-600 truncate">{apt.services[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={apt.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                        {apt.status}
                      </Badge>
                      <span className="text-xs text-slate-400">{apt.room}</span>
                    </div>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                      {apt.dentistName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ))
            )}
            <Button asChild variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              <Link href="/appointments">
                View all appointments
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - Quick Actions & Treatment Completion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start gap-3 h-12">
              <Link href="/appointments/new">
                <div className="p-2 rounded-lg bg-blue-50">
                  <CalendarCheck className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-900">Schedule Appointment</p>
                  <p className="text-xs text-slate-500">Book a new patient visit</p>
                </div>
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-3 h-12">
              <Link href="/patients/new">
                <div className="p-2 rounded-lg bg-emerald-50">
                  <Users className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-900">Add New Patient</p>
                  <p className="text-xs text-slate-500">Register a new patient</p>
                </div>
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start gap-3 h-12">
              <Link href="/billing/new">
                <div className="p-2 rounded-lg bg-purple-50">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-900">Create Invoice</p>
                  <p className="text-xs text-slate-500">Generate a new bill</p>
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Treatment Completion Rate */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Treatment Completion</CardTitle>
            <CardDescription>Plan vs completed treatments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyStats.slice(-4)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                  <Bar dataKey="appointments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { task: 'Review lab results', time: 'Today, 2:00 PM', priority: 'high' },
              { task: 'Staff meeting', time: 'Tomorrow, 9:00 AM', priority: 'medium' },
              { task: 'Inventory check', time: 'Feb 15, 11:00 AM', priority: 'low' },
              { task: 'Insurance claims review', time: 'Feb 16, 3:00 PM', priority: 'high' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100">
                <div className={`w-2 h-2 rounded-full ${
                  item.priority === 'high' ? 'bg-red-500' : item.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-slate-900 text-sm">{item.task}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
