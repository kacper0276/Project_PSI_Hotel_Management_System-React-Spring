/**
 * Extracts the date part from a datetime string in ISO 8601 format.
 *
 * @param date - A datetime string in ISO 8601 format (e.g., "2024-08-06T15:30:00Z").
 * @returns The date part of the datetime string (e.g., "2024-08-06").
 */
export default function cutTimeInDateTime(date: string): string {
  const dateArr = date.split("T");
  return dateArr[0];
}
