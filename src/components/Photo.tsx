/**
 * A photo at its own aspect ratio, so it never shifts the layout while loading.
 */
type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
};

export default function Photo({ src, alt, width, height, priority, className = "" }: Props) {
  return (
    <div className={`relative overflow-hidden bg-graphite ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized WebP */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
