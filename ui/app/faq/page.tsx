import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Sri Lanka Salah Times",
  description:
    "Frequently asked questions about Sri Lanka prayer times, data source (ACJU), calculation method, and how to use this site.",
};

const faqs = [
  {
    question: "Where do these prayer times come from?",
    answer:
      "All prayer times are taken from the official ACJU (All Ceylon Jamiyyathul Ulama) prayer time schedules for Sri Lanka. We do not calculate the times ourselves.",
  },
  {
    question: "How often are the prayer times updated?",
    answer:
      "Whenever ACJU publishes new prayer time schedules, we update our data to match their latest PDFs.",
  },
  {
    question: "Why do some districts appear as combined regions?",
    answer:
      "ACJU publishes times for regions that may cover multiple districts (for example, Colombo, Gampaha and Kalutara share one timetable). We mirror their groupings to stay consistent with the official source.",
  },
  {
    question: "What time format does this site use?",
    answer:
      "Internally we store times in 24-hour format, but on the site we display them in a simple 12-hour style without AM/PM where possible for readability.",
  },
  {
    question: "Can I copy prayer times to share on WhatsApp?",
    answer:
      "Yes. Use the copy button at the bottom of the page to open the copy dialog, choose the regions you need, and copy a WhatsApp‑ready message for tomorrow’s prayer times.",
  },
  {
    question: "Does this site support mobile devices?",
    answer:
      "Yes. The layout is designed to work well on phones, tablets and desktops, with a focus on fast access to today’s times and the monthly timetable.",
  },
  {
    question: "Who maintains this website?",
    answer:
      "This site is an independent project built around the official ACJU schedules. It is not an official ACJU website.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mb-8">
          Answers to common questions about Sri Lanka prayer times, the ACJU data
          source, and how to use this website.
        </p>
        <div className="space-y-6">
          {faqs.map((item) => (
            <section
              key={item.question}
              className="rounded-lg border border-border bg-card/40 p-4 md:p-5"
            >
              <h2 className="text-base md:text-lg font-semibold text-foreground mb-2">
                {item.question}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                {item.answer}
              </p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

