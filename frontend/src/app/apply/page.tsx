import { BadgeCheck, BriefcaseBusiness, Sparkles } from "lucide-react";
import PageReveal from "@/components/PageReveal";
import SectionHeading from "@/components/SectionHeading";
import ConsultationForm from "@/components/ConsultationForm";

const highlights = [
  "Technology and design strategy support",
  "Product and research project planning",
  "Fast response from the MIZYRA team"
];

export default function ApplyPage() {
  return (
    <PageReveal>
      <section className="section-shell reveal-up relative py-16 md:py-20">
        <div className="motion-orb -left-10 top-16 h-36 w-36 bg-moonGreen/20" />
        <div className="motion-orb right-8 top-24 h-40 w-40 bg-moonGreen/15" style={{ animationDelay: "0.9s" }} />

        <SectionHeading
          eyebrow="Consultation"
          title="Request a project consultation"
          description="Tell us about your software, research, design, or digital growth requirement and we will guide the next steps."
        />

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-6">
            <article className="glass-panel p-6">
              <p className="neo-chip inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-moonInk/80">
                <Sparkles size={14} className="text-moonGreen" />
                Why partner with us
              </p>
              <ul className="mt-4 space-y-3 text-sm text-moonInk/80">
                {highlights.map((item) => (
                  <li key={item} className="neo-chip flex items-start gap-2 rounded-2xl px-3 py-3">
                    <BadgeCheck size={16} className="mt-0.5 text-moonGreen" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-panel grid gap-3 p-6">
              <div className="neo-chip flex items-center gap-3 rounded-2xl px-3 py-3">
                <BriefcaseBusiness size={16} className="text-moonGreen" />
                <div>
                  <p className="text-xs text-moonInk/65">Project Support</p>
                  <p className="text-sm font-semibold text-moonInk">Software, research, design, and digital strategy</p>
                </div>
              </div>
            </article>
          </aside>

          <ConsultationForm />
        </div>
      </section>
    </PageReveal>
  );
}
