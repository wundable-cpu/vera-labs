"use client";

import { motion } from "framer-motion";
import { Target, Lightbulb, Shield, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Circuit Board / Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Additional diagonal grid lines for circuit board effect */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(16, 185, 129, 0.05) 10px,
                rgba(16, 185, 129, 0.05) 20px
              )
            `,
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 py-20 sm:py-28 lg:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-400 mb-6"
            >
              Architecting the Digital Future of African Enterprise.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              We transform complex data into actionable intelligence, empowering businesses across Africa to unlock their full potential.
            </motion.p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="px-6 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-6">
                Our Mission
              </h2>
              <p className="text-lg sm:text-xl text-slate-100 leading-relaxed">
                To empower African enterprises through the intelligent application of cutting-edge technology, 
                transforming data into strategic advantage and driving sustainable growth across the continent. 
                We believe that every business, regardless of size, deserves access to world-class AI diagnostics 
                and systems architecture that can unlock their true potential.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="px-6 py-16 sm:py-20 lg:py-24 bg-slate-900/40 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-6">
                The Brand Story
              </h2>
              <div className="space-y-4 text-slate-100 leading-relaxed">
                <p className="text-lg">
                  Vera Labs is a premier technology firm specializing in AI diagnostics and systems architecture. 
                  Our specialized execution wing, <span className="text-emerald-400 font-semibold">Burzambu Developers</span>, 
                  handles the technical engineering that powers our Insight Engine.
                </p>
                <p className="text-lg">
                  Founded with a vision to bridge the technology gap in African markets, we combine deep technical expertise 
                  with an intimate understanding of local business challenges. Our solutions are designed not just to work, 
                  but to thrive in the unique context of African enterprise.
                </p>
                <p className="text-lg">
                  The Insight Engine represents our commitment to democratizing access to enterprise-grade AI diagnostics, 
                  making sophisticated analytics and actionable insights accessible to businesses of all sizes.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="px-6 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-6">
                Our Vision
              </h2>
              <p className="text-lg sm:text-xl text-slate-100 leading-relaxed">
                To become the leading force in African technology innovation, where every enterprise has the tools, 
                insights, and support needed to compete on a global scale. We envision a future where African businesses 
                leverage AI and advanced analytics not as a luxury, but as a fundamental driver of competitive advantage.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="px-6 py-16 sm:py-20 lg:py-24 bg-slate-900/40 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-12 text-center">
                Our Core Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {/* Precision */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="p-6 rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                      <Target className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-400">Precision</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Every solution is engineered with meticulous attention to detail, ensuring accuracy and reliability 
                    in every diagnostic and recommendation.
                  </p>
                </motion.div>

                {/* Integrity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="p-6 rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                      <Shield className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-400">Integrity</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    We operate with unwavering ethical standards, building trust through transparency, honesty, and 
                    commitment to our clients' success.
                  </p>
                </motion.div>

                {/* Innovation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="p-6 rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                      <Lightbulb className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-400">Innovation</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    We continuously push the boundaries of what's possible, leveraging cutting-edge technology to solve 
                    complex challenges and create breakthrough solutions.
                  </p>
                </motion.div>

                {/* Agility */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="p-6 rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                      <Zap className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-400">Agility</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    We adapt quickly to changing market conditions and client needs, delivering responsive solutions 
                    that keep businesses ahead of the curve.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-6 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
                Ready to see what our AI found on your site?
              </h2>
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-3 rounded-lg border-2 border-emerald-500/60 bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-shadow"
                >
                  {/* Emerald glow effect */}
                  <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/30 via-emerald-500/40 to-emerald-400/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center gap-3">
                    <span>Return to My Dashboard</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

