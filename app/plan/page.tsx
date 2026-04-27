import { Suspense } from "react";
import PlanContent from "@/components/PlanContent";

export default function PlanPage() {
  return (
    <Suspense>
      <PlanContent />
    </Suspense>
  );
}
