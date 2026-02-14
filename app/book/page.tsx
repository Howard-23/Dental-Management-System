import { services } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';
import { CalendarPlus, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Book Appointment - DentalCare Pro',
  description: 'Book your dental appointment online',
};

export default function BookPage() {
  return (
    <div className="container py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Book an Appointment</h1>
        <p className="text-muted-foreground text-lg">
          Schedule your visit with our dental professionals. Choose a service and we&apos;ll help you find the perfect time.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>New Appointment</CardTitle>
            <CardDescription>Schedule a new appointment with our team</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" size="lg">
              <Link href="/appointments/new">
                <CalendarPlus className="w-5 h-5 mr-2" />
                Book New Appointment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Services</CardTitle>
            <CardDescription>Browse our available dental services</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full" size="lg">
              <Link href="/services">
                View All Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {services.slice(0, 3).map((service) => (
          <Card key={service.id} className="text-center">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">₱{service.basePrice.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">{service.duration} minutes</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
