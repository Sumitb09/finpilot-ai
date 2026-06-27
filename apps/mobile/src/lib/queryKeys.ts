export const queryKeys = {

    auth: {
      session: ["auth", "session"] as const,
      user: ["auth", "user"] as const,
    },
  
    profile: {
      all: ["profile"] as const,
    },
  
    transactions: {
  
      all: ["transactions"] as const,
  
      detail: (id: string) =>
        ["transactions", id] as const,
    },
  
    savings: {
  
      all: ["goals"] as const,
  
      detail: (id: string) =>
        ["goals", id] as const,
  
      contributions: (id: string) =>
        ["goals", id, "contributions"] as const,
    },
  
    analytics: {
  
      all: ["analytics"] as const,
  
      monthly: ["analytics", "monthly"] as const,
  
      health: ["analytics", "health"] as const,
    },
  
    recurring: {
      all: ["recurring"] as const,
    },
  
    categories: {
      all: ["categories"] as const,
    },
  
  };

  export const QUERY_KEYS = queryKeys;