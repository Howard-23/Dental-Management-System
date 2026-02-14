'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Bell, Plus, Calendar, User, Mail } from 'lucide-react';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, title: 'New appointment request', time: '5 min ago', type: 'appointment' },
    { id: 2, title: 'Patient check-in: John Smith', time: '15 min ago', type: 'patient' },
    { id: 3, title: 'Payment received: ₱24,750', time: '1 hour ago', type: 'payment' },
  ];

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-slate-200">
      {/* Search */}
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search patients, appointments, records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Quick Actions */}
        <Button asChild variant="default" size="sm" className="hidden sm:flex gap-2 bg-blue-600 hover:bg-blue-700">
          <Link href="/appointments/new">
            <Plus className="w-4 h-4" />
            New Appointment
          </Link>
        </Button>

        <Button asChild variant="outline" size="sm" className="hidden sm:flex gap-2">
          <Link href="/patients/new">
            <User className="w-4 h-4" />
            New Patient
          </Link>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="secondary" className="text-xs">3 new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <div className="flex items-center gap-2 w-full">
                  {notification.type === 'appointment' && <Calendar className="w-4 h-4 text-blue-500" />}
                  {notification.type === 'patient' && <User className="w-4 h-4 text-green-500" />}
                  {notification.type === 'payment' && <Mail className="w-4 h-4 text-purple-500" />}
                  <span className="font-medium text-sm flex-1">{notification.title}</span>
                </div>
                <span className="text-xs text-slate-500 pl-6">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm text-blue-600 cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
