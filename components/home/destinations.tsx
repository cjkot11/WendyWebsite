import { Card, CardContent } from "@/components/ui/card";

export function Destinations() {
  const destinations = [
    { name: "Caribbean", image: "🏝️" },
    { name: "Mediterranean", image: "🏛️" },
    { name: "Asia Pacific", image: "🌏" },
    { name: "Alaska", image: "🏔️" },
    { name: "Europe", image: "🗼" },
    { name: "Tropical Paradise", image: "🌺" }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Popular Destinations</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-blue-200 to-teal-300 flex items-center justify-center text-6xl">
                  {dest.image}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{dest.name}</h3>
                  <p className="text-muted-foreground mt-2">Explore our curated trips</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
