/**
 * Utility helper to build optimized Cloudinary image URLs or fall back to standard image URLs.
 */
export function getCloudinaryUrl(
  publicId: string,
  options?: { width?: number; quality?: number; format?: string }
) {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "fanoon-consultants";

  if (publicId.startsWith("http://") || publicId.startsWith("https://")) {
    return publicId;
  }

  const width = options?.width ? `w_${options.width},` : "";
  const quality = options?.quality ? `q_${options.quality},` : "q_auto,";
  const format = options?.format ? `f_${options.format}` : "f_auto";

  return `https://res.cloudinary.com/${cloudName}/image/upload/${width}${quality}${format}/${publicId}`;
}
