import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { Destinations } from "@/components/home/destinations";
import { Testimonials } from "@/components/home/testimonials";
import { LeadForm } from "@/components/home/lead-form";

export default function Home() {
  return (
    <div>
      <Hero />
      <ValueProps />
      <Destinations />
      <Testimonials />
      <LeadForm />
      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground italic">
            All photos seen were taken on Time2Wander trips!
          </p>
        </div>
      </div>
    </div>
  );
}
