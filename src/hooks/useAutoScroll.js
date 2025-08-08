import { useEffect, useRef } from "react";

export function useAutoScroll(dependencies) {
  const containerRef = useRef(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.scrollTop = containerEl.scrollHeight;
    }
  }, dependencies);

  return containerRef;
}