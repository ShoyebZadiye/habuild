"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function UTMCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    utmKeys.forEach((key) => {
      const val = searchParams.get(key);
      if (val) sessionStorage.setItem(key, val);
    });
  }, [searchParams]);

  return null;
}
