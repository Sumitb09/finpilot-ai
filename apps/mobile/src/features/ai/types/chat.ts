export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface SuggestedQuestion {
  id: string;
  title: string;
  prompt: string;
}

export interface ChatPayload {
  message: string;
  history?: ChatMessage[];
}