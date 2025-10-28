import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

export const dynamic = 'force-dynamic';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, tripType, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error: dbError } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      tripType: tripType || "General Inquiry",
      message: message || null,
    });

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500 }
      );
    }

    if (resend) {
      try {
        await resend.emails.send({
          from: "Wendy Travel <notifications@wendytravel.com>",
          to: process.env.ADMIN_EMAIL || "wendy@wendytravel.com",
          subject: `New Lead from ${name}`,
          html: `<h2>New Lead Submitted</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`,
        });
      } catch (emailError) {
        console.error("Email error:", emailError);
      }
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
