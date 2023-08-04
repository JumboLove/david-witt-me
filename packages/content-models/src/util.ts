export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: undefined,
    hour12: true, // Set to true for 12-hour clock format, false for 24-hour format
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
}
