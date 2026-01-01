"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Is ScriptFlow really free?",
    answer:
      "Yes! During our beta period, ScriptFlow is completely free for the first 100 creators. No credit card required, no hidden fees, no surprise charges. We're focused on building the best product with feedback from real creators before launching publicly.",
  },
  {
    question: "Will I ever be charged without my consent?",
    answer:
      "Absolutely not. We will never charge you anything without your explicit permission. When we transition to a paid model, you'll be notified well in advance and given the choice to upgrade or continue with a free tier. Beta users will also receive exclusive lifetime discounts.",
  },
  {
    question: "What do you need my Instagram ID for?",
    answer:
      "Your Instagram ID helps us personalize your experience by understanding your niche and content style. It also allows us to verify you're a real creator. We never post on your behalf or access your account—we simply use it for identification and to provide you with relevant script suggestions.",
  },
  {
    question: "How is ScriptFlow different from ChatGPT?",
    answer:
      "ScriptFlow is purpose-built for short-form content creators. Unlike generic AI tools, we've trained our system specifically on viral hooks, retention patterns, and platform-specific best practices. Every script is optimized for Instagram Reels, TikTok, and YouTube Shorts algorithms.",
  },
  {
    question: "What happens after the beta ends?",
    answer:
      "Beta users get lifetime access to special perks including discounted pricing, priority support, and exclusive features. You'll always be grandfathered into better terms than new users. We value early adopters who help us shape the product.",
  },
  {
    question: "How many scripts can I generate?",
    answer:
      "During the beta, you can generate unlimited scripts. We want you to explore, experiment, and find what works best for your content style. This helps us improve the AI while giving you maximum value.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 px-4 bg-brand-dark relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-acid-lime/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-acid-magenta/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6">
            <HelpCircle className="w-4 h-4 text-acid-lime" />
            <span className="text-sm text-zinc-400 font-medium">
              Common Questions
            </span>
          </div>

          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white tracking-tight mb-4">
            Frequently Asked{" "}
            <span className="text-acid-lime">Questions</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Everything you need to know about ScriptFlow. Can&apos;t find what you&apos;re
            looking for? Reach out to us directly.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div
                className={`rounded-xl border ${
                  openIndex === index
                    ? "border-acid-lime/30 bg-acid-lime/5"
                    : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                } transition-all duration-300 overflow-hidden`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span
                    className={`font-medium text-lg ${
                      openIndex === index ? "text-acid-lime" : "text-white"
                    } transition-colors pr-4`}
                  >
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 ${
                      openIndex === index ? "text-acid-lime" : "text-zinc-500"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-zinc-400 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-green-500/10 border border-green-500/20">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400 font-medium">
              🔒 No credit card required • 100% free during beta • Cancel
              anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
