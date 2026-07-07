import Image from 'next/image';

function isExternalSrc(src) {
  return typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'));
}

function getStaticDimensions(src) {
  if (src && typeof src === 'object' && 'width' in src && 'height' in src) {
    return { width: src.width, height: src.height };
  }
  return null;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  priority = false,
  fill = false,
  sizes,
  width,
  height,
  objectFit = 'cover',
}) {
  if (!src) return null;

  const staticDimensions = getStaticDimensions(src);
  const imageClassName = ['optimized-image', className].filter(Boolean).join(' ');

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={imageClassName}
        sizes={sizes || '100vw'}
        priority={priority}
        style={{ objectFit }}
      />
    );
  }

  const resolvedWidth = width || staticDimensions?.width || (isExternalSrc(src) ? 800 : 500);
  const resolvedHeight = height || staticDimensions?.height || (isExternalSrc(src) ? 600 : 500);
  const hasFixedSize = Boolean(width && height);

  return (
    <Image
      src={src}
      alt={alt}
      width={resolvedWidth}
      height={resolvedHeight}
      className={imageClassName}
      sizes={sizes}
      priority={priority}
      style={
        hasFixedSize
          ? { width: resolvedWidth, height: resolvedHeight, objectFit }
          : { width: '100%', height: 'auto' }
      }
    />
  );
}
