"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin(){

  const router = useRouter();

  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[loading,setLoading]=useState(false);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);

    const res=await fetch("/api/admin/login",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({ email,password })
    });

    const data=await res.json();
    setLoading(false);

    if(res.ok){
      router.push("/admin/dashboard");
      router.refresh();
    }else{
      alert(data.message||"Login failed");
    }
  };

  return(

    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8fafc] via-white to-white px-4">

      {/* CARD */}
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-xl p-6">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">

          <div className="relative w-12 h-12 rounded-xl overflow-hidden">
            <Image src="/logo.jpg" fill alt="logo" className="object-cover"/>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mt-3">
            Aarav Admin Panel
          </h2>

          <p className="text-xs text-gray-400 mt-1">
            Manage orders & products
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Admin Email"
            required
            className="w-full p-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-[var(--primary)]"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 rounded-xl border border-gray-200 bg-white outline-none focus:border-[var(--primary)]"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-[var(--primary)] text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition shadow-md"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>

        {/* FOOTNOTE */}
        <p className="text-[11px] text-gray-400 text-center mt-6">
          Secure access only • Aarav Gift Gallery
        </p>

      </div>

    </section>
  );
}