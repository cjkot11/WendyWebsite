import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ThankYou() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <Card>
          <CardContent className="pt-12 pb-12">
            <CheckCircle className="h-20 w-20 mx-auto text-green-500 mb-6" />
            <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              We've received your inquiry and will get back to you within 24 hours.
            </p>
            <p className="text-muted-foreground mb-8">
              We're excited to help you plan your dream vacation!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button>Back to Home</Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline">Read Our Blog</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
