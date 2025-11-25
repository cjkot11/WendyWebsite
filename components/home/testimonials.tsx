import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

async function getReviews() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("createdat", { ascending: false })
      .limit(3);
    
    if (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export async function Testimonials() {
  const reviews = await getReviews();

  // Show placeholders if no reviews
  const displayReviews = reviews.length > 0 ? reviews : [
    { name: "Sarah M.", rating: 5, text: "Wendy planned the most amazing trip to Italy! Every detail was perfect." },
    { name: "John D.", rating: 5, text: "Our cruise was everything we hoped for and more. Highly recommend!" },
    { name: "Emily R.", rating: 5, text: "Expert planning and attention to detail. Made our honeymoon magical." }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {displayReviews.slice(0, 3).map((review: any, index: number) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{review.text}"</p>
                <p className="font-semibold">— {review.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
