import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Wendy's Travel
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/meet-wendy" className="text-sm font-medium hover:text-primary transition-colors">
              Meet Wendy
            </Link>
            <Link href="/custom-trips" className="text-sm font-medium hover:text-primary transition-colors">
              Custom Trips
            </Link>
            <Link href="/reviews" className="text-sm font-medium hover:text-primary transition-colors">
              Reviews
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/start-planning">
              <Button size="sm">Start Planning</Button>
            </Link>
          </div>
          
          <div className="md:hidden">
            {/* Mobile menu would go here */}
            <Button size="sm">Menu</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
