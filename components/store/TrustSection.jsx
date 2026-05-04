"use client";

import { motion } from "framer-motion";

export default function TrustSection(){

const data = [
  { icon:"🎁", title:"Unique Gifts", desc:"Handpicked for every occasion" },
  { icon:"💝", title:"Made with Love", desc:"Perfect for your loved ones" },
  { icon:"⚡", title:"Quick Response", desc:"Fast & reliable service" },
  { icon:"📦", title:"Easy Ordering", desc:"Simple & smooth experience" }
];

return(

<section className="px-5 py-16 bg-gradient-to-b from-white to-pink-50">

  {/* HEADER */}
  <div className="text-center mb-10">
    <p className="text-xs tracking-[4px] text-[var(--primary)] uppercase">
      Why Choose Us
    </p>

    <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-2">
      Gifts That Feel Special 💝
    </h2>
  </div>


  {/* GRID */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">

    {data.map((item,index)=>(

      <motion.div
        key={index}
        initial={{opacity:0,y:20}}
        whileInView={{opacity:1,y:0}}
        transition={{delay:index*0.1}}
        className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition"
      >

        <div className="text-2xl mb-2">
          {item.icon}
        </div>

        <h3 className="text-sm font-semibold text-gray-900">
          {item.title}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {item.desc}
        </p>

      </motion.div>

    ))}

  </div>

</section>

);
}