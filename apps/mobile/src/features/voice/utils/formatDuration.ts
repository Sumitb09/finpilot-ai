export function formatDuration(
    ms: number
  ) {
    const seconds = Math.floor(ms / 1000);
  
    const minutes = Math.floor(
      seconds / 60
    );
  
    const remain =
      seconds % 60;
  
    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(remain).padStart(
      2,
      "0"
    )}`;
  }