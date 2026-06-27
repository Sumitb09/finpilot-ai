export function getGoalProgress(
    saved: number,
    target: number
  ) {
    if (target <= 0) return 0;
  
    return Math.min(
      (saved / target) * 100,
      100
    );
  }
  
  export function getRemainingAmount(
    saved: number,
    target: number
  ) {
    return Math.max(target - saved, 0);
  }
  
  export function isCompleted(
    saved: number,
    target: number
  ) {
    return saved >= target;
  }