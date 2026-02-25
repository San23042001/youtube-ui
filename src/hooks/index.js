import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return isMobile;
}


export function useToggle(initial = false, resetAfter = null) {
  const [state, setState] = useState(initial);

  function toggle() {
    setState((prev) => {
      const next = !prev;
      if (next && resetAfter) {
        setTimeout(() => setState(false), resetAfter);
      }
      return next;
    });
  }

  return [state, toggle];
}


export function useLikeDislike() {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  function toggleLike() {
    setLiked((prev) => !prev);
    setDisliked(false);
  }

  function toggleDislike() {
    setDisliked((prev) => !prev);
    setLiked(false);
  }

  return { liked, disliked, toggleLike, toggleDislike };
}