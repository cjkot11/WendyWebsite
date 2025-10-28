"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star as StarFill } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({ name: "", text: "" });

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, rating }),
    });
    if (response.ok) {
      setSubmitStatus("success");
      setFormData({ name: "", text: "" });
      setRating(5);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Client Reviews</h1>
          <p className="text-xl text-muted-foreground">See what our clients have to say</p>
        </div>
        <div className="space-y-6 mb-16">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    i < review.rating ? (
                      <StarFill key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ) : (
                      <Star key={i} className="h-5 w-5 text-gray-300" />
                    )
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">&quot;{review.text}&quot;</p>
                <p className="font-semibold">— {review.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">Leave a Review</h2>
            {submitStatus === "success" ? (
              <div className="text-center py-8">
                <p className="text-green-600 mb-4">Thank you! Your review will be published after approval.</p>
                <Button onClick={() => setSubmitStatus("idle")}>Submit Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Rating</label>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        className={`${i + 1 <= rating ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        <StarFill className="h-8 w-8 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  required
                />
                <Textarea
                  rows={4}
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="Your Review"
                  required
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
