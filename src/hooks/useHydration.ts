// hooks/useHydration.ts
"use client";
import { useEffect, useState } from "react";

export const useHydration = () => {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};
