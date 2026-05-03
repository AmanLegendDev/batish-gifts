import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export const dynamic = "force-dynamic";

export default function Page() {

return (

<Suspense fallback={<div className="min-h-screen bg-[#020617]" />}>

<SuccessClient />

</Suspense>

);

}