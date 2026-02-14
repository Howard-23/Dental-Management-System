'use client';

import Link from 'next/link';
import { Service } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, DollarSign, Stethoscope } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

const categoryLabels: Record<string, string> = {
  preventive: 'Preventive',
  restorative: 'Restorative',
  cosmetic: 'Cosmetic',
  orthodontic: 'Orthodontic',
  surgical: 'Surgical',
  diagnostic: 'Diagnostic',
};

const categoryColors: Record<string, string> = {
  cosmetic: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
  restorative: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  orthodontic: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  preventive: 'bg-green-100 text-green-800 hover:bg-green-200',
  surgical: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
  diagnostic: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200',
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="flex flex-col h-full transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Stethoscope className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg leading-tight">{service.name}</h3>
          </div>
        </div>
        <Badge 
          variant="secondary" 
          className={`mt-2 w-fit ${categoryColors[service.category]}`}
        >
          {categoryLabels[service.category]}
        </Badge>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </p>
        
        <div className="flex items-center gap-4 mt-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{service.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>₱{service.basePrice.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3">
        <Button asChild className="w-full">
          <Link href={`/appointments/new?service=${service.id}`}>
            Book Appointment
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
