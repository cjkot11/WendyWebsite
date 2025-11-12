"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle } from "lucide-react";

export default function CustomTrips() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tripType: "",
    travelers: "",
    budgetRange: "",
    preferredDestinations: "",
    travelDates: "",
    specialRequests: "",
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
          preferredDestinations: "",
          travelDates: "",
          specialRequests: "",
        });
      } else {
        console.error("Form submission error:", data);
        alert(`Error: ${data.error || "Failed to submit form. Please try again."}`);
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
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Custom Trip Planning</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Let us create a personalized itinerary tailored to your dreams, interests, and budget
          </p>
        </div>

        {/* Process Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-4">1️⃣</div>
              <CardTitle>Tell Us Your Dreams</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Share your vision and we'll bring it to life</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-4">2️⃣</div>
              <CardTitle>We Design Your Trip</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Receive a detailed, customized itinerary</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="text-4xl mb-4">3️⃣</div>
              <CardTitle>Enjoy Your Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Relax knowing every detail is handled</CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        {submitStatus === "success" ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Thank You!</h3>
              <p className="text-lg text-muted-foreground mb-6">
                We've received your request and will get back to you within 24 hours.
              </p>
              <Button onClick={() => setSubmitStatus("idle")}>
                Submit Another Request
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Trip Inquiry Form</CardTitle>
              <CardDescription>Fill out the form below to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Travelers</label>
                    <Input
                      value={formData.travelers}
                      onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                      placeholder="e.g., 2 adults, 2 children"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Travel Dates</label>
                    <Input
                      value={formData.travelDates}
                      onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                      placeholder="e.g., June 2024 or Flexible"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <Input
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      placeholder="e.g., $5,000 - $10,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Trip Type</label>
                  <Input
                    value={formData.tripType}
                    onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                    placeholder="e.g., Beach Vacation, European Tour, Cruise"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Destinations</label>
                  <Input
                    value={formData.preferredDestinations}
                    onChange={(e) => setFormData({ ...formData, preferredDestinations: e.target.value })}
                    placeholder="e.g., Italy, Greece, Caribbean"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Special Requests & Interests</label>
                  <Textarea
                    rows={4}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="Tell us about your interests, must-see attractions, or any special requirements..."
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
