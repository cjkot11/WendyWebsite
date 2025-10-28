import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-500 to-teal-600 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Plan Your Dream Vacation
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Expert travel planning with personalized service to make your journey unforgettable
        </p>
        <Link href="/start-planning">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Start Planning Your Trip
          </Button>
        </Link>
      </div>
    </section>
  );
}
