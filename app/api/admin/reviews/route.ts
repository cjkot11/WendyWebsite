import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Check if user is authenticated and is admin
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if user is admin
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("email", user.email)
      .single();

    if (userError) {
      console.error("User lookup error:", userError);
      return NextResponse.json(
        { error: "Forbidden - Admin access required", details: `User lookup failed: ${userError.message}. Make sure your email exists in the users table with role='admin'` },
        { status: 403 }
      );
    }

    if (!userData || userData.role !== "admin") {
      console.error("User data:", userData, "User email:", user.email);
      return NextResponse.json(
        { error: "Forbidden - Admin access required", details: `User found but role is '${userData?.role || 'not found'}'. Expected 'admin'.` },
        { status: 403 }
      );
    }

    // Fetch all reviews (including unapproved)
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("createdat", { ascending: false });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to fetch reviews" },
        { status: 500 }
      );
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
