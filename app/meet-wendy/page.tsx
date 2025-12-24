import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MeetWendy() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-blue-200">
            <img 
              src="/images/about/mom_profile.jpg" 
              alt="Wendy" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center gap-16 mb-4">
            <img 
              src="/images/about/logo.jpeg" 
              alt="Time2Wander Logo" 
              className="h-32 w-auto"
            />
            <h1 className="text-5xl font-bold">Meet Wendy</h1>
            <img 
              src="/images/about/logo.jpeg" 
              alt="Time2Wander Logo" 
              className="h-32 w-auto"
            />
          </div>
          <p className="text-xl text-muted-foreground">
            Your dedicated travel planning expert
          </p>
        </div>

        {/* Bio Section */}
        <Card className="mb-12">
          <CardContent className="pt-6">
            <h2 className="text-3xl font-semibold mb-6">About Wendy</h2>
            <div className="prose max-w-none">
              <p className="text-lg mb-4">
                Hi! I'm Wendy, and I'm passionate about creating unforgettable travel experiences 
                for my clients. With a lifetime of experience traveling to approximately 50 countries, I specialize in crafting 
                personalized itineraries that match your unique interests, budget, and travel style.
              </p>
              <p className="text-lg mb-4">
                Whether you're dreaming of a luxurious cruise through the Mediterranean, an adventurous 
                safari in Africa, or a relaxing beach vacation in the Caribbean, I'm here to make it happen. 
                My goal is to take the stress out of vacation planning so you can focus on making memories.
              </p>
              <p className="text-lg">
                From the initial consultation to your safe return home, I'm your dedicated partner in creating 
                the trip of a lifetime. Let's start planning your next adventure together!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Credentials */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Credentials & Certifications</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Certified Travel Consultant</li>
                <li>✓ Cruise Line Specialist</li>
                <li>✓ Adventure Travel Expert</li>
                <li>✓ Luxury Travel Consultant</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Specialties</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Custom Trip Planning</li>
                <li>✓ Cruise Vacations</li>
                <li>✓ Romantic Getaways</li>
                <li>✓ Family Trips</li>
                <li>✓ Group Travel</li>
                <li>✓ Luxury Experiences</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-semibold mb-6">Ready to Plan Your Trip?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Let's schedule a consultation to discuss your dream vacation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start-planning">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/custom-trips">
              <Button size="lg" variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
