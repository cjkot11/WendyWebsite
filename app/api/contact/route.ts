import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

export const dynamic = 'force-dynamic';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, tripType, message, travelers, budgetRange } = body;

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
      triptype: tripType || "General Inquiry", // PostgreSQL converts to lowercase
      travelers: travelers || null,
      budgetrange: budgetRange || null,
      message: message || null,
    });

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save lead", details: dbError.message },
        { status: 500 }
      );
    }

    if (resend) {
      try {
        // Send notification to admin
        await resend.emails.send({
          from: "Time2Wander <onboarding@resend.dev>",
          to: process.env.ADMIN_EMAIL || "wakotsen@aol.com",
          subject: `New Lead from ${name}`,
          html: `
            <h2>New Lead Submitted</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            ${tripType ? `<p><strong>Trip Type:</strong> ${tripType}</p>` : ""}
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
          `,
        });

        // Send confirmation to client
        await resend.emails.send({
          from: "Time2Wander <onboarding@resend.dev>",
          to: email,
          subject: "Thank you for contacting Time2Wander!",
          html: `
            <h2>Thank you, ${name}!</h2>
            <p>We've received your inquiry and will get back to you within 24 hours.</p>
            <p>We're excited to help you plan your dream vacation!</p>
            <p>Best regards,<br>Wendy</p>
          `,
        });
      } catch (emailError) {
        console.error("Email error:", emailError);
        // Continue even if email fails
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
