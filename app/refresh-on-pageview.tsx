'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    __owlRecorded?: Promise<void>;
  }
}

export function RefreshOnPageview() {
  const router = useRouter();
  const hasRefreshed = useRef(false);

  useEffect(() => {
    window.__owlRecorded?.then(() => {
      if (hasRefreshed.current) return;
      hasRefreshed.current = true;
      router.refresh();
    });
  }, [router]);

  return null;
}
