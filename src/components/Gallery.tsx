"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { photo } from "@/lib/site";

// One shared photo viewer. Wrap the app in <GalleryProvider>, then call
// useGallery().open(album, index) from any client component, or use
// <GalleryButton> from server components.

export type Album = {
  title: string;
  source?: string;
  photos: { name: string; alt: string }[];
};

type Ctx = { open: (album: Album, index?: number) => void };
const GalleryContext = createContext<Ctx>({ open: () => {} });
export const useGallery = () => useContext(GalleryContext);

export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [album, setAlbum] = useState<Album | null>(null);
  const [index, setIndex] = useState(0);

  const open = useCallback((a: Album, i = 0) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setAlbum(a);
    setIndex(i);
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  }, []);

  const step = (n: number) => album && setIndex((i) => (i + n + album.photos.length) % album.photos.length);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      document.body.style.overflow = "";
      returnFocus.current?.focus();
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  const current = album?.photos[index];
  const many = (album?.photos.length ?? 0) > 1;

  return (
    <GalleryContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialog}
        aria-label={album?.title ?? "Photo viewer"}
        className="m-auto w-[min(1120px,94vw)] overflow-hidden rounded-2xl bg-graphite p-0 text-white backdrop:bg-black/85 backdrop:backdrop-blur-sm"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <p className="text-[15px] font-medium">{album?.title}</p>
          <button
            onClick={() => dialog.current?.close()}
            className="grid size-10 place-items-center rounded-full text-2xl leading-none hover:bg-white/10"
            aria-label="Close photo viewer"
          >
            ×
          </button>
        </div>
        <div className="bg-black">
          {current && (
            // eslint-disable-next-line @next/next/no-img-element -- static export
            <img
              key={current.name}
              src={photo(current.name, 1600)}
              alt={current.alt}
              className="h-[min(68vh,720px)] w-full object-contain"
            />
          )}
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-4 text-[14px]">
          <span className="readout text-silver" aria-live="polite">
            {album ? `${String(index + 1).padStart(2, "0")} / ${String(album.photos.length).padStart(2, "0")}` : ""}
          </span>
          {album?.source && (
            <a href={album.source} target="_blank" rel="noopener noreferrer" className="text-silver hover:text-white">
              View original post ↗
            </a>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => step(-1)}
              disabled={!many}
              aria-label="Previous photo"
              className="h-10 w-12 rounded-full border border-white/20 hover:border-white disabled:opacity-30"
            >
              ←
            </button>
            <button
              onClick={() => step(1)}
              disabled={!many}
              aria-label="Next photo"
              className="h-10 w-12 rounded-full border border-white/20 hover:border-white disabled:opacity-30"
            >
              →
            </button>
          </div>
        </div>
      </dialog>
    </GalleryContext.Provider>
  );
}

/** A button that opens an album; usable from server components. */
export function GalleryButton({
  album,
  index = 0,
  label,
  className = "",
  children,
}: {
  album: Album;
  index?: number;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useGallery();
  return (
    <button
      type="button"
      aria-label={label}
      aria-haspopup="dialog"
      onClick={() => open(album, index)}
      className={`block w-full cursor-pointer text-left ${className}`}
    >
      {children}
    </button>
  );
}
