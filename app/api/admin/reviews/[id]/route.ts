import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

async function checkAdmin() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return { authorized: false, error: "Unauthorized" };
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("email", user.email)
    .single();

  if (userError || !userData || userData.role !== "admin") {
    return { authorized: false, error: "Forbidden - Admin access required" };
  }

  return { authorized: true, supabase };
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { authorized, error, supabase } = await checkAdmin();
    
    if (!authorized || !supabase) {
      return NextResponse.json({ error }, { status: authorized ? 500 : 401 });
    }

    const { approved } = await request.json();
    const { error: dbError } = await supabase
      .from("reviews")
      .update({ approved })
      .eq("id", params.id);

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to update review" },
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { authorized, error, supabase } = await checkAdmin();
    
    if (!authorized || !supabase) {
      return NextResponse.json({ error }, { status: authorized ? 500 : 401 });
    }

    const { error: dbError } = await supabase
      .from("reviews")
      .delete()
      .eq("id", params.id);

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to delete review" },
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
