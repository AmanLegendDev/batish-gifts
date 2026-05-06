"use client";

import { motion } from "framer-motion";
import {
  Gift,
  HeartHandshake,
  Zap,
  ShieldCheck
} from "lucide-react";

export default function TrustSection() {

  const data = [

    {
      icon: Gift,
      title: "Unique Gifts",
      desc: "Handpicked collections for every special moment"
    },

    {
      icon: HeartHandshake,
      title: "Made With Care",
      desc: "Thoughtful gifting experience with personal touch"
    },

    {
      icon: Zap,
      title: "Fast Response",
      desc: "Quick WhatsApp support & smooth ordering"
    },

    {
      icon: ShieldCheck,
      title: "Trusted Store",
      desc: "Loved by local customers across Shimla"
    }

  ];

  return (

    <section className="relative overflow-hidden px-4 py-12 bg-gradient-to-b from-white to-[#fffaf8]">

      {/* GLOW */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">

          <p className="text-[11px] tracking-[4px] text-[var(--primary)] uppercase font-medium">
            Why Choose Us
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Gifts That Feel
            Truly Special ✨
          </h2>

          <p className="text-sm text-gray-500 mt-3 max-w-xl mx-auto leading-relaxed">

            Carefully selected gifts, warm service
            and a smooth shopping experience for every customer 💝

          </p>

        </div>


        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {data.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="
                group
                bg-white/90
                backdrop-blur
                rounded-[28px]
                p-5
                border border-white
                shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                hover:-translate-y-1
                transition-all
                duration-300
              "
              >

                {/* ICON */}
                <div className="
                w-14 h-14 rounded-2xl
                bg-[var(--primary)]/10
                flex items-center justify-center
                mb-4
              ">

                  <Icon
                    size={26}
                    className="text-[var(--primary)]"
                  />

                </div>


                {/* TITLE */}
                <h3 className="text-sm font-semibold text-gray-900">

                  {item.title}

                </h3>


                {/* DESC */}
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">

                  {item.desc}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>

  );

}