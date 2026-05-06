"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {

  return (

    <section className="relative overflow-hidden bg-[#fffaf5] px-4 py-6 min-h-[88vh] flex items-center">

    {/* PREMIUM BG IMAGE */}
<div className="absolute inset-0 opacity-[0.16]">

  <Image
    src="/hero/bg-texture.jpg"
    alt="background"
    fill
    priority
    className="object-cover"
  />

</div>


      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-52 h-52 bg-[var(--primary)]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="absolute bottom-0 right-0 w-52 h-52 bg-pink-100 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />


      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">

        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-white border border-[var(--primary)]/10 shadow-sm rounded-full px-4 py-2 text-[11px] text-[var(--primary)] font-medium"
        >
          🎁 Shimla’s Trusted Gift Store
        </motion.div>


        {/* HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-[34px] leading-[1.02] md:text-6xl font-bold text-gray-900"
        >

          Make Every

          <span className="block text-[var(--primary)]">
            Surprise Feel
          </span>

          Special ✨

        </motion.h1>


        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-gray-600 text-[13px] md:text-base leading-relaxed max-w-md mx-auto"
        >

          Toys • Hampers • Cute Gifts • Perfumes • Decor

          <br />

          Handpicked gifts for special moments 💝

        </motion.p>


        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-5 flex gap-2 justify-center flex-wrap"
        >

          <Link
            href="/category/all"
            className="bg-[var(--primary)] text-white px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-lg hover:scale-[1.03] transition"
          >
            Explore Gifts
          </Link>

    <Link
  href="/custom-order"
  className="bg-white border border-gray-200 px-5 py-2.5 rounded-2xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
>
  Custom Gift ✨
</Link>

        </motion.div>


        {/* MINI VISUAL STRIP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-5 flex justify-center"
        >

          <div className="flex items-center bg-white shadow-2xl rounded-[28px] p-2 gap-2 border border-gray-100">

            {/* LEFT */}
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden">

              <Image
                src="/hero/card-1.jpg"
                alt="gift"
                fill
                className="object-cover"
              />

            </div>


            {/* CENTER */}
            <div className="relative w-20 h-20 rounded-[22px] overflow-hidden shadow-lg border-4 border-white">

              <Image
                src="/hero/main.jpg"
                alt="gift"
                fill
                priority
                className="object-cover"
              />

            </div>


            {/* RIGHT */}
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden">

              <Image
                src="/hero/card-2.jpg"
                alt="gift"
                fill
                className="object-cover"
              />

            </div>

          </div>

        </motion.div>


        {/* TRUST */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-5 flex flex-wrap justify-center gap-3 text-[11px] text-gray-500"
        >

          <span>✨ Unique Collection</span>
          <span>🚀 Fast Response</span>
          <span>💝 Trusted Store</span>

        </motion.div>

      </div>

    </section>

  );

}