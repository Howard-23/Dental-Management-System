import { ServiceCard } from "@/components/service-card";
import { services } from "@/lib/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - DentalCare Pro",
  description: "Explore our comprehensive range of dental services",
};

const categoryLabels: Record<string, string> = {
  all: 'All Services',
  preventive: 'Preventive',
  restorative: 'Restorative',
  cosmetic: 'Cosmetic',
  orthodontic: 'Orthodontic',
  surgical: 'Surgical',
  diagnostic: 'Diagnostic',
};

export default function ServicesPage() {
  const categories = ['all', 'preventive', 'restorative', 'cosmetic', 'orthodontic', 'surgical', 'diagnostic'] as const;

  const getServicesByCategory = (category: string) => {
    if (category === 'all') return services;
    return services.filter((service) => service.category === category);
  };

  return (
    <div className="container py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Dental Services</h1>
        <p className="text-muted-foreground text-lg">
          We offer a wide range of dental services to help you achieve and maintain optimal oral health. 
          Browse our services below and book your appointment today.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex flex-wrap justify-center gap-2 mb-8 h-auto">
          {categories.map((category) => (
            <TabsTrigger 
              key={category} 
              value={category}
              className="capitalize"
            >
              {categoryLabels[category]}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getServicesByCategory(category).map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            {getServicesByCategory(category).length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No services found in this category.
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
