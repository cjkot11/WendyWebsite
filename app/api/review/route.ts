import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rating, text, photoUrl } = body;

    if (!name || !rating || !text) {
      return NextResponse.json(
        { error: "Name, rating, and text are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.from("reviews").insert({
      name,
      rating,
      text,
      photourl: photoUrl || null,
      approved: false, // Reviews need admin approval
    });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to submit review", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
