'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Save, Building2, User, Bell, Shield, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your practice settings and preferences</p>
      </div>

      <Tabs defaultValue="practice" className="w-full">
        <TabsList className="bg-slate-100">
          <TabsTrigger value="practice" className="gap-2">
            <Building2 className="w-4 h-4" />
            Practice
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="practice" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Practice Information</CardTitle>
              <CardDescription>Update your dental practice details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Practice Name</Label>
                  <Input defaultValue="DentalCare Pro" />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="info@dentalcarepro.com" />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input defaultValue="www.dentalcarepro.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input defaultValue="123 Dental Street, Medical Center, NY 10001" />
              </div>
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Set your practice operating hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="font-medium w-32">{day}</span>
                    <div className="flex items-center gap-4">
                      <Switch defaultChecked={day !== 'Sunday'} />
                      <div className="flex items-center gap-2">
                        <Input type="time" defaultValue="09:00" className="w-24" />
                        <span>to</span>
                        <Input type="time" defaultValue="17:00" className="w-24" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Profile</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-blue-600 text-white text-2xl">DR</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="text-xs text-slate-500 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input defaultValue="Sarah" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input defaultValue="Johnson" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="sarah.johnson@dentalcarepro.com" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="+1 (555) 101-0001" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'New appointment bookings', description: 'When a patient books an appointment', default: true },
                { label: 'Appointment cancellations', description: 'When a patient cancels an appointment', default: true },
                { label: 'Payment received', description: 'When a payment is processed', default: true },
                { label: 'Patient check-ins', description: 'When a patient checks in', default: false },
                { label: 'Low inventory alerts', description: 'When supplies are running low', default: true },
                { label: 'Birthday reminders', description: 'Daily list of patient birthdays', default: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>
                  <Switch defaultChecked={item.default} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" />
              </div>
              <div className="pt-4 border-t">
                <h4 className="font-medium text-slate-900 mb-4">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-slate-500">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment methods and billing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Payment Terms</Label>
                <Input defaultValue="Net 30 days" />
              </div>
              <div className="space-y-2">
                <Label>Late Fee Percentage</Label>
                <Input defaultValue="1.5%" />
              </div>
              <div className="space-y-2">
                <Label>Accepted Payment Methods</Label>
                <div className="flex gap-4 mt-2">
                  {['Cash', 'Credit Card', 'Check', 'Insurance'].map((method) => (
                    <div key={method} className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span className="text-sm">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
