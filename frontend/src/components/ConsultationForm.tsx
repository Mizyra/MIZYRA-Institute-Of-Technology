"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { submitApplication } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

export default function ConsultationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError("");

    try {
      await submitApplication({
        full_name: String(data.get("full_name") ?? ""),
        organization: String(data.get("organization") ?? ""),
        project_type: String(data.get("project_type") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        notes: String(data.get("notes") ?? ""),
      });
      form.reset();
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass-panel flex flex-col items-start gap-4 p-8">
        <span className="neo-chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-moonInk/80">
          <CheckCircle2 size={16} className="text-moonGreen" />
          Request received
        </span>
        <h3 className="text-2xl font-semibold text-moonInk">Thank you — we&apos;ll be in touch.</h3>
        <p className="text-sm text-moonInk/75">
          Your consultation request has been submitted. The MIZYRA team will reach out to you shortly using the contact details you provided.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="neo-btn-primary btn-glow shine-on-hover rounded-full px-5 py-3 text-sm font-semibold"
          >
            Submit another request
          </button>
          <Link href="/#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-moonInk hover:text-moonGreen">
            Contact directly <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel grid gap-4 p-6 md:grid-cols-2 md:p-8">
      <div>
        <label htmlFor="full_name" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Full Name</label>
        <input id="full_name" required name="full_name" placeholder="Your full name" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
      </div>

      <div>
        <label htmlFor="organization" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Organization</label>
        <input id="organization" required name="organization" placeholder="Company or team" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="project_type" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Service Interest</label>
        <input id="project_type" name="project_type" placeholder="Example: Web app development, research support, UI/UX design" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Email</label>
        <input id="email" required name="email" type="email" placeholder="you@example.com" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Phone</label>
        <input id="phone" required name="phone" placeholder="Phone number" className="w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="notes" className="mb-1 block text-xs font-semibold uppercase tracking-wider text-moonInk/65">Project Details</label>
        <textarea id="notes" name="notes" placeholder="Tell us about your goals, timeline, and current requirements" className="min-h-[120px] w-full rounded-xl px-3 py-2 outline-none focus:border-moonGreen" />
      </div>

      {status === "error" ? (
        <p className="md:col-span-2 text-sm font-medium text-red-500" role="alert">
          {error}
        </p>
      ) : null}

      <div className="md:col-span-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="neo-btn-primary btn-glow shine-on-hover inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Request"
          )}
        </button>
        <Link href="/#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-moonInk hover:text-moonGreen">
          Contact directly <ArrowRight size={16} />
        </Link>
      </div>
    </form>
  );
}
