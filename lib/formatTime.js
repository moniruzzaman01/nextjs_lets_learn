export function formatSecondsToHMS(seconds) {
  seconds = Math.floor(Number(seconds)) || 0;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    remainingSeconds.toString().padStart(2, "0"),
  ].join(":");
}

export function formatHMSToSeconds(timeString) {
  if (!timeString || typeof timeString !== "string") return 0;
  const parts = timeString.split(":");
  let seconds = 0;
  if (parts.length === 3) {
    seconds += parseInt(parts[0]) * 3600; // Hours
    seconds += parseInt(parts[1]) * 60; // Minutes
    seconds += parseInt(parts[2]); // Seconds
  } else if (parts.length === 2) {
    seconds += parseInt(parts[0]) * 60;
    seconds += parseInt(parts[1]);
  } else if (parts.length === 1) {
    seconds += parseInt(parts[0]);
  }
  return isNaN(seconds) ? 0 : seconds;
}
