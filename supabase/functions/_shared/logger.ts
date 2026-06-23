export function logRequest(
    task: string
  ) {
    console.log(
      `[${new Date().toISOString()}] ${task}`
    );
  }
  
  export function logError(
    error: unknown
  ) {
    console.error(error);
  }