export function convertTimeToMinutes(timeString: string): number {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  return hours * 60 + minutes + seconds / 60;
}

export function estimateVO2Max(distance: number, timeString: string): number {
  const time = convertTimeToMinutes(timeString);
  const velocity = (distance * 1000) / time;
  const vo2maxPercent =
    0.8 +
    0.1894393 * Math.exp(-0.012778 * time) +
    0.2989558 * Math.exp(-0.1932605 * time);
  const vo2 = -4.6 + 0.182258 * velocity + 0.000104 * velocity * velocity;

  return vo2 / vo2maxPercent;
}
