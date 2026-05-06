"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Gift, MessageCircleHeart } from "lucide-react";

export default function CustomOrderSection() {

  return (

    <section className="relative overflow-hidden px-4 py-12 bg-gradient-to-b from-[#fffaf8] to-white">

      {/* SOFT GLOW */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--primary)]/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="
          bg-white/80
          backdrop-blur-xl
          border border-white
          rounded-[32px]
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          p-7 md:p-10
          text-center
        "
        >

          {/* ICON */}
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-5">

            <Gift
              size={30}
              className="text-[var(--primary)]"
            />

          </div>


          {/* BADGE */}
          <div className="inline-flex items-center gap-2 bg-[var(--primary)]/10 text-[var(--primary)] text-[11px] px-4 py-2 rounded-full font-semibold">

            <Sparkles size={14} />

            Personalized Gifts Available

          </div>


          {/* TITLE */}
          <h2 className="mt-5 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">

            Can’t Find The
            Perfect Gift?

          </h2>


          {/* SUBTEXT */}
          <p className="mt-4 text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">

            Share your idea, budget or inspiration —
            and Aarav Gift Gallery will help create
            a special custom order just for you 💝

          </p>


          {/* FEATURES */}
          <div className="mt-7 flex flex-wrap justify-center gap-3">

            <div className="bg-[#fffaf5] px-4 py-2 rounded-full text-xs text-gray-700">
              🎁 Surprise Boxes
            </div>

            <div className="bg-[#fffaf5] px-4 py-2 rounded-full text-xs text-gray-700">
              💐 Customized Hampers
            </div>

            <div className="bg-[#fffaf5] px-4 py-2 rounded-full text-xs text-gray-700">
              ✨ Decoration Items
            </div>

            <div className="bg-[#fffaf5] px-4 py-2 rounded-full text-xs text-gray-700">
              🧸 Toys & Combos
            </div>

          </div>


          {/* BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-8"
          >

            <Link
              href="/custom-order"
              className="
              inline-flex
              items-center
              gap-2
              bg-[var(--primary)]
              text-white
              px-7
              py-3
              rounded-2xl
              font-semibold
              shadow-xl
              hover:scale-[1.03]
              transition
            "
            >

              <MessageCircleHeart size={18} />

              Request Custom Order

            </Link>

          </motion.div>


          {/* TRUST */}
          <p className="mt-5 text-[11px] text-gray-400">

            Trusted by local customers in Shimla ✨

          </p>

        </motion.div>

      </div>

    </section>

  );

}