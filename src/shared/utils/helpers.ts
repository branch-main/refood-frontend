/**
 * Get fallback image URL for restaurants
 * @param {string} name - Entity name for avatar generation
 * @param {string|null} image - Image URL if available
 * @returns {string} Image URL or generated fallback avatar
 */
export const getFallbackImage = (
  name: string,
  image: string | null,
): string => {
  return (
    image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&size=400&background=ffe2e2&color=ff6467&bold=true`
  );
};
