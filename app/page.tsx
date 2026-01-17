import { auth } from "@/auth";
import { PageContent } from "./page-content";

export default async function Page() {
  const session = await auth();

  return (
    <main className="min-h-screen flex items-center justify-center px-4 pb-10">
      <div className="w-full max-w-6xl mx-auto">
        <section className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-surface/60 backdrop-blur-xl shadow-xl shadow-slate-950/70">
          {/* Subtle border glow */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-slate-50/5" />

          <PageContent session={session} />
        </section>
      </div>
    </main>
  );
}