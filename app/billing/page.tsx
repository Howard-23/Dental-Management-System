'use client';

import { invoices, dashboardStats } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  DollarSign,
  TrendingUp,
  AlertCircle,
  Plus,
  Search,
  FileText,
  Download,
  CreditCard,
  CheckCircle,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

const statusColors: Record<string, string> = {
  paid: 'bg-emerald-100 text-emerald-800',
  pending: 'bg-yellow-100 text-yellow-800',
  partial: 'bg-blue-100 text-blue-800',
  overdue: 'bg-red-100 text-red-800',
  cancelled: 'bg-slate-100 text-slate-800',
};

export default function BillingPage() {
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.paid, 0);
  const totalOutstanding = invoices.reduce((sum, inv) => sum + inv.balance, 0);
  const collectionRate = (totalRevenue / (totalRevenue + totalOutstanding)) * 100;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Billing & Invoicing</h1>
          <p className="text-slate-500 mt-1">Manage payments, invoices, and insurance claims</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/billing/new">
            <Plus className="w-4 h-4 mr-2" />
            Create Invoice
          </Link>
        </Button>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  ₱{totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-emerald-600">+12.5%</span>
              <span className="text-xs text-slate-400">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Outstanding</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  ₱{totalOutstanding.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={collectionRate} className="h-2" />
              <p className="text-xs text-slate-500 mt-2">{collectionRate.toFixed(0)}% collection rate</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Paid Invoices</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {invoices.filter(i => i.status === 'paid').length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              of {invoices.length} total invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Pending</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {invoices.filter(i => i.status === 'sent' || i.status === 'overdue').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Awaiting payment
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Manage and track all invoices</CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search invoices..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <span className="font-mono text-sm font-medium text-slate-900">
                        {invoice.invoiceNumber}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-slate-900">{invoice.patientName}</span>
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span className={invoice.status === 'overdue' ? 'text-red-600 font-medium' : ''}>
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-slate-900">
                        ₱{invoice.total.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-emerald-600">
                        ₱{invoice.paid.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={invoice.balance > 0 ? 'text-orange-600 font-medium' : 'text-slate-400'}>
                        ₱{invoice.balance.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[invoice.status]}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <FileText className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <CreditCard className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
