const KEY = "seta-scroll-back";

export const saveScrollPosition = () => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(KEY, String(window.scrollY));
  }
};

export const restoreScrollPosition = () => {
  if (typeof window !== "undefined") {
    const saved = sessionStorage.getItem(KEY);
    if (saved) {
      const y = parseInt(saved, 10);
      window.scrollTo({ top: y, behavior: "instant" });
      sessionStorage.removeItem(KEY);
      return y;
    }
  }
  return null;
};
