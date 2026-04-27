import { Suspense } from "react";
import ThankYouContent from "@/components/ThankYouContent";

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
