import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  ogUrl?: string;
}

export function usePageMeta({ title, description, ogImage, ogUrl }: PageMeta) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper to set or create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("name", "description", description);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    if (ogUrl) setMeta("property", "og:url", ogUrl);
    if (ogImage) setMeta("property", "og:image", ogImage);

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    if (ogImage) setMeta("name", "twitter:image", ogImage);
  }, [title, description, ogImage, ogUrl]);
}
