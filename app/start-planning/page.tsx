"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StartPlanning() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tripType: "",
    travelers: "",
    budgetRange: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          tripType: "",
          travelers: "",
          budgetRange: "",
          message: "",
        });
        setTimeout(() => router.push("/thank-you"), 2000);
      } else {
        console.error("Form submission error:", data);
        alert(`Error: ${data.error || "Failed to submit form. Please try again."}${data.details ? `\n\nDetails: ${data.details}` : ""}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-8 mb-4">
            <img 
              src="/images/about/logo.jpeg" 
              alt="Time2Wander Logo" 
              className="h-24 w-auto"
            />
            <h1 className="text-5xl font-bold">Start Planning Your Trip</h1>
            <img 
              src="/images/about/logo.jpeg" 
              alt="Time2Wander Logo" 
              className="h-24 w-auto"
            />
          </div>
          <p className="text-xl text-muted-foreground">
            Let's turn your travel dreams into reality
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">Phone</p>
                  <p className="text-muted-foreground">510-798-3013</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Email</p>
                  <p className="text-muted-foreground">wakotsen@aol.com</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">Office Hours</p>
                  <p className="text-muted-foreground">Mon-Fri: 9am-5pm<br />Sat: 10am-2pm</p>
                </div>
              </CardContent>
            </Card>

            {/* Calendly embed */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Schedule a Consultation</CardTitle>
                <CardDescription>
                  Pick a time that works best for you. This calendar is powered by Calendly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {process.env.NEXT_PUBLIC_CALENDLY_URL ? (
                  <div className="w-full rounded-md border bg-muted/30">
                    <iframe
                      src={process.env.NEXT_PUBLIC_CALENDLY_URL}
                      className="w-full h-[480px] border-0 rounded-md"
                      title="Schedule with Wendy"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-muted flex items-center justify-center rounded-md">
                    <p className="text-muted-foreground text-center px-4 text-sm">
                      Calendly isn&apos;t configured yet. Add
                      <br />
                      <code className="bg-muted px-1 py-0.5 rounded mx-1">NEXT_PUBLIC_CALENDLY_URL</code>
                      in your environment variables to embed your scheduling link here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Trip Inquiry</CardTitle>
              <CardDescription>Tell us about your dream vacation</CardDescription>
            </CardHeader>
            <CardContent>
              {submitStatus === "success" ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">Redirecting to confirmation...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email *"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <Input
                    placeholder="Trip Type"
                    value={formData.tripType}
                    onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                  />
                  <Input
                    placeholder="Number of Travelers"
                    value={formData.travelers}
                    onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  />
                  <Input
                    placeholder="Budget Range"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  />
                  <Textarea
                    rows={4}
                    placeholder="Tell us about your ideal trip..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
