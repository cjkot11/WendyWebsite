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
    </div>
  );
}
