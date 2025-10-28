import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Ship, HeadphonesIcon } from "lucide-react";

export function ValueProps() {
  const props = [
    {
      icon: Plane,
      title: "Custom Trip Planning",
      description: "Tailored itineraries designed specifically for your interests, budget, and travel style."
    },
    {
      icon: Ship,
      title: "Cruise Expertise",
      description: "Specialized knowledge in cruise planning to find the perfect voyage for you."
    },
    {
      icon: HeadphonesIcon,
      title: "Concierge Support",
      description: "Dedicated support before, during, and after your trip for peace of mind."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Wendy's Travel?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {props.map((prop, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <prop.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                <CardTitle>{prop.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{prop.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
