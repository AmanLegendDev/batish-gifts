"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ProductsPageContent from "./ProductsPageContent";

export default function ProductsPage() {
  return (
    <Suspense fallback={<p className="p-10">Loading...</p>}>
      <ProductsPageContent />
    </Suspense>
  );
}