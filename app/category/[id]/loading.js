export default function Loading() {
  return (
    <section className="px-4 py-6 bg-white min-h-screen">

      {/* SAME HEADER SPACE */}
      <div className="h-[160px] w-full bg-gray-200 animate-pulse rounded-b-2xl" />

      {/* CATEGORY PILLS FAKE */}
      <div className="flex gap-3 px-4 py-3">
        {Array(5).fill(0).map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 rounded-full bg-gray-200 animate-pulse"
          />
        ))}
      </div>

      {/* PRODUCTS SKELETON */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">

        {Array(8).fill(0).map((_, i) => (
          <div
            key={i}
            className="h-48 rounded-xl bg-gray-200 animate-pulse"
          />
        ))}

      </div>

    </section>
  );
}