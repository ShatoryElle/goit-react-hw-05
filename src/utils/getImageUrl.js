const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMAGE_URL =
  "https://via.placeholder.com/500x750?text=No+Image";

/**
 * Генерує повну URL для зображення.
 * @param {string} path - Шлях до зображення (наприклад, "/1E5baAaEse26fej7uHcjOgEE2t2.jpg").
 * @returns {string} Повна URL-адреса до зображення.
 */
export const getImageUrl = (path) => {
  if (!path) return PLACEHOLDER_IMAGE_URL; // Використовуємо загальнодоступний плейсхолдер
  return `${BASE_IMAGE_URL}${path}`;
};