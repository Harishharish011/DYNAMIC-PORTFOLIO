export function GalleryGrid({ images }: { images: string[] }) {
  return (
    <div className="bbGalleryGrid">
      {images.map((src, idx) => (
        <div key={`${src}-${idx}`} className="bbGalleryCard">
          <img className="bbGalleryImg" src={src} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}
