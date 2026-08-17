export function formatTime(timestamp: number): string {
  // e.g 20M 5H or 5 May 2023
  const now = new Date();
  const time = new Date(timestamp);
  const diff = now.getTime() - time.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}D`;
  } else if (hours > 0) {
    return `${hours}H`;
  } else if (minutes > 0) {
    return `${minutes}M`;
  } else {
    return `${seconds}S`;
  }
}
