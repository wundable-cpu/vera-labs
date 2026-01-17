export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-20">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[#D1FF00]">
            Vera Labs Privacy Policy
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Your data, protected by design
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-300">
            This Privacy Policy explains what Vera Labs collects, how we use it, and the
            safeguards we apply when delivering AI-powered auditing and intelligence.
          </p>
        </header>

        <section className="space-y-10">
          <article className="rounded-3xl border border-slate-800 bg-slate-950/60 p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#D1FF00]">
              1. Data We Collect
            </h2>
            <p className="mt-3 text-slate-300">
              We only collect analytics data required to perform audits. This includes GA4
              metrics such as active users, conversions, sessions, and funnel drop-offs. We do
              not collect personally identifiable information unless you explicitly provide
              it for account setup.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-950/60 p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#D1FF00]">
              2. How We Use AI
            </h2>
            <p className="mt-3 text-slate-300">
              Our AI analyzes your analytics signals to identify revenue leaks and recommend
              fixes. We do not use your data to train public models or third-party systems.
              All insights are generated specifically for your audit.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-950/60 p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#D1FF00]">
              3. Third-Party Processors
            </h2>
            <p className="mt-3 text-slate-300">
              Vera Labs uses trusted processors to deliver services:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-300">
              <li>Google (GA4) for analytics data access</li>
              <li>Paystack for payment processing</li>
            </ul>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-950/60 p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#D1FF00]">
              4. Data Security
            </h2>
            <p className="mt-3 text-slate-300">
              We protect your data using encryption at rest, access controls, and secure
              service infrastructure. Only authorized team members can access analytics
              data for auditing and support.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-800 bg-slate-950/60 p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#D1FF00]">
              5. Compliance
            </h2>
            <p className="mt-3 text-slate-300">
              Vera Labs complies with the Ghana Data Protection Act 2012. You may request
              access, correction, or deletion of your data by contacting our support team.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}