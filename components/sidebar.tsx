'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Stethoscope,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Smile,
  Shield,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Patients', href: '/patients', icon: Users },
  { name: 'Appointments', href: '/appointments', icon: CalendarDays },
  { name: 'Treatments', href: '/treatments', icon: Stethoscope },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Documents', href: '/documents', icon: FileText },
];

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 bg-white border-r border-slate-200">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-200">
            <Smile className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">DentalCare</h1>
            <p className="text-xs text-slate-500 font-medium">Pro Management</p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-3 h-11 px-3 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  <item.icon className={cn(
                    'w-5 h-5 transition-colors',
                    isActive ? 'text-blue-600' : 'text-slate-400'
                  )} />
                  {item.name}
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4 mx-3" />

        {/* Bottom Navigation */}
        <nav className="px-3 space-y-1">
          {bottomNavigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start gap-3 h-11 px-3 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  <item.icon className={cn(
                    'w-5 h-5',
                    isActive ? 'text-blue-600' : 'text-slate-400'
                  )} />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-md">
            DR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">Dr. Sarah Johnson</p>
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-blue-500" />
              <p className="text-xs text-slate-500">Admin</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0 text-slate-400 hover:text-red-600">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
}
