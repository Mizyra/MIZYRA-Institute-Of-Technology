import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { applications } from "@/lib/db/schema";

export const runtime = "nodejs";

function str(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let fullName = "";
  let organization = "";
  let projectType = "";
  let email = "";
  let phone = "";
  let notes = "";

  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    fullName = String(body.full_name ?? "").trim();
    organization = String(body.organization ?? "").trim();
    projectType = String(body.project_type ?? "").trim();
    email = String(body.email ?? "").trim();
    phone = String(body.phone ?? "").trim();
    notes = String(body.notes ?? "").trim();
  } else {
    const form = await request.formData();
    fullName = str(form.get("full_name"));
    organization = str(form.get("organization"));
    projectType = str(form.get("project_type"));
    email = str(form.get("email"));
    phone = str(form.get("phone"));
    notes = str(form.get("notes"));
  }

  if (!fullName || !email) {
    return NextResponse.json(
      { message: "Full name and email are required." },
      { status: 400 }
    );
  }

  const [row] = await db
    .insert(applications)
    .values({ fullName, organization, projectType, email, phone, notes })
    .returning({ id: applications.id });

  return NextResponse.json(
    { id: row.id, message: "Application submitted successfully" },
    { status: 201 }
  );
}
